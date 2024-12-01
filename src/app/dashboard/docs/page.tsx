"use client";

function Docs() {
  return (
    <div className="min-h-screen bg-background flex justify-center items-center p-4">
      <div className="w-full max-w-6xl bg-white-900 text-foreground rounded-lg shadow-xl">
        <header className="mb-8 bg-gradient-to-r from-purple-700/50 to-zinc-800 p-8 rounded-xl shadow-xl text-white">
          <h1 className="text-4xl font-extrabold mb-6 text-purple-300">
            Welcome to <span className="text-white">Flow-Forge</span>
          </h1>
          <p className="text-lg text-gray-300 mt-3 leading-relaxed">
            The CI/CD Manager streamlines monitoring, management, and
            notifications for GitHub workflows, enhancing operational efficiency
            and team communication.
          </p>
          <p className="text-lg text-gray-400 mt-5 leading-relaxed">
            It integrates with GitHub APIs and utilizes modern webhooks for
            instant notifications, helping developers minimize downtime and
            address failures proactively.
          </p>
        </header>

        <main className="space-y-8">
          {/* Table of Contents */}
          <section
            id="table-of-contents"
            className="mb-8 bg-zinc-800 p-8 rounded-lg shadow-lg text-white"
          >
            <h2 className="text-3xl font-bold text-purple-400 mb-6 border-b-2 border-purple-400 pb-2">
              CI/CD Manager Documentation
            </h2>
            <ul className="list-none pl-0 space-y-4">
              {[
                { id: "introduction", label: "1. Introduction" },
                { id: "features", label: "2. Features" },
                {
                  id: "setup-and-configuration",
                  label: "3. Setup and Configuration",
                },
                { id: "how-it-works", label: "4. How It Works" },
                {
                  id: "secrets-environment-variables",
                  label: "5. Secrets and Environment Variables",
                },
                {
                  id: "implementation-details",
                  label: "6. Implementation Details",
                },
                {
                  id: "notifications-and-alerts",
                  label: "7. Notifications and Alerts",
                },
                {
                  id: "using-kestra-for-orchestration",
                  label: "8. Using Kestra for Orchestration",
                },
                {
                  id: "VScode-Implementation",
                  label: "9. VScode Implementation",
                },
              ].map((item) => (
                <li key={item.id} className="group">
                  <a
                    href={`#${item.id}`}
                    className="text-gray-300 hover:text-purple-400 transition-all duration-200 flex items-center space-x-2 group-hover:scale-105"
                  >
                    <span className="block w-2.5 h-2.5 rounded-full bg-purple-400 group-hover:bg-purple-500"></span>
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>

          {/* Introduction Section */}
          <section
            id="introduction"
            className="space-y-6 bg-gradient-to-r from-zinc-800 to-zinc-800 p-8 rounded-lg shadow-xl text-white"
          >
            <h2 className="text-3xl font-bold text-purple-400 border-b-2 border-purple-500 pb-2">
              1. Introduction
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              The CI/CD Manager enhances CI/CD pipeline efficiency by monitoring
              GitHub workflows, automating issue tracking, and providing
              real-time notifications for failures.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              By streamlining CI/CD processes, it fosters better collaboration
              and optimizes operational efficiency.
            </p>
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                Key Problems Solved
              </h3>
              <ul className="list-disc pl-8 space-y-4">
                <li className="flex items-start gap-2">
                  <span className="h-2 w-2 mt-2 bg-gradient-to-r from-blue-300 to-purple-400 rounded-full"></span>
                  <span className="text-gray-300">
                    <span className="text-gradient bg-gradient-to-r from-blue-300 to-purple-400 text-transparent bg-clip-text font-medium">
                      Workflow Monitoring Gaps
                    </span>
                    : Provides detailed insights into workflow statuses and
                    logs.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="h-2 w-2 mt-2 bg-gradient-to-r from-blue-300 to-purple-400 rounded-full"></span>
                  <span className="text-gray-300">
                    <span className="text-gradient bg-gradient-to-r from-blue-300 to-purple-400 text-transparent bg-clip-text font-medium">
                      Delayed Failure Responses
                    </span>
                    : Automates GitHub issue creation for failed workflows,
                    reducing manual intervention.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="h-2 w-2 mt-2 bg-gradient-to-r from-blue-300 to-purple-400 rounded-full"></span>
                  <span className="text-gray-300">
                    <span className="text-gradient bg-gradient-to-r from-blue-300 to-purple-400 text-transparent bg-clip-text font-medium">
                      Ineffective Communication
                    </span>
                    : Sends instant notifications via Discord and Slack to keep
                    team members informed of critical events.
                  </span>
                </li>
              </ul>
            </div>

            <div className="mt-6">
              <h3 className="text-2xl font-semibold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                Project Demo
              </h3>
              <div className="mt-4">
                <iframe
                  className="w-full aspect-video rounded-lg shadow-lg"
                  src="https://www.youtube.com/embed/-FPnJWJPmk8"
                  title="CI/CD Manager Project Demo"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </section>

          {/* Features Section */}

          <section
            id="features"
            className="space-y-8 bg-gradient-to-br from-zinc-800 to-zinc-800 p-8 rounded-lg shadow-2xl text-white"
          >
            <h2 className="text-3xl font-bold text-purple-400 border-b-2 border-purple-500 pb-2">
              2. Features
            </h2>

            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                  Fetch GitHub Workflow Information
                </h3>
                <p className="text-lg text-gray-300 leading-relaxed">
                  The CI/CD Manager monitors GitHub workflows via the REST API,
                  fetching detailed information about their status and logs for
                  a user-friendly dashboard.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed">
                  It automates GitHub issue creation for failed workflows,
                  extracting relevant information to streamline issue tracking.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Real-time alerts are sent to Discord and Slack channels for
                  immediate team notifications.
                </p>
                <div className="flex justify-center">
                  <img
                    src="/kestra-5.png"
                    alt="Workflow Display"
                    className="rounded-lg shadow-lg"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-semibold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                  GitHub Issue Automation
                </h3>
                <p className="text-lg text-gray-300 leading-relaxed">
                  To ensure prompt action on workflow failures, the system
                  automates the creation of GitHub issues. When a workflow
                  fails, the CI/CD Manager extracts relevant information such as
                  error logs, failure timestamps, and suggested resolutions.
                  This information is then used to generate a detailed GitHub
                  issue in the corresponding repository, streamlining issue
                  tracking and resolution.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-semibold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                  Discord Alerts
                </h3>
                <p className="text-lg text-gray-300 leading-relaxed">
                  The system includes a real-time notification feature that
                  sends alerts to a configured Discord channel whenever a
                  production workflow fails. Each alert includes critical
                  details like:
                </p>
                <ul className="list-disc pl-8 space-y-2 text-gray-300">
                  <li>Workflow name</li>
                  <li>Failure time</li>
                  <li>Error summary</li>
                  <li>
                    Direct link to the GitHub logs for quick troubleshooting
                  </li>
                </ul>
                <p className="text-lg text-gray-300 leading-relaxed">
                  These alerts ensure that team members are immediately informed
                  of issues and can take corrective action without delay.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-semibold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                  Slack Alerts
                </h3>
                <p className="text-lg text-gray-300 leading-relaxed">
                  As an additional alert channel, Slack notifications provide
                  flexibility and redundancy. Similar to Discord alerts, Slack
                  notifications include detailed information about failed
                  workflows and links to logs. This ensures teams using Slack as
                  their primary communication tool stay updated on critical
                  workflow events.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-semibold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                  Email Notifications
                </h3>
                <p className="text-lg text-gray-300 leading-relaxed">
                  For teams preferring email, the CI/CD Manager supports email
                  notifications with summaries of workflow failures and
                  actionable steps.
                </p>
              </div>
            </div>
          </section>

          <section
            id="setup-and-configuration"
            className="space-y-8 bg-gradient-to-br from-zinc-800 to-zinc-800 p-8 rounded-lg shadow-2xl text-white"
          >
            <h2 className="text-3xl font-bold text-purple-400 border-b-2 border-purple-500 pb-2">
              3. Setup and Configuration
            </h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                  Prerequisites
                </h3>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Before setting up the CI/CD Manager, ensure you have the
                  following:
                </p>
                <ul className="list-disc pl-8 space-y-4 text-gray-300">
                  <li>
                    <span className="font-medium bg-gradient-to-r from-blue-300 to-purple-400 text-transparent bg-clip-text">
                      A GitHub Repository with Workflows
                    </span>
                    : A repository with pre-configured GitHub Actions workflows
                    that you want to monitor and manage.
                  </li>
                  <li>
                    <span className="font-medium bg-gradient-to-r from-blue-300 to-purple-400 text-transparent bg-clip-text">
                      Access to GitHub APIs via a Personal Access Token (PAT)
                    </span>
                    : Generate a Personal Access Token from your GitHub account
                    with the necessary permissions to access workflows and
                    create issues.
                  </li>
                  <li>
                    <span className="font-medium bg-gradient-to-r from-blue-300 to-purple-400 text-transparent bg-clip-text">
                      Discord and Slack Channels/Webhooks for Notifications
                    </span>
                    : Set up channels in Discord and Slack to receive workflow
                    failure alerts and generate webhook URLs for integration.
                  </li>
                  <li>
                    <span className="font-medium bg-gradient-to-r from-blue-300 to-purple-400 text-transparent bg-clip-text">
                      Node.js and npm Installed
                    </span>
                    : Ensure Node.js and npm are installed on your development
                    machine and the Azure VM.
                  </li>
                  <li>
                    <span className="font-medium bg-gradient-to-r from-blue-300 to-purple-400 text-transparent bg-clip-text">
                      Azure Virtual Machine
                    </span>
                    : A provisioned Azure VM with access to deploy and run your
                    application. Ensure SSH access and appropriate
                    configurations are in place.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-semibold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                  Steps to Configure
                </h3>
                <ul className="list-disc pl-8 space-y-6">
                  <li>
                    <h4 className="font-medium bg-gradient-to-r from-blue-300 to-purple-400 text-transparent bg-clip-text">
                      Clone the Repository
                    </h4>
                    <p className="text-gray-300 leading-relaxed">
                      Clone the CI/CD Manager codebase to your local machine or
                      directly on the Azure VM:
                    </p>
                    <pre className="bg-gray-800 rounded-lg p-4 border border-gray-700 text-gray-200">
                      <code>git clone &lt;repo-url&gt;</code>
                      <br />
                      <code>cd ci-cd-manager</code>
                    </pre>
                  </li>
                  <li>
                    <h4 className="font-medium bg-gradient-to-r from-blue-300 to-purple-400 text-transparent bg-clip-text">
                      Install Dependencies
                    </h4>
                    <p className="text-gray-300 leading-relaxed">
                      Navigate to the project directory and install the required
                      Node.js dependencies:
                    </p>
                    <pre className="bg-gray-800 rounded-lg p-4 border border-gray-700 text-gray-200">
                      <code>npm install</code>
                    </pre>
                  </li>
                  <li>
                    <h4 className="font-medium bg-gradient-to-r from-blue-300 to-purple-400 text-transparent bg-clip-text">
                      Configure Environment Variables
                    </h4>
                    <p className="text-gray-300 leading-relaxed">
                      Create a `.env.local` file in the project directory and
                      add the following environment variables:
                    </p>
                    <pre className="bg-gray-800 rounded-lg p-4 border border-gray-700 text-gray-200">
                      <code>
                        GITHUB_TOKEN=&lt;your_github_personal_access_token&gt;
                      </code>
                      <br />
                      <code>
                        DISCORD_WEBHOOK_URL=&lt;your_discord_webhook_url&gt;
                      </code>
                      <br />
                      <code>
                        SLACK_WEBHOOK_URL=&lt;your_slack_webhook_url&gt;
                      </code>
                    </pre>
                    <p className="text-gray-300 leading-relaxed">
                      Replace placeholders with your actual values.
                    </p>
                  </li>
                  <li>
                    <h4 className="font-medium bg-gradient-to-r from-blue-300 to-purple-400 text-transparent bg-clip-text">
                      Build the Next.js Application
                    </h4>
                    <p className="text-gray-300 leading-relaxed">
                      Prepare the Next.js application for deployment by building
                      it:
                    </p>
                    <pre className="bg-gray-800 rounded-lg p-4 border border-gray-700 text-gray-200">
                      <code>npm run build</code>
                    </pre>
                  </li>
                  <li>
                    <h4 className="font-medium bg-gradient-to-r from-blue-300 to-purple-400 text-transparent bg-clip-text">
                      Deploy to Azure VM
                    </h4>
                    <p className="text-gray-300 leading-relaxed">
                      Deploy the application to the Azure VM:
                    </p>
                    <ol className="list-decimal pl-8 space-y-4 text-gray-300">
                      <li>Transfer files to Azure VM:</li>
                      <pre className="bg-gray-800 rounded-lg p-4 border border-gray-700 text-gray-200">
                        <code>
                          scp -r ./ci-cd-manager
                          &lt;username&gt;@&lt;vm-ip&gt;:~/ci-cd-manager
                        </code>
                      </pre>
                      <li>SSH into the Azure VM:</li>
                      <pre className="bg-gray-800 rounded-lg p-4 border border-gray-700 text-gray-200">
                        <code>ssh &lt;username&gt;@&lt;vm-ip&gt;</code>
                      </pre>
                      <li>Install Node.js on Azure VM:</li>
                      <pre className="bg-gray-800 rounded-lg p-4 border border-gray-700 text-gray-200">
                        <code>sudo apt update</code>
                        <br />
                        <code>sudo apt install nodejs npm</code>
                      </pre>
                      <li>Install PM2 for process management:</li>
                      <pre className="bg-gray-800 rounded-lg p-4 border border-gray-700 text-gray-200">
                        <code>npm install -g pm2</code>
                      </pre>
                      <li>Start the application using PM2:</li>
                      <pre className="bg-gray-800 rounded-lg p-4 border border-gray-700 text-gray-200">
                        <code>cd ~/ci-cd-manager</code>
                        <br />
                        <code>
                          pm2 start npm --name "ci-cd-manager" -- start
                        </code>
                      </pre>
                      <li>
                        Configure firewall rules to open the default port (3000)
                        in Azure.
                      </li>
                      <li>Access the application via the browser at:</li>
                      <pre className="bg-gray-800 rounded-lg p-4 border border-gray-700 text-gray-200">
                        <code>http://&lt;vm-ip&gt;:3000</code>
                      </pre>
                    </ol>
                  </li>
                  <li>
                    <h4 className="font-medium bg-gradient-to-r from-blue-300 to-purple-400 text-transparent bg-clip-text">
                      Verify Setup
                    </h4>
                    <p className="text-gray-300 leading-relaxed">
                      Ensure workflows are visible and alerts are sent to the
                      configured channels.
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section
            id="how-it-works"
            className="space-y-8 bg-gradient-to-br from-zinc-800 to-zinc-800 p-8 rounded-lg shadow-2xl text-white"
          >
            <h2 className="text-3xl font-bold text-purple-400 border-b-2 border-purple-500 pb-2">
              4. How It Works
            </h2>

            <div className="space-y-6">
              <h3 className="text-2xl font-semibold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                Workflow of the CI/CD Manager System
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed">
                The CI/CD Manager operates through a streamlined and automated
                process to monitor workflows, address failures, and notify teams
                effectively. Here's an explanation of how each component works:
              </p>

              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-semibold text-purple-400">
                    1. Fetch Workflow Information
                  </h4>
                  <ul className="list-disc pl-8 space-y-4 text-gray-300">
                    <li>
                      The system continuously polls GitHub workflows using the
                      GitHub REST API.
                    </li>
                    <li>
                      Steps involved:
                      <ol className="list-decimal pl-10 space-y-2">
                        <li>
                          Authenticate using the{" "}
                          <code className="bg-gray-800 px-2 py-1 rounded">
                            GITHUB_TOKEN
                          </code>
                          .
                        </li>
                        <li>Fetch workflow runs from the GitHub repository.</li>
                        <li>
                          Analyze workflow statuses and retrieve logs for failed
                          runs.
                        </li>
                      </ol>
                    </li>
                    <li>
                      Purpose: Aggregates information into a central dashboard
                      for easy monitoring.
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-xl font-semibold text-purple-400">
                    2. Automate Issue Creation
                  </h4>
                  <ul className="list-disc pl-8 space-y-4 text-gray-300">
                    <li>
                      Automatically creates a GitHub issue when a workflow
                      fails.
                    </li>
                    <li>
                      Steps involved:
                      <ol className="list-decimal pl-10 space-y-2">
                        <li>Identify failed workflows.</li>
                        <li>
                          Extract relevant data: workflow name, failure time,
                          error logs, etc.
                        </li>
                        <li>
                          Create a detailed GitHub issue using the GitHub Issues
                          API.
                        </li>
                      </ol>
                    </li>
                    <li>
                      Purpose: Ensures failures are logged and tracked
                      systematically.
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-xl font-semibold text-purple-400">
                    3. Real-time Notifications
                  </h4>
                  <ul className="list-disc pl-8 space-y-4 text-gray-300">
                    <li>
                      Sends instant alerts via Discord and Slack when a
                      production workflow fails.
                    </li>
                    <li>
                      Notifications include:
                      <ul className="list-disc pl-10 space-y-2">
                        <li>Workflow name</li>
                        <li>Failure time</li>
                        <li>Error summary</li>
                        <li>Link to GitHub logs</li>
                      </ul>
                    </li>
                    <li>
                      Purpose: Reduces response time for addressing failures.
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-xl font-semibold text-purple-400">
                    4. Integration with Kestra
                  </h4>
                  <ul className="list-disc pl-8 space-y-4 text-gray-300">
                    <li>
                      Uses Kestra for task orchestration to handle scalability
                      and automation.
                    </li>
                    <li>
                      Steps involved:
                      <ol className="list-decimal pl-10 space-y-2">
                        <li>
                          Define workflows in Kestra using its Visual Workflow
                          Designer.
                        </li>
                        <li>
                          Automate tasks such as polling GitHub, creating
                          issues, and sending notifications.
                        </li>
                      </ol>
                    </li>
                    <li>
                      Purpose: Simplifies management and provides scalability
                      for multiple repositories.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <p className="text-lg text-gray-300 leading-relaxed">
              <strong className="text-purple-400">
                End-to-End Workflow Example:
              </strong>{" "}
              A developer pushes code to GitHub, triggering a CI/CD workflow.
              The CI/CD Manager polls the repository, identifies issues, creates
              GitHub issues, and sends real-time alerts to the team. Kestra
              orchestrates the tasks, ensuring smooth execution.
            </p>
          </section>

          <section
            id="secrets-environment-variables"
            className="space-y-8 bg-gradient-to-br from-zinc-800 to-zinc-800 p-8 rounded-lg shadow-2xl text-white"
          >
            <h2 className="text-3xl font-bold text-purple-400 border-b-2 border-purple-500 pb-2">
              5. Secrets and Environment Variables
            </h2>

            <div className="space-y-6">
              <div>
                <h4 className="text-xl font-semibold text-purple-400">
                  1. Required Secrets
                </h4>
                <p className="text-lg text-gray-300 leading-relaxed">
                  These secrets are essential for the application to access
                  external APIs and services securely:
                </p>
                <ul className="list-disc pl-8 space-y-6 text-gray-300">
                  <li>
                    <h5 className="text-lg font-semibold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                      GITHUB_TOKEN:
                    </h5>
                    <ul className="list-disc pl-8 space-y-3">
                      <li>
                        <strong>Purpose:</strong> Used to authenticate requests
                        to GitHub APIs for fetching workflows, triggering
                        actions, and creating issues.
                      </li>
                      <li>
                        <strong>Scope:</strong>
                        <code className="bg-gray-800 px-2 py-1 rounded">
                          repo
                        </code>
                        ,
                        <code className="bg-gray-800 px-2 py-1 rounded">
                          workflow
                        </code>
                        .
                      </li>
                      <li>
                        <strong>Example Value:</strong>
                        <pre className="bg-gray-800 rounded-lg p-4 border border-gray-700 text-gray-200 mt-2">
                          ghp_abcdefghijklmnopqrstuvwxyz1234567890
                        </pre>
                      </li>
                    </ul>
                  </li>

                  <li>
                    <h5 className="text-lg font-semibold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                      DISCORD_WEBHOOK_URL:
                    </h5>
                    <ul className="list-disc pl-8 space-y-3">
                      <li>
                        <strong>Purpose:</strong> Used to send notifications to
                        Discord channels.
                      </li>
                      <li>
                        <strong>Example Value:</strong>
                        <pre className="bg-gray-800 rounded-lg p-4 border border-gray-700 text-gray-200 mt-2">
                          https://discord.com/api/webhooks/webhook_id/webhook_token
                        </pre>
                      </li>
                    </ul>
                  </li>

                  <li>
                    <h5 className="text-lg font-semibold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                      SLACK_WEBHOOK_URL:
                    </h5>
                    <ul className="list-disc pl-8 space-y-3">
                      <li>
                        <strong>Purpose:</strong> Used to send alerts to Slack
                        channels.
                      </li>
                      <li>
                        <strong>Example Value:</strong>
                        <pre className="bg-gray-800 rounded-lg p-4 border border-gray-700 text-gray-200 mt-2">
                          https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX
                        </pre>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section
            id="implementation-details"
            className="space-y-8 bg-gradient-to-br from-zinc-800 to-zinc-800 p-8 rounded-lg shadow-2xl text-white"
          >
            <h2 className="text-3xl font-bold text-purple-400 border-b-2 border-purple-500 pb-2">
              6. Implementation Details
            </h2>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gradient bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                1. Languages & Tools
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-300">
                <li>
                  <strong>Next.js:</strong> A React-based framework for building
                  the frontend UI, enabling a smooth and interactive dashboard
                  experience.
                </li>
                <li>
                  <strong>GitHub API:</strong> Used to interact with GitHub
                  repositories, workflows, and issues, enabling workflow
                  monitoring and issue automation.
                </li>
                <li>
                  <strong>Kestra:</strong> A workflow orchestration platform
                  used to automate tasks such as fetching data, creating issues,
                  and sending notifications.
                </li>
                <li>
                  <strong>Discord API:</strong> Facilitates sending real-time
                  alerts to Discord channels via webhooks.
                </li>
                <li>
                  <strong>Slack API:</strong> Enables integration with Slack for
                  additional notification channels, ensuring redundancy and
                  flexibility.
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gradient bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                2. Workflow Monitoring
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-300">
                <li>
                  The system uses the GitHub REST API to monitor workflow runs.
                </li>
                <li>
                  <strong>Key steps:</strong>
                  <ul className="list-decimal pl-6 space-y-2">
                    <li>
                      Authenticate with GitHub using a Personal Access Token (
                      <code className="bg-gray-800 p-1 rounded">
                        GITHUB_TOKEN
                      </code>
                      ).
                    </li>
                    <li>
                      Fetch details of workflows and their runs using GitHub API
                      endpoints like:
                      <ul className="list-disc pl-6 space-y-2">
                        <li>
                          <code className="bg-gray-800 p-1 rounded">
                            GET /repos/{"{owner}"}/{"{repo}"}/actions/runs
                          </code>
                          : Retrieves a list of recent workflow runs.
                        </li>
                        <li>
                          <code className="bg-gray-800 p-1 rounded">
                            GET /repos/{"{owner}"}/{"{repo}"}/actions/runs/
                            {"{run_id}"}/logs
                          </code>
                          : Fetches logs for a specific workflow run.
                        </li>
                      </ul>
                    </li>
                    <li>
                      Parse and store workflow statuses (success, failure,
                      in-progress) along with relevant metadata (timestamps, job
                      details, etc.).
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>Purpose:</strong>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Provides real-time updates on workflow statuses.</li>
                    <li>
                      Displays results on a central dashboard for easy
                      monitoring.
                    </li>
                  </ul>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gradient bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                3. Issue Creation
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-300">
                <li>
                  The system uses the GitHub Issues API to automate the creation
                  of issues for failed workflows.
                </li>
                <li>
                  <strong>Key steps:</strong>
                  <ul className="list-decimal pl-6 space-y-2">
                    <li>Detect failed workflows during the polling process.</li>
                    <li>
                      Use the{" "}
                      <code className="bg-gray-800 p-1 rounded">
                        POST /repos/{"{owner}"}/{"{repo}"}/issues
                      </code>{" "}
                      endpoint to create a new issue.
                    </li>
                    <li>
                      Include detailed information in the issue description,
                      such as:
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Workflow name and run ID.</li>
                        <li>Error summary and logs.</li>
                        <li>Suggested resolution steps (if applicable).</li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>Purpose:</strong>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      Automates the process of logging issues for failed
                      workflows, ensuring they are tracked systematically.
                    </li>
                  </ul>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gradient bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                4. Notifications
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-300">
                <li>
                  The system uses Discord and Slack webhooks to send real-time
                  notifications about workflow events (e.g., failures).
                </li>
                <li>
                  <strong>Discord Integration:</strong>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      Uses the Discord Webhook API to send alerts to a specific
                      channel.
                    </li>
                    <li>
                      Notifications include:
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Workflow name</li>
                        <li>Failure time</li>
                        <li>Error summary</li>
                        <li>Direct link to GitHub logs</li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>Slack Integration:</strong>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      Uses the Slack Incoming Webhooks API to send alerts to a
                      Slack channel.
                    </li>
                    <li>
                      Provides similar information as Discord notifications.
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>Key steps:</strong>
                  <ul className="list-decimal pl-6 space-y-2">
                    <li>
                      Configure{" "}
                      <code className="bg-gray-800 p-1 rounded">
                        DISCORD_WEBHOOK_URL
                      </code>{" "}
                      and{" "}
                      <code className="bg-gray-800 p-1 rounded">
                        SLACK_WEBHOOK_URL
                      </code>{" "}
                      in the environment variables.
                    </li>
                    <li>Trigger notifications based on workflow statuses.</li>
                  </ul>
                </li>
                <li>
                  <strong>Purpose:</strong>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      Keeps team members informed of critical events in
                      real-time.
                    </li>
                    <li>Reduces response time for handling failures.</li>
                  </ul>
                </li>
              </ul>
            </div>
          </section>

          <section
            id="notifications-and-alerts"
            className="space-y-6 bg-zinc-800 p-6 rounded-lg shadow-lg text-white"
          >
            <h2 className="text-3xl font-bold text-purple-400 border-b-2 border-purple-500 pb-2">
              7. Notifications and Alerts
            </h2>

            <p className="text-gray-300">
              The CI/CD Manager ensures that team members stay informed of
              critical workflow events by sending real-time alerts to Discord
              and Slack. These notifications provide detailed insights into
              workflow failures, enabling quick response and resolution.
            </p>
            <div className="flex justify-center">
              <img
                src="/kestra-2.png"
                alt="Workflow Display"
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gradient bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                Discord Alerts
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-300">
                <li>
                  <strong>Purpose:</strong> To notify teams immediately of
                  workflow failures in a specified Discord channel.
                </li>
                <li>
                  <strong>Details Included:</strong>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong>Workflow Name:</strong> The name of the workflow
                      that failed, providing context about the specific
                      pipeline.
                    </li>
                    <li>
                      <strong>Failure Time:</strong> The exact time the workflow
                      failed, allowing teams to correlate events and logs.
                    </li>
                    <li>
                      <strong>Error Summary:</strong> A concise description of
                      the error encountered during the workflow run.
                    </li>
                    <li>
                      <strong>Link to GitHub Logs:</strong> A direct link to the
                      GitHub logs for the failed workflow, enabling team members
                      to investigate the failure quickly.
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>Notification Example:</strong>
                  <pre className="bg-gray-800 rounded p-4 border border-gray-700 text-gray-200 whitespace-pre-wrap break-words">
                    🔴 Workflow Failure Detected! Workflow: Build and Deploy
                    Time: 29/11/2024, 2:30 PM UTC Error: Missing environment
                    variables during staging deployment. Logs:{" "}
                    <a
                      href="https://github.com/username/repo/actions/runs/123456789"
                      className="text-blue-400 underline"
                    >
                      View Logs
                    </a>
                  </pre>
                </li>
                <li>
                  <strong>Configuration:</strong>
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>
                      Obtain a Discord Webhook URL by creating a webhook in your
                      Discord channel settings.
                    </li>
                    <li>
                      Add the webhook URL to the environment variables (
                      <code className="bg-gray-800 p-1 rounded">
                        DISCORD_WEBHOOK_URL
                      </code>
                      ).
                    </li>
                    <li>
                      The system triggers a POST request to the Discord webhook
                      when a failure is detected, sending the alert message in
                      JSON format.
                    </li>
                  </ol>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gradient bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                Slack Alerts
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-300">
                <li>
                  <strong>Purpose:</strong> To provide an additional
                  notification channel for teams using Slack as their primary
                  communication tool or as a redundancy to Discord alerts.
                </li>
                <li>
                  <strong>Details Included:</strong>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong>Workflow Name:</strong> Identifies the failed
                      workflow.
                    </li>
                    <li>
                      <strong>Failure Time:</strong> Time when the workflow
                      failed.
                    </li>
                    <li>
                      <strong>Error Summary:</strong> Key details about the
                      error or failure cause.
                    </li>
                    <li>
                      <strong>Link to GitHub Logs:</strong> A clickable link to
                      access detailed logs for troubleshooting.
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>Notification Example:</strong>
                  <pre className="bg-gray-800 rounded p-4 border border-gray-700 text-gray-200 whitespace-pre-wrap break-words">
                    🔴 Workflow Failure Detected! Workflow Name: Build and
                    Deploy | Failure Time: 29/11/2024, 2:30 PM UTC Error
                    Summary: Deployment to staging failed (missing environment
                    variables). Logs:{" "}
                    <a
                      href="https://github.com/username/repo/actions/runs/123456789"
                      className="text-blue-400 underline"
                    >
                      View Logs
                    </a>
                  </pre>
                </li>
                <li>
                  <strong>Configuration:</strong>
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>
                      Obtain a Slack Webhook URL by setting up an incoming
                      webhook in your Slack workspace.
                    </li>
                    <li>
                      Add the webhook URL to the environment variables (
                      <code className="bg-gray-800 p-1 rounded">
                        SLACK_WEBHOOK_URL
                      </code>
                      ).
                    </li>
                    <li>
                      The system triggers a POST request to the Slack webhook,
                      sending the alert message formatted as a JSON payload.
                    </li>
                  </ol>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gradient bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                Benefits of Alerts
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-300">
                <li>
                  <strong>Real-time Updates:</strong> Both Discord and Slack
                  notifications ensure that teams are informed about workflow
                  failures immediately.
                </li>
                <li>
                  <strong>Comprehensive Information:</strong> Alerts include all
                  necessary details, enabling efficient debugging and
                  resolution.
                </li>
                <li>
                  <strong>Cross-Platform Flexibility:</strong> Supports both
                  Discord and Slack, catering to diverse team preferences.
                </li>
              </ul>
              <p className="text-gray-300">
                These alerts streamline communication and ensure that workflow
                failures are addressed promptly, minimizing downtime and
                enhancing overall CI/CD pipeline reliability.
              </p>
            </div>
          </section>

          <section
            id="using-kestra-for-orchestration"
            className="space-y-6 bg-zinc-800 p-6 rounded-lg shadow-lg text-white"
          >
            <h2 className="text-3xl font-bold text-purple-400 border-b-2 border-purple-500 pb-2">
              8. Using Kestra for Orchestration
            </h2>

            <p className="text-gray-300">
              Kestra is a Unified Orchestration Platform that simplifies complex
              workflows and automates tasks. In the CI/CD Manager, Kestra plays
              a key role in orchestrating tasks such as workflow monitoring,
              issue creation, and notification delivery.
            </p>

            <div className="flex justify-center">
              <img
                src="/kestra.png"
                alt="Workflow Display"
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gradient bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                1. Visual Workflow Designer
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-300">
                <li>
                  <strong>Purpose:</strong> Kestra's Visual Workflow Designer
                  enables users to design and manage workflows through an
                  intuitive interface without extensive coding.
                </li>
                <li>
                  <strong>Features:</strong>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      Provides a visual topology of the workflow, showing how
                      tasks are interconnected.
                    </li>
                    <li>
                      Allows users to define workflow actions (e.g., fetch
                      GitHub workflows, create issues, send notifications) using
                      drag-and-drop elements or YAML configurations.
                    </li>
                    <li>
                      Supports both technical and non-technical users, making
                      workflows easier to understand and manage.
                    </li>
                  </ul>
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <header className="mb-6">
                <h1 className="text-3xl font-bold text-purple-400">
                  Kestra Workflow Implementation
                </h1>
                <p className="text-gray-300 mt-2">
                  This is how we have implementated workflow for creating GitHub
                  issues and sending Discord notifications.
                </p>
              </header>

              <section className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gradient bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                    Workflow Metadata
                  </h3>
                  <pre className="bg-gray-800 rounded p-4 border border-gray-700 text-gray-200">
                    {`id: create-github-issue-on-failure
namespace: hacktastic.team
description: Workflow to create GitHub issues and send Discord notifications for executions

variables:
  kestra_url: http://4.188.74.224:8080/`}
                  </pre>

                  <h3 className="text-xl font-semibold text-gradient bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                    Inputs
                  </h3>
                  <pre className="bg-gray-800 rounded p-4 border border-gray-700 text-gray-200">
                    {`inputs:
  - id: github_token
    type: STRING
    required: true
    description: GitHub token for creating issues
  - id: github_repository
    type: STRING
    required: true
    description: GitHub repository in the format owner/repo
  - id: github_default_assignee
    type: STRING
    required: true
    description: GitHub default assignee username
  - id: discord_webhook_url
    type: STRING
    required: true
    description: Discord webhook URL
  - id: discord_avatar_url
    type: STRING
    required: false
    defaults: "https://your-kestra-logo-url.png/"
    description: Avatar URL for Discord bot`}
                  </pre>

                  <h3 className="text-xl font-semibold text-gradient bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                    Task: Create GitHub Issue
                  </h3>
                  <pre className="bg-gray-800 rounded p-4 border border-gray-700 text-gray-200">
                    {`tasks:
  - id: create_issue
    type: io.kestra.plugin.github.issues.Create
    jwtToken: "{{ inputs.github_token }}"
    repository: "{{ inputs.github_repository }}"
    title: "Workflow Execution: {{ flow.id }}"
    body: |
      New execution of workflow {{ flow.id }}
      Execution Details:
      Execution ID: {{ execution.id }}
      Start Time: {{ taskrun.startDate }}
      Current Task: {{ task.id }}
    labels:
      - workflow
      - automation
    assignees:
      - "{{ inputs.github_default_assignee }}"`}
                  </pre>

                  <h3 className="text-xl font-semibold text-gradient bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                    Task: Send Discord Notification
                  </h3>
                  <pre className="bg-gray-800 rounded p-4 border border-gray-700 text-gray-200">
                    {`  - id: send_discord_message
    type: io.kestra.plugin.notifications.discord.DiscordExecution
    url: "{{ inputs.discord_webhook_url }}"
    username: Kestra Monitor
    embedList:
      - title: "🔵 Workflow Execution Notification"
        description: |
          Flow: {{ flow.id }}
          Execution ID: {{ execution.id }}
          Task: {{ task.id }}
          [View in Kestra UI]({{ vars.kestra_url }}/execution/{{ execution.id }})
        color:
          - 0 # Red
          - 0 # Green
          - 255 # Blue
    executionId: "{{ execution.id }}"`}
                  </pre>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gradient bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                    Benefits of This Workflow
                  </h3>
                  <ul className="list-disc pl-6 space-y-2 text-gray-300">
                    <li>
                      <strong>Automated Issue Management:</strong> Automatically
                      creates GitHub issues for workflow failures.
                    </li>
                    <li>
                      <strong>Real-Time Notifications:</strong> Sends detailed
                      alerts to Discord channels for quick team response.
                    </li>
                    <li>
                      <strong>Customizable:</strong> Variables and inputs allow
                      easy customization to fit specific needs.
                    </li>
                  </ul>
                </div>
              </section>
            </div>
          </section>

          <section
            id="VScode-Implementation"
            className="space-y-6 bg-zinc-800 p-6 rounded-lg shadow-lg text-white"
          >
            <h2 className="text-3xl font-bold text-purple-400 border-b-2 border-purple-500 pb-2">
              9. VScode Implementation
            </h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                  Key Points
                </h3>
                <ul className="list-disc pl-8 space-y-4 text-gray-300">
                  <li>
                    <span className="font-medium bg-gradient-to-r from-blue-300 to-purple-400 text-transparent bg-clip-text">
                      Notifications
                    </span>
                    : Receives real-time updates about Kestra workflows (e.g.,
                    execution success or failure).
                  </li>
                  <li>
                    <span className="font-medium bg-gradient-to-r from-blue-300 to-purple-400 text-transparent bg-clip-text">
                      Logs
                    </span>
                    : Displays workflow logs in the "Kestra Logs" output channel
                    in VS Code.
                  </li>
                  <li>
                    <span className="font-medium bg-gradient-to-r from-blue-300 to-purple-400 text-transparent bg-clip-text">
                      Commands
                    </span>
                    : Execute tasks like fetching GitHub workflows or creating
                    issues directly from VS Code.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-semibold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                  Why It's Useful
                </h3>
                <ul className="list-disc pl-8 space-y-4 text-gray-300">
                  <li>
                    Streamlined Monitoring: Stay updated without leaving VS
                    Code.
                  </li>
                  <li>Faster Debugging: View logs and errors in real-time.</li>
                  <li>
                    Improved Collaboration: Teams can act on workflow events
                    instantly.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-semibold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                  How It Works
                </h3>
                <ol className="list-decimal pl-8 space-y-4 text-gray-300">
                  <li>
                    <span className="font-medium bg-gradient-to-r from-blue-300 to-purple-400 text-transparent bg-clip-text">
                      Kestra Workflow
                    </span>
                    : Sends HTTP requests to the VS Code extension:
                    <ul className="list-disc pl-8 space-y-4 text-gray-300">
                      <li>
                        <code>/notify</code>: Sends notifications about
                        workflows.
                      </li>
                      <li>
                        <code>/logs</code>: Sends detailed execution logs.
                      </li>
                    </ul>
                  </li>
                  <li>
                    <span className="font-medium bg-gradient-to-r from-blue-300 to-purple-400 text-transparent bg-clip-text">
                      VS Code Extension
                    </span>
                    : Receives and displays these updates in real-time.
                  </li>
                </ol>
              </div>

              <div>
                <h3 className="text-2xl font-semibold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                  Benefits
                </h3>
                <ul className="list-disc pl-8 space-y-4 text-gray-300">
                  <li>Reduces context switching.</li>
                  <li>Simplifies monitoring and debugging.</li>
                  <li>Keeps developers focused in their IDE.</li>
                </ul>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default Docs;
