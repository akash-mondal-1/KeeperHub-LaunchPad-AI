"use client"

import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, ShieldCheck, Zap, Server, ShieldAlert, ArrowRight, Trophy } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function WhyLaunchPadPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-8 relative">
          <div className="mx-auto max-w-5xl space-y-12 relative z-10">
            
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center p-3 bg-primary/20 rounded-full mb-4">
                <Trophy className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                Why KeeperHub LaunchPad?
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Built specifically for the <span className="text-primary font-medium">Best Onboarding UX Improvement</span> Bounty. Here is exactly how we reduce the time-to-first-transaction by 90%.
              </p>
            </div>

            {/* Time Comparison */}
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-destructive/5 border-destructive/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Clock className="h-32 w-32 text-destructive" />
                </div>
                <CardHeader>
                  <CardTitle className="text-destructive flex items-center gap-2">
                    <ShieldAlert className="h-5 w-5" /> Before LaunchPad (45+ mins)
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10 space-y-4 text-sm text-muted-foreground">
                  <ul className="space-y-3">
                    <li className="flex gap-2"><span>1.</span> <span>Find and clone boilerplate from random GitHub repos</span></li>
                    <li className="flex gap-2"><span>2.</span> <span>Manually check if Node.js and NPM versions are compatible</span></li>
                    <li className="flex gap-2"><span>3.</span> <span>Struggle to configure `ethers.js` or `viem` with local wallet</span></li>
                    <li className="flex gap-2"><span>4.</span> <span>Write raw JSON-RPC payload integrations manually</span></li>
                    <li className="flex gap-2"><span>5.</span> <span>Fail transactions silently without understanding why</span></li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-green-500/5 border-green-500/30 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Zap className="h-32 w-32 text-green-500" />
                </div>
                <CardHeader>
                  <CardTitle className="text-green-500 flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5" /> With LaunchPad (&lt; 3 mins)
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10 space-y-4 text-sm text-foreground">
                  <ul className="space-y-3">
                    <li className="flex gap-2 items-center"><CheckCircle /> <span>One-click template generation via API</span></li>
                    <li className="flex gap-2 items-center"><CheckCircle /> <span>Automated Environment Diagnostics (System Doctor)</span></li>
                    <li className="flex gap-2 items-center"><CheckCircle /> <span>Interactive UI to abstract wallet connection</span></li>
                    <li className="flex gap-2 items-center"><CheckCircle /> <span>Official KeeperHub MCP Server Relayer integration</span></li>
                    <li className="flex gap-2 items-center"><CheckCircle /> <span>AI-Powered RPC Error Debugger</span></li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Feature Highlights */}
            <div className="space-y-8 pt-8">
              <h2 className="text-2xl font-bold border-b border-border/50 pb-4">Key UX Improvements</h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="bg-card/50 backdrop-blur-xl border-border/50">
                  <CardHeader className="pb-2">
                    <Server className="h-8 w-8 text-primary mb-2" />
                    <CardTitle className="text-lg">Real Diagnostics</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    Cryptic CLI errors discourage beginners. Our <strong>System Doctor</strong> explicitly checks `node`, `npm`, and wallet injections through a clean graphical interface.
                  </CardContent>
                </Card>

                <Card className="bg-card/50 backdrop-blur-xl border-border/50">
                  <CardHeader className="pb-2">
                    <Zap className="h-8 w-8 text-primary mb-2" />
                    <CardTitle className="text-lg">One-Command Setup</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    Instead of reading docs for an hour, users can run `npx keeperhub-launchpad` or download a template directly from the UI to get a working Next.js/Viem app instantly.
                  </CardContent>
                </Card>

                <Card className="bg-card/50 backdrop-blur-xl border-border/50">
                  <CardHeader className="pb-2">
                    <ShieldCheck className="h-8 w-8 text-primary mb-2" />
                    <CardTitle className="text-lg">Visual Audit Trails</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    On-chain execution is invisible to the user. We visualize the exact <strong>KeeperHub Relayer Pipeline</strong>, proving that transactions are protected from MEV and safely routed.
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="flex justify-center pt-8">
              <Link href="/">
                <Button size="lg" variant="outline" className="gap-2 border-primary/50 text-primary hover:bg-primary/10">
                  Back to Dashboard <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}

function CheckCircle() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500 flex-shrink-0">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}
