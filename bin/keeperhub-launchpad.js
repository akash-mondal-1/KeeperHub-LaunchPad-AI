#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log("🚀 Welcome to KeeperHub LaunchPad AI Scaffolder!\n");

const targetDir = process.argv[2] || 'my-keeperhub-agent';
const targetPath = path.resolve(process.cwd(), targetDir);

if (fs.existsSync(targetPath)) {
  console.error(`❌ Error: Directory ${targetDir} already exists.`);
  process.exit(1);
}

console.log(`📁 Creating project in ${targetDir}...`);
fs.mkdirSync(targetPath, { recursive: true });

const packageJson = {
  name: targetDir,
  version: "1.0.0",
  private: true,
  scripts: {
    "start": "node index.js"
  },
  dependencies: {
    "ethers": "^6.13.0",
    "dotenv": "^16.4.5"
  }
};

fs.writeFileSync(
  path.join(targetPath, 'package.json'),
  JSON.stringify(packageJson, null, 2)
);

const indexJs = `
require('dotenv').config();
const { ethers } = require('ethers');

async function main() {
  console.log("🚀 Starting KeeperHub Agent...");
  
  if (!process.env.PRIVATE_KEY) {
    console.log("⚠️ No PRIVATE_KEY found in .env. Running in simulation mode.");
    return;
  }
  
  // Real execution logic here
  console.log("✅ KeeperHub Agent Ready.");
}

main().catch(console.error);
`;

fs.writeFileSync(path.join(targetPath, 'index.js'), indexJs.trim());
fs.writeFileSync(path.join(targetPath, '.env'), 'PRIVATE_KEY=\nRPC_URL=https://sepolia.infura.io/v3/your_key');
fs.writeFileSync(path.join(targetPath, '.gitignore'), 'node_modules\n.env');

console.log("📦 Installing dependencies...");
try {
  execSync('npm install', { cwd: targetPath, stdio: 'inherit' });
  console.log(`\n🎉 Success! Your KeeperHub agent is ready.`);
  console.log(`\nNext steps:`);
  console.log(`  cd ${targetDir}`);
  console.log(`  npm start`);
} catch (e) {
  console.error("❌ Failed to install dependencies.");
}
