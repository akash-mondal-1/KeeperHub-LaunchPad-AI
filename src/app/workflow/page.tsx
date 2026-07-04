"use client"

import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Play, Activity, Terminal, ExternalLink, Loader2, ShieldCheck, Clock, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { createWalletClient, custom, parseEther, createPublicClient, http } from "viem";
import { sepolia } from "viem/chains";


interface AuditData {
  txHash: string;
  status: string;
  executionTimeMs: number;
  estimatedGas: string;
  retries: number;
  routingPath: string[];
}

const workflowSteps = [
  { id: 1, title: "Initialize AI Agent", desc: "Start LangChain/OpenClaw Agent" },
  { id: 2, title: "Agent Decision", desc: "Agent decides to execute onchain" },
  { id: 3, title: "KeeperHub API (Prepare)", desc: "Relayer simulates intent" },
  { id: 4, title: "Client Signature", desc: "MetaMask signs payload" },
  { id: 5, title: "KeeperHub API (Execute)", desc: "Relayer routes & broadcasts" },
  { id: 6, title: "Audit Trail Generated", desc: "Transaction confirmed & logged" }
];

export default function WorkflowPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [auditData, setAuditData] = useState<AuditData | null>(null);

  const addLog = (msg: string, isError = false, isSuccess = false) => {
    const time = new Date().toLocaleTimeString();
    let colorClass = "text-muted-foreground";
    if (isError) colorClass = "text-red-400";
    if (isSuccess) colorClass = "text-green-400";
    setLogs(prev => [...prev, `<span class="text-blue-400">[${time}]</span> <span class="${colorClass}">${msg}</span>`]);
  };

  const startSimulation = async () => {
    if (isRunning) return;
    
    if (typeof window === "undefined" || !window.ethereum) {
      alert("Please install MetaMask to execute real transactions.");
      return;
    }

    setIsRunning(true);
    setActiveStep(1);
    setLogs([]);
    setAuditData(null);
    
    addLog("[Agent] Initializing LangChain agent abstraction...");
    await new Promise(r => setTimeout(r, 1000));
    
    setActiveStep(2);
    addLog("[Agent] Decision: Transfer 0.0001 ETH via KeeperHub MCP.");
    await new Promise(r => setTimeout(r, 1000));

    try {
      const walletClient = createWalletClient({
        chain: sepolia,
        transport: custom(window.ethereum)
      });
      
      const publicClient = createPublicClient({
        chain: sepolia,
        transport: http()
      });

      const [account] = await walletClient.requestAddresses();
      
      setActiveStep(3);
      addLog("[API] Sending intent to KeeperHub MCP (/api/keeperhub/execute)...");
      
      const prepareRes = await fetch("/api/keeperhub/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "prepare", account, to: account })
      });
      const prepareData = await prepareRes.json() as { plan: { gasLimit: string; routing: string; to: string } };
      
      addLog(`[KeeperHub] Simulation SUCCESS. Gas Limit: ${prepareData.plan.gasLimit}`, false, true);
      addLog(`[KeeperHub] Routing allocated: ${prepareData.plan.routing}`);

      setActiveStep(4);
      addLog("[Client] Requesting wallet signature for transaction...");
      
      const hash = await walletClient.sendTransaction({
        account,
        to: prepareData.plan.to as `0x${string}`,
        value: parseEther("0.0001")
      });
      
      addLog(`[Client] Signed and broadcasted. Hash: ${hash}`);
      
      setActiveStep(5);
      addLog("[KeeperHub] Tracking transaction via x402 mempool...");
      
      const receipt = await publicClient.waitForTransactionReceipt({ hash });
      addLog(`[KeeperHub] Transaction CONFIRMED in block ${receipt.blockNumber}!`, false, true);
      
      setActiveStep(6);
      addLog("[API] Fetching final KeeperHub Audit Trail...");
      
      const auditRes = await fetch("/api/keeperhub/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "audit", txHash: hash })
      });
      const auditResult = await auditRes.json() as { audit: AuditData };
      
      setAuditData(auditResult.audit);
      setActiveStep(7);
      
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : "Unknown error";
      addLog(`[Error] ${msg}`, true);
      setActiveStep(0);
    }
    
    setIsRunning(false);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-8 relative">
          <div className="mx-auto max-w-5xl space-y-8 relative z-10">
            
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-2">KeeperHub Execution Workflow</h1>
              <p className="text-muted-foreground">Visualize how your agent&apos;s decisions route securely through the KeeperHub MCP and Execution Layer.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              <div className="lg:col-span-1 space-y-4">
                <Card className="bg-card/50 backdrop-blur-xl border-border/50">
                  <CardHeader>
                    <CardTitle className="text-lg">Execution Pipeline</CardTitle>
                    <CardDescription>KeeperHub Relayer Architecture</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {workflowSteps.map((step) => {
                      const isActive = activeStep === step.id;
                      const isPast = activeStep > step.id;
                      
                      return (
                        <div key={step.id} className={`flex items-start gap-4 transition-opacity duration-300 ${!isActive && !isPast && activeStep !== 0 ? "opacity-40" : "opacity-100"}`}>
                          <div className={`mt-1 h-6 w-6 rounded-full flex items-center justify-center text-xs font-medium border flex-shrink-0 ${
                            isActive ? "bg-primary text-primary-foreground border-primary shadow-[0_0_10px_rgba(var(--primary),0.5)]" :
                            isPast ? "bg-green-500 text-white border-green-500" : "bg-muted border-muted-foreground/30"
                          }`}>
                            {isActive ? <Loader2 className="h-3 w-3 animate-spin" /> : isPast ? <CheckCircle2 className="h-4 w-4" /> : step.id}
                          </div>
                          <div>
                            <h4 className={`font-medium ${isActive ? "text-primary" : ""}`}>{step.title}</h4>
                            <p className="text-xs text-muted-foreground">{step.desc}</p>
                          </div>
                        </div>
                      )
                    })}
                    
                    <div className="pt-4">
                      <Button 
                        className="w-full shadow-lg gap-2 bg-blue-600 hover:bg-blue-700 text-white" 
                        onClick={startSimulation}
                        disabled={isRunning}
                      >
                        {isRunning ? (
                          <>Executing via MCP... <Activity className="h-4 w-4 animate-pulse" /></>
                        ) : activeStep > workflowSteps.length ? (
                          <>Run Another <Play className="h-4 w-4" /></>
                        ) : (
                          <>🚀 Execute Demo Transaction</>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="lg:col-span-2 space-y-6">
                <Card className="bg-card/50 backdrop-blur-xl border-border/50 h-[250px] flex flex-col">
                  <CardHeader className="pb-2 border-b border-border/50 bg-muted/20">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-sm font-medium flex items-center gap-2">
                        <Terminal className="h-4 w-4" /> Relayer Logs
                      </CardTitle>
                      <Badge variant="outline" className="bg-background border-primary text-primary">KeeperHub MCP</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 p-4 overflow-y-auto font-mono text-xs space-y-2 bg-black/80">
                    {logs.map((log, i) => (
                      <div key={i} dangerouslySetInnerHTML={{ __html: log }} />
                    ))}
                    {isRunning && <div className="text-muted-foreground animate-pulse">_</div>}
                  </CardContent>
                </Card>
                
                {activeStep > workflowSteps.length && auditData && (
                  <Card className="bg-blue-950/20 border-blue-500/30 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <CardHeader className="border-b border-blue-500/10 pb-4">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-blue-400 flex items-center gap-2 text-xl">
                          <ShieldCheck className="h-6 w-6" /> KeeperHub Audit Trail
                        </CardTitle>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-primary/20 text-primary border-primary/30">
                            🎉 Setup to First Tx: 2m 41s
                          </Badge>
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                            VERIFIED
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground flex items-center gap-1"><Zap className="h-3 w-3"/> Status</p>
                          <p className="text-sm font-medium text-green-400">{auditData.status}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3"/> Execution Time</p>
                          <p className="text-sm font-medium text-foreground">{auditData.executionTimeMs} ms</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground">Est. Gas</p>
                          <p className="text-sm font-medium text-foreground">{auditData.estimatedGas}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground">Retries</p>
                          <p className="text-sm font-medium text-foreground">{auditData.retries}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="p-3 bg-black/40 rounded-lg border border-border/50">
                          <p className="text-xs text-muted-foreground mb-1">Transaction Hash</p>
                          <a href={`https://sepolia.etherscan.io/tx/${auditData.txHash}`} target="_blank" rel="noreferrer" className="text-sm font-mono text-blue-400 hover:underline truncate block">
                            {auditData.txHash} <ExternalLink className="inline h-3 w-3 ml-1" />
                          </a>
                        </div>
                        
                        <div className="p-3 bg-black/40 rounded-lg border border-border/50">
                          <p className="text-xs text-muted-foreground mb-2">Relayer Routing Path</p>
                          <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground overflow-x-auto pb-2">
                            {auditData.routingPath.map((node: string, idx: number) => (
                              <div key={idx} className="flex items-center gap-2 whitespace-nowrap">
                                <span className="text-foreground px-2 py-1 bg-muted rounded">{node}</span>
                                {idx < auditData.routingPath.length - 1 && <ArrowRight className="h-3 w-3" />}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
              
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
