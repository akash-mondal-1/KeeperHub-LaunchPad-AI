import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { apiKey } = await req.json();

    if (!apiKey || !apiKey.startsWith("kh_")) {
      return NextResponse.json({ 
        success: false,
        error: "invalid_key_format",
        detail: "The API key must start with 'kh_'.",
        hint: "Check your workspace settings in KeeperHub.",
        docs_url: "https://docs.keeperhub.com/api#authentication",
        status_code: 400
      }, { status: 400 });
    }

    // In a real scenario, this would call GET https://app.keeperhub.com/api/organizations/me
    // Since we are building this for the hackathon without full KeeperHub auth docs,
    // we will simulate the validation ping to KeeperHub. If it succeeds, we return the Org Name.
    
    // We will attempt to fetch from the KeeperHub API to validate the token
    try {
      const pingRes = await fetch("https://app.keeperhub.com/api/workflows", {
        headers: { "Authorization": `Bearer ${apiKey}` }
      });
      
      if (!pingRes.ok) {
        // If the real API rejects the token (e.g. 401 Unauthorized)
        return NextResponse.json({
          success: false,
          error: "unauthorized",
          detail: "KeeperHub rejected this API key.",
          hint: "Ensure the key is active and has not been revoked.",
          docs_url: "https://docs.keeperhub.com/api#authentication",
          status_code: pingRes.status
        }, { status: pingRes.status });
      }

      // Token is valid
      return NextResponse.json({
        success: true,
        organization: "LaunchPad AI Hacker Org"
      });

    } catch (e: any) {
      // Network failure reaching KeeperHub
      return NextResponse.json({
        success: false,
        error: "network_error",
        detail: e.message,
        hint: "Failed to connect to KeeperHub API servers.",
        status_code: 500
      }, { status: 500 });
    }

  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
