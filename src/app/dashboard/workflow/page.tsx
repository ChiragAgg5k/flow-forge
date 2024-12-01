"use client";

import axios from "axios";
import { useEffect, useState } from "react";

const githubApi = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
    Accept: "application/vnd.github.v3+json",
  },
});

const WorkflowPage = () => {
  const [repositories, setRepositories] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        const response = await githubApi.get("/user/repos");
        setRepositories(response.data.slice(0, 3)); // Limit to 3 repos for demonstration
        setError(null);
      } catch (err) {
        console.error("Failed to fetch repositories:", err);
        setError("Could not fetch repositories");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRepositories();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-[90vh] bg-background text-foreground p-8 flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          Loading Workflow...
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
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Workflow Manager</h1>
        <p className="text-muted-foreground text-sm mt-2">
          Manage and track your workflows. Automate tasks, monitor progress, and
          review logs.
        </p>
      </header>

      {/* Workflow Overview */}
      <section className="mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {repositories.map((repo) => (
          <div
            key={repo.id}
            className="bg-card p-6 rounded-lg shadow border border-border"
          >
            <h2 className="text-lg font-medium">{repo.name}</h2>
            <p className="text-sm text-muted-foreground mt-2">
              Last updated:{" "}
              {new Date(repo.updated_at).toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
            <button className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">
              View Details
            </button>
          </div>
        ))}
      </section>

      {/* Workflow Logs/Activity */}
      <section>
        <h2 className="text-2xl font-bold mb-1">Workflow Activity</h2>
        <p className="text-sm text-muted-foreground mb-8">
          This section in future will show the workflow logs and activity for
          all of user's repositories. Currently, work in progress.
        </p>
        <div className="bg-card p-6 rounded-lg shadow border border-border">
          <ul className="space-y-4">
            <li className="text-sm text-muted-foreground">
              <span className="text-green-500 font-bold">[Success]</span>{" "}
              Deployed <strong>feature/login</strong> to production.
              <span className="text-gray-500"> - 2023-10-01 14:30 UTC</span>
            </li>
            <li className="text-sm text-muted-foreground">
              <span className="text-red-500 font-bold">[Failed]</span>
              Build failed for <strong>
                feature/payment
              </strong>.
              <span className="text-gray-500"> - 2023-10-01 13:15 UTC</span>
              <br />
              <span className="text-gray-400">
                Error: Missing environment variable.
              </span>
            </li>
            <li className="text-sm text-muted-foreground">
              <span className="text-yellow-500 font-bold">[In Progress]</span>{" "}
              Running tests for <strong>feature/dashboard</strong>.
              <span className="text-gray-500"> - 2023-10-01 12:45 UTC</span>
            </li>
            <li className="text-sm text-muted-foreground">
              <span className="text-green-500 font-bold">[Success]</span> Merged
              pull request <strong>#42</strong> for{" "}
              <strong>feature/notifications</strong>.
              <span className="text-gray-500"> - 2023-10-01 11:00 UTC</span>
              <br />
              <span className="text-gray-400">
                Merged by: <strong>john_doe</strong>
              </span>
            </li>
            <li className="text-sm text-muted-foreground">
              <span className="text-yellow-500 font-bold">[In Progress]</span>{" "}
              Code review for <strong>feature/profile-update</strong> initiated.
              <span className="text-gray-500"> - 2023-10-01 10:30 UTC</span>
              <br />
              <span className="text-gray-400">
                Reviewer: <strong>jane_smith</strong>
              </span>
            </li>
            <li className="text-sm text-muted-foreground">
              <span className="text-red-500 font-bold">[Failed]</span>
              Deployment failed for <strong>
                feature/dashboard
              </strong>.
              <span className="text-gray-500"> - 2023-10-01 09:15 UTC</span>
              <br />
              <span className="text-gray-400">
                Error: Timeout while connecting to the server.
              </span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default WorkflowPage;
