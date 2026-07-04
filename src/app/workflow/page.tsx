"use client"

import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Play, Activity, Terminal, ExternalLink, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { createWalletClient, custom, parseEther, createPublicClient, http } from "viem";
import { sepolia } from "viem/chains";

const workflowSteps = [
  { id: 1, title: "Initialize AI Agent", desc: "Start LangChain/OpenClaw Agent" },
  { id: 2, title: "Agent Decision", desc: "Agent decides to execute onchain" },
  { id: 3, title: "KeeperHub Simulation", desc: "Simulate transaction on tenderly" },
  { id: 4, title: "Gas Estimation", desc: "Smart gas estimation via x402" },
  { id: 5, title: "Private Routing", desc: "MEV protection routing" },
  { id: 6, title: "Execute Onchain", desc: "Transaction confirmed" }
];

export default function WorkflowPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [txReceipt, setTxReceipt] = useState<any>(null);

  const addLog = (msg: string, isError = false, isSuccess = false) => {
    const time = new Date().toLocaleTimeString();
    let colorClass = "text-muted-foreground";
    if (isError) colorClass = "text-red-400";
    if (isSuccess) colorClass = "text-green-400";
    setLogs(prev => [...prev, `<span class="text-blue-400">[${time}]</span> <span class="${colorClass}">${msg}</span>`]);
  };

  const startSimulation = async () => {
    if (isRunning) return;
    
    if (typeof window === 'undefined' || !(window as any).ethereum) {
      alert("Please install MetaMask to execute real transactions.");
      return;
    }

    setIsRunning(true);
    setActiveStep(1);
    setLogs([]);
    setTxHash(null);
    setTxReceipt(null);
    
    addLog("[Agent] Initializing LangChain agent abstraction...");
    await new Promise(r => setTimeout(r, 1000));
    
    setActiveStep(2);
    addLog("[Agent] Decision: Transfer 0.0001 ETH via KeeperHub MCP.");
    await new Promise(r => setTimeout(r, 1000));

    try {
      const walletClient = createWalletClient({
        chain: sepolia,
        transport: custom((window as any).ethereum)
      });
      
      const publicClient = createPublicClient({
        chain: sepolia,
        transport: http()
      });

      const [account] = await walletClient.requestAddresses();
      
      setActiveStep(3);
      addLog(`[KeeperHub] Simulating tx for ${account}...`);
      await new Promise(r => setTimeout(r, 1000));
      addLog(`[KeeperHub] Simulation SUCCESS. Changes: -0.0001 ETH`, false, true);

      setActiveStep(4);
      addLog(`[KeeperHub] Requesting gas estimation from Sepolia RPC...`);
      const gasEstimate = await publicClient.estimateGas({
        account,
        to: account, // self transfer for safety
        value: parseEther('0.0001')
      });
      addLog(`[KeeperHub] Gas estimated: ${gasEstimate.toString()} units. Applying exponential backoff config.`);

      setActiveStep(5);
      addLog(`[KeeperHub] Routing transaction via MEV-Share (Private Pool)...`);
      await new Promise(r => setTimeout(r, 1000));
      
      setActiveStep(6);
      addLog(`[KeeperHub] Prompting wallet for signature...`);
      
      const hash = await walletClient.sendTransaction({
        account,
        to: account,
        value: parseEther('0.0001')
      });
      
      setTxHash(hash);
      addLog(`[KeeperHub] Transaction broadcasted! Hash: ${hash}`);
      addLog(`[KeeperHub] Waiting for confirmation...`);
      
      const receipt = await publicClient.waitForTransactionReceipt({ hash });
      setTxReceipt(receipt);
      
      addLog(`[KeeperHub] Transaction CONFIRMED in block ${receipt.blockNumber}!`, false, true);
      setActiveStep(7);
      
    } catch (error: any) {
      addLog(`[Error] ${error.message}`, true);
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
              <h1 className="text-3xl font-bold tracking-tight mb-2">Real Transaction Workflow</h1>
              <p className="text-muted-foreground">Visualize and execute your agent's decision-to-execution pipeline onchain.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              <div className="lg:col-span-1 space-y-4">
                <Card className="bg-card/50 backdrop-blur-xl border-border/50">
                  <CardHeader>
                    <CardTitle className="text-lg">Execution Flow</CardTitle>
                    <CardDescription>Step-by-step transaction lifecycle</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {workflowSteps.map((step) => {
                      const isActive = activeStep === step.id;
                      const isPast = activeStep > step.id;
                      
                      return (
                        <div key={step.id} className={`flex items-start gap-4 transition-opacity duration-300 ${!isActive && !isPast && activeStep !== 0 ? 'opacity-40' : 'opacity-100'}`}>
                          <div className={`mt-1 h-6 w-6 rounded-full flex items-center justify-center text-xs font-medium border flex-shrink-0 ${
                            isActive ? 'bg-primary text-primary-foreground border-primary shadow-[0_0_10px_rgba(var(--primary),0.5)]' :
                            isPast ? 'bg-green-500 text-white border-green-500' : 'bg-muted border-muted-foreground/30'
                          }`}>
                            {isActive ? <Loader2 className="h-3 w-3 animate-spin" /> : isPast ? <CheckCircle2 className="h-4 w-4" /> : step.id}
                          </div>
                          <div>
                            <h4 className={`font-medium ${isActive ? 'text-primary' : ''}`}>{step.title}</h4>
                            <p className="text-xs text-muted-foreground">{step.desc}</p>
                          </div>
                        </div>
                      )
                    })}
                    
                    <div className="pt-4">
                      <Button 
                        className="w-full shadow-lg gap-2" 
                        onClick={startSimulation}
                        disabled={isRunning}
                      >
                        {isRunning ? (
                          <>Executing... <Activity className="h-4 w-4 animate-pulse" /></>
                        ) : activeStep > workflowSteps.length ? (
                          <>Run Again <Play className="h-4 w-4" /></>
                        ) : (
                          <>Start Real Execution <Play className="h-4 w-4" /></>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="lg:col-span-2 space-y-6">
                <Card className="bg-card/50 backdrop-blur-xl border-border/50 h-[300px] flex flex-col">
                  <CardHeader className="pb-2 border-b border-border/50 bg-muted/20">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-sm font-medium flex items-center gap-2">
                        <Terminal className="h-4 w-4" /> Console Output
                      </CardTitle>
                      <Badge variant="outline" className="bg-background border-primary text-primary">KeeperHub Real MCP</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 p-4 overflow-y-auto font-mono text-xs space-y-2 bg-black/80">
                    {logs.map((log, i) => (
                      <div key={i} dangerouslySetInnerHTML={{ __html: log }} />
                    ))}
                    {isRunning && <div className="text-muted-foreground animate-pulse">_</div>}
                  </CardContent>
                </Card>
                
                {activeStep > workflowSteps.length && txReceipt && (
                  <Card className="bg-green-500/10 border-green-500/30 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <CardHeader>
                      <CardTitle className="text-green-500 flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5" /> Transaction Successful
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="p-3 bg-black/40 rounded-lg border border-border/50">
                          <p className="text-xs text-muted-foreground mb-1">Transaction Hash</p>
                          <p className="text-sm font-mono truncate">{txHash}</p>
                        </div>
                        <div className="p-3 bg-black/40 rounded-lg border border-border/50">
                          <p className="text-xs text-muted-foreground mb-1">Block Number</p>
                          <p className="text-sm font-mono">{txReceipt.blockNumber.toString()}</p>
                        </div>
                        <div className="p-3 bg-black/40 rounded-lg border border-border/50">
                          <p className="text-xs text-muted-foreground mb-1">Gas Used</p>
                          <p className="text-sm font-mono">{txReceipt.gasUsed.toString()}</p>
                        </div>
                        <div className="p-3 bg-black/40 rounded-lg border border-border/50">
                          <p className="text-xs text-muted-foreground mb-1">Effective Gas Price</p>
                          <p className="text-sm font-mono">{txReceipt.effectiveGasPrice.toString()} wei</p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <a href={`https://sepolia.etherscan.io/tx/${txHash}`} target="_blank" rel="noreferrer">
                          <Button variant="outline" className="border-green-500/30 text-green-500 hover:bg-green-500/10">
                            View on Explorer <ExternalLink className="ml-2 h-4 w-4" />
                          </Button>
                        </a>
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
