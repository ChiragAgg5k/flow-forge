"use client";

import { useUser } from "@/components/auth-provider";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { database } from "@/lib/appwrite";
import { CopilotTextarea } from "@copilotkit/react-textarea";
import { Query } from "appwrite";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const githubApi = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
    Accept: "application/vnd.github.v3+json",
  },
});

interface RepositoryDetails {
  name: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  html_url: string;
  updated_at: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

interface GitHubItem {
  id: number;
  title: string;
  html_url: string;
  user: {
    login: string;
  };
}

function RepositoryDetailsPage() {
  const { repoName } = useParams();
  const user = useUser();
  const [username, setUsername] = useState<string | null>(null);
  const [repository, setRepository] = useState<RepositoryDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [issueTitle, setIssueTitle] = useState("");
  const [issueDescription, setIssueDescription] = useState("");
  const [sendDiscordNotification, setSendDiscordNotification] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [githubToken, setGitHubToken] = useState<string | null>(null);
  const [discordWebhook, setDiscordWebhook] = useState<string | null>(null);

  const [issues, setIssues] = useState<GitHubItem[]>([]);
  const [pullRequests, setPullRequests] = useState<GitHubItem[]>([]);

  const fetchSettings = async () => {
    if (!user.current?.$id) return;

    try {
      const response = await database.listDocuments(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID!,
        [Query.equal("userId", user.current.$id)],
      );

      if (response.documents.length > 0) {
        const doc = response.documents[0];
        setGitHubToken(doc.githubToken || null);
        setDiscordWebhook(doc.discordWebhook || null);
      }
    } catch (error) {
      console.error("Failed to fetch settings:", error);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, [user.current?.$id]);

  useEffect(() => {
    async function fetchGitHubData() {
      try {
        if (!user || !user.current || !user.current.email) {
          return;
        }

        // Fetch GitHub username
        const userSearchResponse = await githubApi.get(
          `/search/users?q=${encodeURIComponent(user.current.email)}+in:email`,
        );

        if (userSearchResponse.data.total_count === 0) {
          setError("No GitHub account found for this email");
          setIsLoading(false);
          return;
        }

        const fetchedUsername = userSearchResponse.data.items[0].login;
        setUsername(fetchedUsername);

        // Fetch repository details
        const repoResponse = await githubApi.get(
          `/repos/${fetchedUsername}/${repoName}`,
        );

        const pullRequestResponse = await githubApi.get(
          `/repos/${fetchedUsername}/${repoName}/pulls`,
        );
        setPullRequests(pullRequestResponse.data);

        // Fetch open issues
        const issuesResponse = await githubApi.get(
          `/repos/${fetchedUsername}/${repoName}/issues`,
        );
        setIssues(
          issuesResponse.data.filter((issue: any) => !issue.pull_request),
        );

        setRepository(repoResponse.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch repository details");
      } finally {
        setIsLoading(false);
      }
    }

    if (repoName) {
      fetchGitHubData();
    }
  }, [repoName, user?.current?.email]);

  const createIssue = async () => {
    try {
      if (!repository || !githubToken || !discordWebhook) {
        toast.error(
          "Failed to create issue. Repository or settings not found.",
        );
        return;
      }

      if (!issueTitle || !issueDescription) {
        toast.error("Please fill in all required fields.");
        return;
      }

      const payload = {
        github_token: githubToken,
        github_repository: repository.name,
        github_default_assignee: username,
        discord_webhook_url: discordWebhook,
      };

      await fetch("/api/create-issue", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      toast.success("Issue created successfully!");
      setIsDialogOpen(false);

      window.location.reload();
    } catch (error) {
      console.error("Error creating issue:", error);
    }
  };

  if (isLoading || !repository) {
    return (
      <div className="min-h-[90vh] bg-background text-foreground p-8 flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          Loading repository details...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[90vh] bg-background text-foreground p-8 flex items-center justify-center">
        <div className="text-center text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-[90vh] bg-background text-foreground p-8">
      <header className="mb-8">
        <h1 className="text-2xl font-bold">
          <span className="text-zinc-500">{username}</span> / {repository.name}
        </h1>
        <p className="text-muted-foreground text-sm mt-2">
          {repository.description || "No description provided"}
        </p>
      </header>

      {/* Repository Overview */}
      <section className="mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Stars */}
        <div className="bg-card p-6 rounded-lg shadow border border-border">
          <h2 className="text-sm font-medium text-muted-foreground">Stars</h2>
          <p className="text-2xl font-bold mt-2">
            {repository.stargazers_count}
          </p>
        </div>

        {/* Forks */}
        <div className="bg-card p-6 rounded-lg shadow border border-border">
          <h2 className="text-sm font-medium text-muted-foreground">Forks</h2>
          <p className="text-2xl font-bold mt-2">{repository.forks_count}</p>
        </div>

        {/* Issues */}
        <div className="bg-card p-6 rounded-lg shadow border border-border">
          <h2 className="text-sm font-medium text-muted-foreground">
            Open Issues
          </h2>
          <p className="text-2xl font-bold mt-2">
            {repository.open_issues_count}
          </p>
        </div>
      </section>

      {/* Repository Actions */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Actions</h2>
        <div className="flex flex-row gap-4">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={() => setIsDialogOpen(true)}
              >
                Create Issue
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Issue</DialogTitle>
                <DialogDescription>
                  Provide details about the issue you want to create.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  placeholder="Issue Title"
                  value={issueTitle}
                  onChange={(e) => setIssueTitle(e.target.value)}
                />
                <CopilotTextarea
                  className="flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  placeholder="Issue Description"
                  value={issueDescription}
                  onChange={(e) => setIssueDescription(e.target.value)}
                  autosuggestionsConfig={{
                    textareaPurpose: `Assist user in creating GitHub issue`,
                    chatApiConfigs: {},
                  }}
                />
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="discord-notification"
                    checked={sendDiscordNotification}
                    onCheckedChange={(checked) =>
                      setSendDiscordNotification(!!checked)
                    }
                  />
                  <label
                    htmlFor="discord-notification"
                    className="text-sm text-muted-foreground"
                  >
                    Send Discord notification
                  </label>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={createIssue}>Submit</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <a
            href={`${repository.html_url}/pulls`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90"
          >
            Go to Pull Requests
          </a>
          <a
            href={repository.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90"
          >
            View Code
          </a>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Open Issues</h2>
        {issues.length === 0 ? (
          <p className="text-sm text-muted-foreground">No open issues</p>
        ) : (
          <ul className="space-y-4">
            {issues.map((issue) => (
              <li
                key={issue.id}
                className="bg-card p-4 rounded-lg shadow border"
              >
                <a
                  href={issue.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {issue.title}
                </a>
                <p className="text-sm text-muted-foreground">
                  Opened by {issue.user.login}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Open Pull Requests</h2>
        {pullRequests.length === 0 ? (
          <p className="text-sm text-muted-foreground">No open pull requests</p>
        ) : (
          <ul className="space-y-4">
            {pullRequests.map((pr) => (
              <li key={pr.id} className="bg-card p-4 rounded-lg shadow border">
                <a
                  href={pr.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {pr.title}
                </a>
                <p className="text-sm text-muted-foreground">
                  Opened by {pr.user.login}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default RepositoryDetailsPage;
