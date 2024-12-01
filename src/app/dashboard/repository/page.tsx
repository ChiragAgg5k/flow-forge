"use client";

import { useUser } from "@/components/auth-provider";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const githubApi = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
    Accept: "application/vnd.github.v3+json",
  },
});

interface Repository {
  id: number;
  name: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  html_url: string;
}

function RepositoryPage() {
  const user = useUser();
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchRepositories() {
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

        const reposResponse = await githubApi.get(
          `/users/${githubUsername}/repos?per_page=100&sort=updated`,
        );

        setRepositories(reposResponse.data);
        setError(null);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching repositories:", err);
        setError("Failed to fetch repositories");
        setIsLoading(false);
      }
    }

    fetchRepositories();
  }, [user.current?.email]);

  const handleSelectRepository = (repo: Repository) => {
    router.push(`/dashboard/repository/${repo.name}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-[90vh] bg-background text-foreground p-8 flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          Loading repositories...
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
    <div className="min-h-screen bg-background text-foreground p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">GitHub Repositories</h1>
        <p className="text-muted-foreground text-sm mt-2">
          List of repositories for @{user?.current?.email}
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {repositories.map((repo) => (
          <div
            key={repo.id}
            className="bg-card p-6 rounded-lg shadow border border-border cursor-pointer"
            onClick={() => handleSelectRepository(repo)}
          >
            <h2 className="text-lg font-bold">{repo.name}</h2>
            <p className="text-sm text-muted-foreground">
              {repo.description || "No description provided"}
            </p>
            <div className="text-xs mt-2 text-muted-foreground">
              <p>⭐ Stars: {repo.stargazers_count}</p>
              <p>🍴 Forks: {repo.forks_count}</p>
              <p>
                🕒 Updated:{" "}
                {new Date(repo.updated_at).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 text-sm mt-4 inline-block"
            >
              View on GitHub
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RepositoryPage;
