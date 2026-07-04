"use client"
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { KeyRound, CheckCircle2, AlertCircle, Loader2, Server } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function ApiWizard() {
  const [apiKey, setApiKey] = useState("");
  const [isValidating, setIsValidating] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [orgName, setOrgName] = useState("");
  const [errorDetails, setErrorDetails] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem("kh_api_key");
    if (saved) {
      setApiKey(saved);
      // Auto validate if it looks like a key
      if (saved.startsWith("kh_")) {
        validateKey(saved);
      }
    }
  }, []);

  const validateKey = async (keyToTest: string) => {
    if (!keyToTest.startsWith("kh_")) {
      setStatus("error");
      setErrorDetails({ error: "Invalid Key Format", hint: "Organization API keys must start with 'kh_'" });
      return;
    }

    setIsValidating(true);
    setStatus("idle");
    setErrorDetails(null);

    try {
      // We proxy the verification through our backend to avoid CORS issues
      const res = await fetch("/api/keeperhub/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ apiKey: keyToTest })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setOrgName(data.organization || "KeeperHub Org");
        localStorage.setItem("kh_api_key", keyToTest);
      } else {
        setStatus("error");
        setErrorDetails(data);
      }
    } catch (e: any) {
      setStatus("error");
      setErrorDetails({ error: "Connection Failed", hint: e.message });
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <Card className="bg-card/50 backdrop-blur-xl border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <KeyRound className="h-5 w-5 text-primary" /> API Key Configuration
        </CardTitle>
        <CardDescription>
          Connect your KeeperHub Workspace to unlock Direct Execution, Workflows, and real-time execution monitoring.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input 
            type="password" 
            placeholder="kh_..." 
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="font-mono bg-background/50"
          />
          <Button 
            disabled={isValidating || !apiKey} 
            onClick={() => validateKey(apiKey)}
            className="w-32"
          >
            {isValidating ? <Loader2 className="h-4 w-4 animate-spin" /> : "Verify Key"}
          </Button>
        </div>

        {status === "success" && (
          <Alert className="bg-green-500/10 border-green-500/20 text-green-400">
            <CheckCircle2 className="h-4 w-4 !text-green-400" />
            <AlertTitle>Connection Successful</AlertTitle>
            <AlertDescription className="text-green-400/80 mt-1">
              Connected to workspace: <strong>{orgName}</strong>
            </AlertDescription>
          </Alert>
        )}

        {status === "error" && errorDetails && (
          <Alert variant="destructive" className="bg-red-500/10 border-red-500/20 text-red-400">
            <AlertCircle className="h-4 w-4 !text-red-400" />
            <AlertTitle>Connection Failed</AlertTitle>
            <AlertDescription className="mt-2 space-y-1 text-xs font-mono">
              <div><strong>Error:</strong> {errorDetails.error}</div>
              {errorDetails.detail && <div><strong>Detail:</strong> {errorDetails.detail}</div>}
              {errorDetails.hint && <div><strong>Hint:</strong> {errorDetails.hint}</div>}
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
