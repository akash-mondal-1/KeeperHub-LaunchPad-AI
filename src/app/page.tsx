import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Rocket, Terminal, Layers, SearchCheck } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-8 relative">
          
          {/* Subtle background glow effect */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-64 bg-primary/20 blur-[100px] rounded-full pointer-events-none opacity-50" />
          
          <div className="mx-auto max-w-5xl space-y-8 relative z-10">
            <div>
              <h1 className="text-4xl font-bold tracking-tight mb-2">Welcome to KeeperHub LaunchPad AI</h1>
              <p className="text-muted-foreground text-lg">
                The fastest way to scaffold, test, and deploy KeeperHub AI agents onchain.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card className="bg-card/50 backdrop-blur-xl border-primary/20 hover:border-primary/50 transition-colors">
                <CardHeader className="pb-2">
                  <Rocket className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>One-Click Execute</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>Execute your first transaction via KeeperHub MCP instantly.</CardDescription>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-xl border-border/50 hover:border-primary/50 transition-colors">
                <CardHeader className="pb-2">
                  <Layers className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Agent Templates</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>Scaffold DAOs, NFTs, and Escrow agents in seconds.</CardDescription>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-xl border-border/50 hover:border-primary/50 transition-colors">
                <CardHeader className="pb-2">
                  <Terminal className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Built-in Debugger</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>AI-powered error explanations and one-click fixes.</CardDescription>
                </CardContent>
              </Card>
              
              <Card className="bg-card/50 backdrop-blur-xl border-border/50 hover:border-primary/50 transition-colors">
                <CardHeader className="pb-2">
                  <SearchCheck className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Environment Checker</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>Diagnose Node, wallet, and KeeperHub CLI issues instantly.</CardDescription>
                </CardContent>
              </Card>
            </div>
            
            {/* Quick Actions */}
            <div className="mt-8 rounded-2xl border border-primary/20 bg-card/30 p-12 text-center backdrop-blur-xl shadow-lg relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-50" />
              
              <div className="relative z-10">
                <h2 className="text-3xl font-semibold mb-4">Ready to act onchain?</h2>
                <p className="text-muted-foreground mb-8 max-w-xl mx-auto text-lg">
                  Stop mocking transactions. KeeperHub handles gas, retries, and MEV protection so your agent can focus on thinking.
                </p>
                <div className="flex justify-center gap-4">
                  <Button size="lg" className="rounded-full shadow-[0_0_20px_rgba(var(--primary),0.3)] bg-primary text-primary-foreground hover:bg-primary/90">
                    <Rocket className="mr-2 h-4 w-4" />
                    Execute First Transaction
                  </Button>
                  <Link href="/doctor">
                    <Button size="lg" variant="outline" className="rounded-full border-primary/30 hover:bg-primary/10">
                      Run Environment Check
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
