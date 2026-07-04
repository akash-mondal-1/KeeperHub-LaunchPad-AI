"use client"

import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Compass, Rocket, Zap, Clock, Shield, Play } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const marketplaceWorkflows = [
  {
    id: "wf_mev_protection",
    title: "MEV-Protected Swap",
    desc: "Route trades through private mempools with strict slippage bounds.",
    author: "KeeperHub Official",
    installs: "12k+",
    icon: Shield,
    color: "text-purple-500",
    bg: "bg-purple-500/10"
  },
  {
    id: "wf_auto_compound",
    title: "Yield Auto-Compounder",
    desc: "Harvest and restake yields when gas prices are optimal.",
    author: "DeFi Builder",
    installs: "8k+",
    icon: Zap,
    color: "text-yellow-500",
    bg: "bg-yellow-500/10"
  },
  {
    id: "wf_health_monitor",
    title: "Collateral Health Monitor",
    desc: "Send Discord alerts and auto-repay debt if health factor drops.",
    author: "KeeperHub Official",
    installs: "5k+",
    icon: Activity,
    color: "text-blue-500",
    bg: "bg-blue-500/10"
  }
];

// Helper to use Activity icon since it's imported above
import { Activity } from "lucide-react";

export default function BrowserPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-8 relative">
          <div className="mx-auto max-w-6xl space-y-8 relative z-10">
            
            <div className="flex justify-between items-end mb-8">
              <div>
                <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-2">
                  <Compass className="h-8 w-8 text-primary" /> Workflow Browser
                </h1>
                <p className="text-muted-foreground">Discover, import, and execute KeeperHub marketplace workflows.</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search workflows..." className="pl-10 bg-card/50" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {marketplaceWorkflows.map((wf) => (
                <Card key={wf.id} className="bg-card/50 backdrop-blur-xl border-border/50 hover:border-primary/50 transition-all group cursor-pointer flex flex-col">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-4">
                      <div className={`p-3 rounded-xl ${wf.bg}`}>
                        <wf.icon className={`h-6 w-6 ${wf.color}`} />
                      </div>
                      <Badge variant="secondary" className="bg-background/50">{wf.installs} installs</Badge>
                    </div>
                    <CardTitle className="group-hover:text-primary transition-colors">{wf.title}</CardTitle>
                    <CardDescription>{wf.desc}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                      By <span className="text-foreground font-medium">{wf.author}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-4 border-t border-border/20">
                    <Button variant="ghost" className="w-full justify-between group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                      Import to Studio <Play className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
