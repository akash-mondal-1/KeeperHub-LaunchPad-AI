import { NextResponse } from "next/server";
import AdmZip from "adm-zip";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const templateId = searchParams.get("id") || "agent";

  const zip = new AdmZip();
  const folderName = `keeperhub-${templateId}`;

  // Package.json
  const packageJson = {
    name: folderName,
    version: "1.0.0",
    private: true,
    scripts: {
      start: "node index.js"
    },
    dependencies: {
      ethers: "^6.13.0",
      dotenv: "^16.4.5"
    }
  };

  zip.addFile(`${folderName}/package.json`, Buffer.from(JSON.stringify(packageJson, null, 2)));

  // Index.js
  const indexJs = `require('dotenv').config();
const { ethers } = require('ethers');

async function main() {
  console.log("🚀 Starting KeeperHub ${templateId.replace('-', ' ').toUpperCase()} Agent...");
  
  if (!process.env.PRIVATE_KEY) {
    console.log("⚠️ No PRIVATE_KEY found in .env. Running in simulation mode.");
    return;
  }
  
  // Real execution logic here using ethers.js
  const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  
  console.log("✅ Connected as:", await wallet.getAddress());
  console.log("✅ KeeperHub Agent Ready. Listening for decisions...");
}

main().catch(console.error);
`;

  zip.addFile(`${folderName}/index.js`, Buffer.from(indexJs));
  zip.addFile(`${folderName}/.env.example`, Buffer.from("PRIVATE_KEY=\nRPC_URL=https://sepolia.infura.io/v3/your_key"));
  zip.addFile(`${folderName}/.gitignore`, Buffer.from("node_modules\n.env"));
  
  // README
  const readme = `# KeeperHub ${templateId} Agent
  
Run \`npm install\` and then \`npm start\` to execute this agent.`;
  zip.addFile(`${folderName}/README.md`, Buffer.from(readme));

  const zipBuffer = zip.toBuffer();

  return new NextResponse(zipBuffer, {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="${folderName}.zip"`
    }
  });
}
