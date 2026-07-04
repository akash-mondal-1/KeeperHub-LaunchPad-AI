import { NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

export async function GET() {
  try {
    const [nodeResult, npmResult] = await Promise.all([
      execAsync("node --version").catch(() => ({ stdout: "Not Found" })),
      execAsync("npm --version").catch(() => ({ stdout: "Not Found" }))
    ]);

    const nodeVersion = nodeResult.stdout.trim();
    const npmVersion = npmResult.stdout.trim();

    return NextResponse.json({
      node: {
        version: nodeVersion,
        success: nodeVersion.startsWith("v")
      },
      npm: {
        version: npmVersion,
        success: npmVersion !== "Not Found"
      },
      cli: {
        installed: true, // Mocked abstraction of KeeperHub CLI
        version: "v1.2.4"
      },
      mcp: {
        reachable: true, // Mocked abstraction of KeeperHub MCP
        status: "Running"
      }
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
