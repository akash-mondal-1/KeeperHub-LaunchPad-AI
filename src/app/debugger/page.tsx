"use client"

import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Terminal, AlertTriangle, Bug, Wrench, Search, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function DebuggerPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-8 relative">
          <div className="mx-auto max-w-5xl space-y-8 relative z-10">
            
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-2">AI Error Explainer</h1>
              <p className="text-muted-foreground">Paste cryptic RPC errors and let AI explain and fix them for you.</p>
            </div>

            <Card className="bg-card/50 backdrop-blur-xl border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Paste Error Log</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input 
                    defaultValue="Error: execution reverted: ERC20: transfer amount exceeds balance" 
                    className="font-mono text-xs bg-black/40 border-border/50 h-12"
                  />
                  <Button className="h-12 w-32 shadow-lg shadow-primary/20">
                    <Search className="mr-2 h-4 w-4" /> Analyze
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-destructive/10 border-destructive/30 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4">
                  <AlertTriangle className="h-24 w-24 text-destructive/10" />
                </div>
                <CardHeader>
                  <CardTitle className="text-destructive flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" /> What Happened
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10 space-y-4">
                  <p className="text-sm">
                    Your agent attempted to transfer <span className="font-mono bg-background/50 px-1 py-0.5 rounded text-primary">0.05 ETH</span> via the KeeperHub MCP, but the connected wallet only has <span className="font-mono bg-background/50 px-1 py-0.5 rounded text-primary">0.02 ETH</span> available.
                  </p>
                  <div className="p-4 rounded-lg bg-black/40 border border-border/50 font-mono text-xs text-muted-foreground">
                    <div>"code": -32000,</div>
                    <div>"message": "execution reverted"</div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-card/50 backdrop-blur-xl border-primary/30 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4">
                  <Wrench className="h-24 w-24 text-primary/5" />
                </div>
                <CardHeader>
                  <CardTitle className="text-primary flex items-center gap-2">
                    <Bug className="h-5 w-5" /> Suggested Fixes
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10 space-y-4">
                  
                  <div className="flex flex-col gap-3">
                    <Button variant="outline" className="justify-between h-auto py-3 bg-background/50 hover:bg-primary/10 hover:border-primary/50 transition-colors">
                      <div className="flex flex-col items-start">
                        <span className="font-medium text-sm">Add Funds from Faucet</span>
                        <span className="text-xs text-muted-foreground font-normal">Request Sepolia ETH to the connected address</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-primary" />
                    </Button>
                    
                    <Button variant="outline" className="justify-between h-auto py-3 bg-background/50 hover:bg-primary/10 hover:border-primary/50 transition-colors">
                      <div className="flex flex-col items-start">
                        <span className="font-medium text-sm">Modify Agent Prompt</span>
                        <span className="text-xs text-muted-foreground font-normal">Tell the agent to check balances before executing</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-primary" />
                    </Button>
                  </div>
                  
                </CardContent>
              </Card>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
