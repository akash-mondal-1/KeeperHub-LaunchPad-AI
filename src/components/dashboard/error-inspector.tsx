"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, FileText, Activity } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface KeeperHubError {
  error: string;
  detail?: string;
  hint?: string;
  docs_url?: string;
  request_id?: string;
  status_code?: number;
}

export function ErrorInspector({ error }: { error: KeeperHubError | null }) {
  if (!error) return null;

  return (
    <Card className="bg-red-950/20 border-red-900/50 backdrop-blur-xl mt-4 overflow-hidden">
      <CardHeader className="bg-red-900/10 border-b border-red-900/20 pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-red-400 text-lg">
            <AlertCircle className="h-5 w-5" /> Execution Diagnostics
          </CardTitle>
          {error.status_code && (
            <Badge variant="outline" className="bg-red-950/50 text-red-300 border-red-800">
              HTTP {error.status_code}
            </Badge>
          )}
        </div>
        <CardDescription className="text-red-300/70">
          KeeperHub API rejected the request. Inspector details below.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="grid grid-cols-1 divide-y divide-red-900/20 text-sm">
          <div className="p-4 grid grid-cols-4 gap-4">
            <div className="text-red-400/70 font-medium">Error Code</div>
            <div className="col-span-3 font-mono text-red-300">{error.error}</div>
          </div>
          
          {error.detail && (
            <div className="p-4 grid grid-cols-4 gap-4">
              <div className="text-red-400/70 font-medium">Detail</div>
              <div className="col-span-3 text-red-200">{error.detail}</div>
            </div>
          )}
          
          {error.hint && (
            <div className="p-4 grid grid-cols-4 gap-4 bg-red-900/5">
              <div className="text-red-400/70 font-medium flex items-center gap-2">
                <Activity className="h-4 w-4" /> Hint
              </div>
              <div className="col-span-3 text-red-300 italic">"{error.hint}"</div>
            </div>
          )}

          {error.request_id && (
            <div className="p-4 grid grid-cols-4 gap-4">
              <div className="text-red-400/70 font-medium">Request ID</div>
              <div className="col-span-3 font-mono text-xs text-red-400/50">{error.request_id}</div>
            </div>
          )}

          {error.docs_url && (
            <div className="p-4 grid grid-cols-4 gap-4">
              <div className="text-red-400/70 font-medium flex items-center gap-2">
                <FileText className="h-4 w-4" /> Documentation
              </div>
              <div className="col-span-3">
                <a href={error.docs_url} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline inline-flex items-center gap-1">
                  Read KeeperHub Docs
                </a>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
