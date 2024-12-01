"use client";

import { useUser } from "@/components/auth-provider";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";

const githubApi = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
    Accept: "application/vnd.github.v3+json",
  },
});

interface GitHubEvent {
  id: string;
  type: string;
  actor: {
    login: string;
    avatar_url: string;
  };
  repo: {
    name: string;
    url: string;
  };
  payload: any;
  created_at: string;
}

// Define the interface for a repository
interface Repo {
  id: number;
  name: string;
  html_url: string;
  stargazers_count: number;
  language?: string;
}

// Define the interface for a pull request
interface PullRequest {
  id: number;
  title: string;
  html_url: string;
  state: string;
  repository_url: string;
}

function Page() {
  const user = useUser();
  const [githubUser, setGithubUser] = useState(null);
  const [stats, setStats] = useState({
    totalProjects: 0,
    issuesResolved: 0,
    prsReviewed: 0,
    notifications: 0,
    longestStreak: 0,
    openSourceContributions: 0,
  });
  const [languageStats, setLanguageStats] = useState<[string, number][]>([]);
  const [recentActivity, setRecentActivity] = useState<GitHubEvent[]>([]);
  const [recentPRs, setRecentPRs] = useState<PullRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const formatEventDescription = (event: GitHubEvent) => {
    switch (event.type) {
      case "PushEvent":
        return `Pushed to ${event.repo.name}`;
      case "CreateEvent":
        return `Created ${event.payload.ref_type} in ${event.repo.name}`;
      case "PullRequestEvent":
        return `${event.payload.action} pull request in ${event.repo.name}`;
      case "IssuesEvent":
        return `${event.payload.action} issue in ${event.repo.name}`;
      case "WatchEvent":
        return `Starred ${event.repo.name}`;
      case "ForkEvent":
        return `Forked ${event.repo.name}`;
      default:
        return `${event.type} in ${event.repo.name}`;
    }
  };

  const fetchWithRetry = async (
    fetchFn: () => Promise<any>,
    maxRetries = 3,
  ) => {
    let retries = 0;
    while (retries < maxRetries) {
      try {
        return await fetchFn();
      } catch (err) {
        if (
          axios.isAxiosError(err) &&
          err.response &&
          err.response.status === 403 &&
          err.response.headers["x-ratelimit-remaining"] === "0"
        ) {
          const resetTime =
            parseInt(err.response.headers["x-ratelimit-reset"], 10) * 1000;
          const waitTime = resetTime - Date.now();

          if (waitTime > 0) {
            await new Promise((resolve) => setTimeout(resolve, waitTime));
          }
          retries++;
        } else {
          throw err;
        }
      }
    }
    throw new Error("Max retries exceeded");
  };

  useEffect(() => {
    async function fetchGitHubData() {
      if (!user || !user.current || !user.current.email) {
        return;
      }

      try {
        const userSearchResponse = await githubApi.get(
          `/search/users?q=${encodeURIComponent(user.current.email)}+in:email`,
        );

        if (userSearchResponse.data.total_count === 0) {
          setError("No GitHub account found for this email");
          setIsLoading(false);
          return;
        }

        const githubUsername = userSearchResponse.data.items[0].login;
        setGithubUser(githubUsername);
        setError(null);

        const [
          reposResponse,
          issuesResponse,
          pullRequestsResponse,
          notificationsResponse,
          eventsResponse,
          recentPRsResponse,
        ] = await Promise.all([
          fetchWithRetry(() =>
            githubApi.get(`/users/${githubUsername}/repos?per_page=100`),
          ),
          fetchWithRetry(() =>
            githubApi.get(
              `/search/issues?q=author:${githubUsername}+is:closed`,
            ),
          ),
          fetchWithRetry(() =>
            githubApi.get(
              `/search/issues?q=reviewed-by:${githubUsername}+is:pr`,
            ),
          ),
          fetchWithRetry(() => githubApi.get("/notifications")),
          fetchWithRetry(() =>
            githubApi.get(`/users/${githubUsername}/events?per_page=5`),
          ),
          fetchWithRetry(() =>
            githubApi.get(`/search/issues?q=author:${githubUsername}+is:pr`),
          ),
        ]);

        const languages = reposResponse.data.reduce(
          (acc: Record<string, number>, repo: Repo) => {
            if (repo.language) {
              acc[repo.language] = (acc[repo.language] || 0) + 1;
            }
            return acc;
          },
          {},
        );

        setStats({
          totalProjects: reposResponse.data.length,
          issuesResolved: issuesResponse.data.total_count,
          prsReviewed: pullRequestsResponse.data.total_count,
          notifications: notificationsResponse.data.length,
          longestStreak: calculateLongestStreak(eventsResponse.data),
          openSourceContributions: recentPRsResponse.data.total_count,
        });

        setLanguageStats(Object.entries(languages) as [string, number][]);
        setRecentActivity(eventsResponse.data);
        setRecentPRs(recentPRsResponse.data.items.slice(0, 5));

        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching GitHub data:", err);
        if (err instanceof AxiosError) {
          setError(
            err.response
              ? "Error fetching GitHub data"
              : "No response received from GitHub API",
          );
        } else {
          setError("Error setting up GitHub API request");
        }
        setIsLoading(false);
      }
    }

    fetchGitHubData();
  }, [user.current?.email]);

  const calculateLongestStreak = (events: any[]) => {
    const dates = events.map((event) =>
      new Date(event.created_at).toDateString(),
    );
    const uniqueDates = Array.from(new Set(dates));
    let streak = 0,
      maxStreak = 0;

    for (let i = 1; i < uniqueDates.length; i++) {
      const diff =
        new Date(uniqueDates[i]).getTime() -
        new Date(uniqueDates[i - 1]).getTime();
      if (diff === 86400000) {
        streak++;
        maxStreak = Math.max(maxStreak, streak);
      } else {
        streak = 0;
      }
    }
    return maxStreak;
  };

  if (isLoading) {
    return (
      <div className="min-h-[90vh] bg-background text-foreground p-8 flex flex-col items-center justify-center">
        <div className="text-center text-muted-foreground">
          Loading GitHub stats...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[90vh] bg-background text-foreground p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">GitHub Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-2">
          Overview of your GitHub activity for @{githubUser}
        </p>
      </header>

      <section className="mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-card p-6 rounded-lg shadow border border-border">
          <h2 className="text-sm font-medium text-muted-foreground">
            Total Projects
          </h2>
          <p className="text-2xl font-bold mt-2">{stats.totalProjects}</p>
        </div>

        <div className="bg-card p-6 rounded-lg shadow border border-border">
          <h2 className="text-sm font-medium text-muted-foreground">
            Issues Resolved
          </h2>
          <p className="text-2xl font-bold mt-2">{stats.issuesResolved}</p>
        </div>

        <div className="bg-card p-6 rounded-lg shadow border border-border">
          <h2 className="text-sm font-medium text-muted-foreground">
            PRs Reviewed
          </h2>
          <p className="text-2xl font-bold mt-2">{stats.prsReviewed}</p>
        </div>

        <div className="bg-card p-6 rounded-lg shadow border border-border">
          <h2 className="text-sm font-medium text-muted-foreground">
            Notifications
          </h2>
          <p className="text-2xl font-bold mt-2">{stats.notifications}</p>
        </div>

        <div className="bg-card p-6 rounded-lg shadow border border-border">
          <h2 className="text-sm font-medium text-muted-foreground">
            Open Source Contributions
          </h2>
          <p className="text-2xl font-bold mt-2">
            {stats.openSourceContributions}
          </p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Top Languages Used</h2>
        <div className="bg-card p-6 rounded-lg shadow border border-border">
          {languageStats.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {languageStats.map(([language, count]) => {
                const total = languageStats.reduce(
                  (sum, [, cnt]) => sum + cnt,
                  0,
                );
                const percentage = ((count / total) * 100).toFixed(1);

                return (
                  <div key={language} className="flex items-center space-x-4">
                    <span className="font-medium text-sm w-20">{language}</span>
                    <div className="flex-grow bg-muted-foreground rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-muted-foreground text-xs">
                      {percentage}%
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              No language data available.
            </p>
          )}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Recent Pull Requests</h2>
        <div className="bg-card p-6 rounded-lg shadow border border-border">
          {recentPRs.length > 0 ? (
            <ul className="space-y-4">
              {recentPRs.map((pr) => (
                <li key={pr.id} className="flex flex-col">
                  <a
                    href={pr.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-500 font-medium hover:underline"
                  >
                    {pr.title}
                  </a>
                  <p className="text-sm text-muted-foreground">
                    {pr.repository_url.split("/").pop()} - {pr.state}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">
              No recent pull requests found.
            </p>
          )}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
        <div className="bg-card p-6 rounded-lg shadow border border-border">
          {recentActivity.length > 0 ? (
            <ul className="space-y-4">
              {recentActivity.map((event) => (
                <li key={event.id} className="flex items-center space-x-4">
                  <img
                    src={event.actor.avatar_url}
                    alt={`${event.actor.login}'s avatar`}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="text-sm">
                      <span className="font-semibold">{event.actor.login}</span>{" "}
                      {formatEventDescription(event)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(event.created_at).toLocaleString()}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">
              No recent activity available.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}

export default Page;
