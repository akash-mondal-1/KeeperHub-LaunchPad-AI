# 🚀 KeeperHub LaunchPad AI

> **Zero → First KeeperHub Transaction in Under 3 Minutes**

One-command setup, interactive onboarding, environment diagnostics, starter templates, workflow visualization, AI debugging, and real KeeperHub execution.

Built for the **KeeperHub Agents Onchain Hackathon**.

## 🌟 Features

*   **AI Project Scaffolder**: Generate ready-to-deploy templates for DAO voters, NFT minters, DeFi bots, and more.
*   **System Doctor**: Instantly verify your Node.js version, wallet connection, KeeperHub MCP, and API keys.
*   **One-Click First Transaction**: A visual workflow builder that takes you from agent decision to onchain execution without writing a line of code.
*   **AI Error Explainer**: Paste cryptic RPC errors and get human-readable explanations with one-click fixes.
*   **Interactive Tutorial**: Embedded documentation that guides you through the entire lifecycle of a KeeperHub transaction.

## 🏗 Architecture

The LaunchPad utilizes a robust relayer pattern to ensure transactions are safely routed through the KeeperHub Execution Layer.

```mermaid
graph TD
    A[Browser / LaunchPad] -->|Sign Transaction| B[KeeperHub MCP]
    B -->|Relayer Payload| C[KeeperHub Execution Engine]
    C -->|Gas Estimation & MEV Protection| D[Ethereum Sepolia]
    D -->|Transaction Mined| E[KeeperHub Audit Trail]
    E -->|JSON-RPC Output| A
```

## 🎥 Demos

*(Replace these placeholders with real GIFs for the final submission!)*

*   **1. Setup & Environment Doctor**: `![Setup GIF](./docs/gifs/setup.gif)`
*   **2. Template Generation**: `![Template GIF](./docs/gifs/template.gif)`
*   **3. First Transaction (KeeperHub MCP)**: `![Workflow GIF](./docs/gifs/workflow.gif)`
*   **4. AI Error Explainer**: `![Debugger GIF](./docs/gifs/debugger.gif)`

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/your-username/keeperhub-launchpad-ai.git

# Navigate to the project
cd keeperhub-launchpad-ai

# Install dependencies
npm install

# Start the LaunchPad dashboard
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🛠 Architecture

*   **Frontend**: Next.js 15, React 19, Tailwind CSS v4, shadcn/ui, Framer Motion
*   **Execution Layer**: KeeperHub MCP / CLI integration
*   **Wallet**: MetaMask / WalletConnect compatible abstractions

## 💻 CLI Helpers

You can also run our standalone diagnostic tool:

```bash
npx keeperhub-doctor
```
*(See `scripts/keeperhub-doctor.js` for implementation)*

## 🤝 Contributing

We'd love to see KeeperHub LaunchPad AI become the official `create-keeperhub-app`! Check out our open PR ideas in the `PR_IDEAS.md` file.

## 📜 License

MIT
