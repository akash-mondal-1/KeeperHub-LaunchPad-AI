"use client"

import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BookOpen, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function DocsPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-8 relative">
          <div className="mx-auto max-w-5xl space-y-8 relative z-10">
            
            <div className="flex justify-between items-end mb-8">
              <div>
                <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-2">
                  <BookOpen className="h-8 w-8 text-primary" /> Interactive Tutorial
                </h1>
                <p className="text-muted-foreground">Master KeeperHub MCP in minutes.</p>
              </div>
              <div className="relative w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search docs..." className="pl-10 bg-card/50" />
              </div>
            </div>

            <Card className="bg-card/50 backdrop-blur-xl border-border/50">
              <CardHeader>
                <CardTitle className="text-primary text-xl">Quick Start Guide</CardTitle>
                <CardDescription>Follow these steps to execute your first transaction.</CardDescription>
              </CardHeader>
              <CardContent>
                {/* @ts-ignore */}
                <Accordion type="single" collapsible className="w-full">
                  
                  <AccordionItem value="item-1" className="border-border/50">
                    <AccordionTrigger className="hover:text-primary transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="h-6 w-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs">1</div>
                        Connect your wallet
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pl-10 leading-relaxed">
                      Use the "Connect Wallet" button in the top right to link your MetaMask, Phantom, or WalletConnect compatible wallet. We recommend using a testnet (like Sepolia) for your first run.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-2" className="border-border/50">
                    <AccordionTrigger className="hover:text-primary transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="h-6 w-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs">2</div>
                        Run the Environment Checker
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pl-10 leading-relaxed">
                      Navigate to the <strong>System Doctor</strong> and hit "Run Diagnostics". This will ensure you have the KeeperHub MCP and necessary API keys installed. If something fails, the doctor will tell you exactly how to fix it.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3" className="border-border/50">
                    <AccordionTrigger className="hover:text-primary transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="h-6 w-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs">3</div>
                        Test the Workflow
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pl-10 leading-relaxed">
                      Go to the <strong>Workflow</strong> tab. Here you can visualize exactly how your agent's decision gets translated into an onchain transaction, including gas estimation and private routing via KeeperHub. Click "Start Execution" to simulate a run.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4" className="border-border/50 border-b-0">
                    <AccordionTrigger className="hover:text-primary transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="h-6 w-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs">4</div>
                        Scaffold your Agent
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pl-10 leading-relaxed">
                      Once you're comfortable with the flow, head to the <strong>Templates</strong> page to download a boilerplate. We provide ready-to-deploy Next.js/Node templates integrated directly with KeeperHub MCP.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-5" className="border-border/50 border-b-0">
                    <AccordionTrigger className="hover:text-primary transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="h-6 w-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs">5</div>
                        Understand the Architecture
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pl-10 leading-relaxed space-y-4">
                      <p>KeeperHub LaunchPad uses a Relayer pattern. The frontend generates a payload, MetaMask signs it, and our Next.js API (Acting as the KeeperHub MCP) routes it for MEV protection and broadcasts it.</p>
                      
                      <div className="p-4 bg-black/40 rounded-lg border border-border/50 font-mono text-xs overflow-x-auto text-blue-400">
                        Browser ➔ Sign Payload ➔ KeeperHub MCP (API) ➔ KeeperHub Execution ➔ Sepolia ➔ Audit Trail
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                </Accordion>
              </CardContent>
            </Card>

          </div>
        </main>
      </div>
    </div>
  );
}
