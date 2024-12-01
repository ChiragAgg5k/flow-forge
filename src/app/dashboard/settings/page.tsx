"use client";

import { useUser } from "@/components/auth-provider";
import { database } from "@/lib/appwrite";
import { ID, Query } from "appwrite";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function Settings() {
  const user = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [githubToken, setGitHubToken] = useState("");
  const [discordWebhook, setDiscordWebhook] = useState("");
  const [documentId, setDocumentId] = useState<string | null>(null);

  const fetchSettings = async () => {
    setIsLoading(true);
    try {
      if (!user.current?.$id) return;

      const response = await database.listDocuments(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID!,
        [Query.equal("userId", user.current.$id)],
      );

      if (response.documents.length > 0) {
        const doc = response.documents[0];
        setDocumentId(doc.$id);
        setGitHubToken(doc.githubToken || "");
        setDiscordWebhook(doc.discordWebhook || "");
      }
    } catch (error) {
      console.error("Failed to fetch settings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateField = async (field: string, value: string) => {
    setIsLoading(true);
    try {
      if (documentId) {
        await database.updateDocument(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
          process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID!,
          documentId,
          {
            [field]: value,
          },
        );
      } else {
        const response = await database.createDocument(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
          process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID!,
          ID.unique(),
          {
            userId: user.current?.$id,
            [field]: value,
          },
        );
        setDocumentId(response.$id);
      }
      toast.success(`${field} updated successfully!`);
    } catch (error) {
      console.error(`Failed to update ${field}:`, error);
      toast.error(`Failed to update ${field}.`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, [user.current?.$id]);

  return (
    <div className="min-h-[90vh] bg-background text-foreground p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground text-sm mt-2">
          Customize your preferences and manage your account settings.
        </p>
      </header>

      <main>
        {/* GitHub Auth Token */}
        <section id="github-token" className="mb-8">
          <h2 className="text-2xl font-bold">GitHub Authentication</h2>
          <div className="mt-4 bg-card p-6 rounded-lg shadow border border-border">
            <p className="text-sm text-muted-foreground mb-4">
              Enter your GitHub personal access token to enable repository
              integrations.
            </p>
            <div className="flex flex-col gap-4">
              <label className="text-sm font-medium" htmlFor="github-token">
                GitHub Token
              </label>
              <div className="flex items-center gap-2">
                <input
                  id="github-token"
                  type="password"
                  placeholder="Enter your GitHub token"
                  value={githubToken}
                  onChange={(e) => setGitHubToken(e.target.value)}
                  className="px-4 w-full py-2 border border-border rounded-lg bg-input text-input-foreground focus:outline-none focus:ring focus:ring-primary/50"
                />
                <button
                  onClick={() => updateField("githubToken", githubToken)}
                  disabled={isLoading}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
                >
                  {isLoading ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Discord Webhook URL */}
        <section id="discord-webhook" className="mb-8">
          <h2 className="text-2xl font-bold">Discord Notifications</h2>
          <div className="mt-4 bg-card p-6 rounded-lg shadow border border-border">
            <p className="text-sm text-muted-foreground mb-4">
              Configure your Discord webhook URL to receive notifications.
            </p>
            <div className="flex flex-col gap-4">
              <label className="text-sm font-medium" htmlFor="discord-webhook">
                Discord Webhook URL
              </label>
              <div className="flex items-center gap-2">
                <input
                  id="discord-webhook"
                  type="url"
                  placeholder="Enter your Discord webhook URL"
                  value={discordWebhook}
                  onChange={(e) => setDiscordWebhook(e.target.value)}
                  className="px-4 w-full py-2 border border-border rounded-lg bg-input text-input-foreground focus:outline-none focus:ring focus:ring-primary/50"
                />
                <button
                  onClick={() => updateField("discordWebhook", discordWebhook)}
                  disabled={isLoading}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
                >
                  {isLoading ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Logout Section */}
        <section id="logout" className="mb-8">
          <h2 className="text-2xl font-bold">Logout</h2>
          <div className="mt-4 bg-card p-6 rounded-lg shadow border border-border">
            <p className="text-sm text-muted-foreground mb-4">
              Logout from your account securely.
            </p>
            <button
              disabled={isLoading}
              onClick={() => {
                setIsLoading(true);
                user.logout();
              }}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              {isLoading ? "Loading..." : "Logout"}
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Settings;
