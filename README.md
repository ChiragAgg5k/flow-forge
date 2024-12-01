<p align="center">
    <img src="https://github.com/user-attachments/assets/71d49182-2f0f-4b5b-817c-1e086e3d08bc" width="106" height="106" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/LICENSE-MIT-brightgreen?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Azure-VM-0078D4?style=for-the-badge&logo=azure" />
  <img src="https://img.shields.io/badge/Next.js-v14.2.6-black?style=for-the-badge&logo=next.js" />
  <img src="https://img.shields.io/badge/Kestra-v0.19.12-9b59b6?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Appwrite-F02E65?style=for-the-badge&logo=appwrite&logoColor=white" />
</p>

> ⚠️ Note: Appwrite is currently facing some outage and because of this, the app might not work as expected. Please check the appwrite status [here](https://status.appwrite.online/).

### :star2: About

**Flow-Forge** is your one-stop solution to optimize GitHub workflows. With features like repository orchestration, automated issue management, and streamlined PR reviews, Flow-Forge turns chaotic workflows into seamless clockwork operations.

### :movie_camera: Demo

https://github.com/user-attachments/assets/5eacb4af-2bfd-4ee7-af4d-356c5c77519c

📼 You can also find our Hackfrost submission video here: https://youtu.be/-FPnJWJPmk8?feature=shared

### 🚀 Deployment

- **Kestra**: Deployed on an **Azure Virtual Machine**.
- **Flow-Forge Next.js App**: Deployed on **Vercel**.

$~$

### 📊 Workflow

![kestra](https://github.com/user-attachments/assets/9bf6d202-8157-470c-bbf6-14f2259bd1dd)

$~$

## 📂 Features

1. **GitHub Workflow Monitoring**  
   Track workflow statuses (success, failure, in-progress) with GitHub API integration.

2. **Automated Issue Creation**  
   Automatically generate detailed GitHub issues for failed workflows.

3. **Real-Time Notifications**  
   Receive instant alerts on Discord and Slack for workflow updates.

4. **Email Notifications**  
   Detailed workflow failure alerts via email for extended team reach.

5. **Orchestration with Kestra**  
   Handle multiple repositories and workflows with task automation.

$~$

## 🛠️ Setup and Configuration

### Prerequisites

- **GitHub PAT**: Required for API access.
- **Discord/Slack Webhooks**: Notification channels setup.
- **Appwrite**: Database and collection setup.
- **Azure VM**: Deployment platform for backend services.
- **Node.js & npm**: Runtime and package manager.

### Installation Steps

1. **Clone Repository**

   ```bash
   git clone https://github.com/ChiragAgg5k/flow-forge
   cd flow-forge
   ```

2. **Install Dependencies**

   ```bash
   pnpm install
   ```

3. **Configure Environment Variables**
   Add a `.env.local` file with:

   ```plaintext
   NEXT_PUBLIC_APPWRITE_PROJECT_ID = <your_project_id>
   NEXT_PUBLIC_APPWRITE_DATABASE_ID = <your_database_id>
   NEXT_PUBLIC_APPWRITE_COLLECTION_ID = <your_collection_id>

   NEXT_PUBLIC_GITHUB_TOKEN = <your_token>

   GROQ_API_KEY = <your_key>
   ```

4. **Build Application**

   ```bash
   pnpm build
   ```

5. **Deploy on Azure VM**
   - Follow the instructors on [Kestra.io](https://kestra.io/) on how to deploy Kestra on Azure VM, and replace the public IP address for it in the code. You can find the [workflow file](./kestra/create-github-issue.yaml) here.
     $~$


## 📑 Documentation Highlights

### CI/CD Manager Overview

Flow-Forge simplifies continuous integration and delivery with:

- Workflow status tracking.
- Automated notifications.
- Intuitive dashboard interfaces.

![Workflow](./public/workflow.png)

### Key Features

- **GitHub Issue Automation**  
  Automates logging failed workflows.

- **Discord and Slack Integration**  
  Real-time alerts for quick issue resolution.

- **Kestra Workflow Integration**  
  Visual workflow design for managing orchestration tasks.

$~$

# 🛠️ VS Code Integration

## Features

### Notifications

- Receive real-time updates about Kestra workflows (success or failure) directly in VS Code.

### Logs

- Access detailed workflow logs in the "Kestra Logs" output channel.

### Commands

- Execute tasks like fetching GitHub workflows or creating issues, all from within VS Code.

---

## Benefits

- **Reduces Context Switching**: Stay within the VS Code environment without jumping between tools.
- **Simplifies Monitoring and Debugging**: View detailed logs and workflow statuses effortlessly.
- **Keeps Developers Focused**: All workflow management features are seamlessly integrated into your IDE.

---

## How It Works

### Kestra Workflow

- Sends HTTP requests to the VS Code extension:
  - **`/notify`**: Sends notifications about workflow statuses.
  - **`/logs`**: Sends execution logs.

### VS Code Extension

- Displays updates in real-time, enabling seamless workflow management directly within the IDE.

$~$

### :page_facing_up: License

This project is licensed under the **MIT License**.  
You can find the full text of the license [here](LICENSE).

$~$

## ⏱️ Monitor the Uptime of our App

To keep track of the uptime and status of Flow Forge, visit **[Uptime Monitoring](https://flowforge.betteruptime.com/)**.

<script src="https://uptime.betterstack.com/widgets/announcement.js" data-id="202405" async="async" type="text/javascript"></script>

## :people_holding_hands: Our List of Contributors

<a href="https://github.com/ChiragAgg5k/flow-forge/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=ChiragAgg5k/flow-forge" />
</a>

### :email: Contact

- Email: chiragaggarwal5k@gmail.com
