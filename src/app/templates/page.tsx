import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Rocket, Coins, Users, Search, Shield, Zap } from "lucide-react";
import Link from "next/link";

const templates = [
  {
    id: "defi-trader",
    name: "DeFi Swap Bot",
    description: "An agent that analyzes sentiment and executes swaps automatically.",
    icon: Zap,
    tags: ["DeFi", "Trading"],
    difficulty: "Beginner"
  },
  {
    id: "dao-voter",
    name: "Autonomous DAO Voter",
    description: "Reads proposals, analyzes impact, and votes onchain.",
    icon: Users,
    tags: ["Governance", "DAO"],
    difficulty: "Intermediate"
  },
  {
    id: "nft-minter",
    name: "AI NFT Creator",
    description: "Generates art based on trends and mints them onchain.",
    icon: Coins,
    tags: ["NFT", "Creative"],
    difficulty: "Beginner"
  },
  {
    id: "treasury-manager",
    name: "Treasury Manager",
    description: "Rebalances DAO treasuries based on yield farming opportunities.",
    icon: Shield,
    tags: ["DeFi", "Treasury"],
    difficulty: "Advanced"
  }
];

export default function TemplatesPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-8 relative">
          <div className="mx-auto max-w-5xl space-y-8 relative z-10">
            
            <div className="flex justify-between items-end mb-8">
              <div>
                <h1 className="text-3xl font-bold tracking-tight mb-2">Agent Templates</h1>
                <p className="text-muted-foreground">Scaffold your AI agent project in one click. Pre-configured for KeeperHub.</p>
              </div>
              <Button className="rounded-full gap-2">
                <Rocket className="h-4 w-4" /> Custom Prompt Scaffolder
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {templates.map((template) => {
                const Icon = template.icon;
                return (
                  <Card key={template.id} className="bg-card/50 backdrop-blur-xl border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(var(--primary),0.1)] flex flex-col">
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <div className="p-3 bg-primary/10 rounded-xl">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <Badge variant="outline" className="bg-background/50">{template.difficulty}</Badge>
                      </div>
                      <CardTitle className="text-xl">{template.name}</CardTitle>
                      <CardDescription className="text-base">{template.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <div className="flex gap-2">
                        {template.tags.map(tag => (
                          <Badge key={tag} variant="secondary" className="bg-secondary/50">{tag}</Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <a href={`/api/download-template?id=${template.id}`} className="w-full">
                        <Button className="w-full shadow-lg hover:shadow-primary/20 transition-all" variant="default">
                          Download & Use Template
                        </Button>
                      </a>
                    </CardFooter>
                  </Card>
                )
              })}
            </div>
            
          </div>
        </main>
      </div>
    </div>
  );
}
