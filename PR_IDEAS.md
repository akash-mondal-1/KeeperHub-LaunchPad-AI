# KeeperHub Pull Request Ideas

To maximize our chances for the **Best Onboarding UX Improvement** bounty, here are ideas for PRs we can submit to the upstream KeeperHub repository:

## 1. Interactive Setup Wizard (`keeperhub init`)
Currently, developers have to manually edit `.env` files and configure the MCP.
**PR Idea:** Add an interactive CLI setup wizard using `inquirer` or `prompts` that asks for the RPC URL, Wallet Private Key, and Network, then automatically generates the configuration files.

## 2. Better RPC Error Messages
When an RPC rejects a transaction (e.g. rate limit, or insufficient funds), the error is often an obscure JSON string.
**PR Idea:** Intercept JSON-RPC errors in the KeeperHub execution layer and map common error codes (like `-32000`) to human-readable explanations with suggested fixes (e.g., "Insufficient funds for gas. Please fund your address: 0x...").

## 3. "create-keeperhub-agent" Starter Template
New users shouldn't have to piece together LangChain, ethers.js, and KeeperHub manually.
**PR Idea:** Create a Next.js / Node.js starter template inside `examples/starter-template` in the KeeperHub repo that has everything pre-configured.

## 4. `keeperhub doctor` Command
**PR Idea:** Add a `doctor` command to the CLI that validates:
- Node.js version
- Valid RPC connection
- Valid Wallet format
- MCP Server status
This saves hours of debugging for beginners.
