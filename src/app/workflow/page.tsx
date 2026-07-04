"use client"

import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Play, Activity, Terminal, ExternalLink, Loader2, ShieldCheck, Clock, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ApiWizard } from "@/components/dashboard/api-wizard";
import { ErrorInspector } from "@/components/dashboard/error-inspector";



interface AuditData {
  txHash: string;
  status: string;
  executionTimeMs: number;
  estimatedGas: string;
  retries: number;
  routingPath: string[];
}

const workflowSteps = [
  { id: 1, title: "Intent Formulated", desc: "Agent prepares transaction intent" },
  { id: 2, title: "KeeperHub API Invoked", desc: "POST /api/workflows/{id}/execute" },
  { id: 3, title: "Workflow Triggered", desc: "KeeperHub initializes execution run" },
  { id: 4, title: "Turnkey MPC Execution", desc: "Secure hardware enclave signs tx" },
  { id: 5, title: "Onchain Confirmation", desc: "Transaction confirmed onchain" },
  { id: 6, title: "Audit Trail Fetched", desc: "Execution logs retrieved from MCP" }
];

export default function WorkflowPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [auditData, setAuditData] = useState<AuditData | null>(null);
  const [keeperhubError, setKeeperhubError] = useState<any>(null);

  const addLog = (msg: string, isError = false, isSuccess = false) => {
    const time = new Date().toLocaleTimeString();
    let colorClass = "text-muted-foreground";
    if (isError) colorClass = "text-red-400";
    if (isSuccess) colorClass = "text-green-400";
    setLogs(prev => [...prev, `<span class="text-blue-400">[${time}]</span> <span class="${colorClass}">${msg}</span>`]);
  };

  const startSimulation = async () => {
    if (isRunning) return;
    
    setIsRunning(true);
    setLogs([]);
    setAuditData(null);
    setKeeperhubError(null);
    setActiveStep(0);
    
    // Get the API key from local storage
    const apiKey = localStorage.getItem("kh_api_key");
    
    addLog("[Agent] Initializing LangChain agent abstraction...");
    await new Promise(r => setTimeout(r, 800));
    addLog("[Agent] Decision: Transfer 0.0001 ETH to treasury via KeeperHub workflow.");
    setActiveStep(1); // Intent Formulated
    await new Promise(r => setTimeout(r, 500));
    
    try {
      addLog("[API] Invoking KeeperHub REST API (/api/keeperhub/execute)...");
      setActiveStep(2); // KeeperHub API Invoked
      
      const executeRes = await fetch("/api/keeperhub/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "execute", to: "0xTreasury", value: "0.0001", apiKey })
      });
      
      const executeData = await executeRes.json();
      
      if (!executeRes.ok || executeData.error) {
        setKeeperhubError(executeData);
        throw new Error(executeData.detail || executeData.error || "Execution failed");
      }
      
      const executionId = executeData.executionId;
      addLog(`[KeeperHub] Workflow triggered successfully. Execution ID: ${executionId}`, false, true);
      setActiveStep(3); // Workflow Triggered
      await new Promise(r => setTimeout(r, 1000));
      
      addLog("[KeeperHub] Delegating signing to Turnkey hardware enclave...");
      setActiveStep(4); // Turnkey MPC Execution
      await new Promise(r => setTimeout(r, 1500));
      
      addLog("[KeeperHub] Transaction broadcast to network. Waiting for confirmation...");
      setActiveStep(5); // Onchain Confirmation
      await new Promise(r => setTimeout(r, 1500));
      
      let auditResult;
      let isComplete = false;
      let attempts = 0;
      
      while (!isComplete && attempts < 10) {
        const auditRes = await fetch("/api/keeperhub/execute", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "audit", executionId, apiKey })
        });
        auditResult = await auditRes.json();
        
        if (!auditRes.ok || auditResult.error) {
          setKeeperhubError(auditResult);
          throw new Error(auditResult.detail || auditResult.error || "Failed to fetch audit trail");
        }
        
        const status = (auditResult.audit.status || "").toLowerCase();
        if (status !== "pending") {
          isComplete = true;
        } else {
          attempts++;
          await new Promise(r => setTimeout(r, 2000));
        }
      }
      
      const hash = auditResult.audit.txHash;
      const finalStatus = (auditResult.audit.status || "").toLowerCase();
      
      if (finalStatus === "failed") {
        addLog(`[KeeperHub] Execution FAILED. Hash: ${hash}`, true, false);
      } else {
        addLog(`[KeeperHub] Transaction CONFIRMED in block! Hash: ${hash}`, false, true);
      }
      
      setAuditData(auditResult.audit);
      setActiveStep(7);
      
      // Save to local storage for the Audit page only if successful
      if (finalStatus !== "failed") {
        try {
          const newTx = {
            id: `tx_${hash.slice(0, 10)}`,
            agent: "LaunchPad Demo Agent",
            status: "Success",
            time: "Just now",
            gas: auditResult.audit.estimatedGas || "21000",
            execTime: `${auditResult.audit.executionTimeMs}ms`,
            hash: hash
          };
          const existing = JSON.parse(localStorage.getItem('keeperhub_audits') || '[]');
          localStorage.setItem('keeperhub_audits', JSON.stringify([newTx, ...existing]));
        } catch (e) {
          console.error("Failed to save audit to local storage", e);
        }
      }
      
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
          <div className="mx-auto max-w-6xl space-y-8 relative z-10">
            
            <div className="flex justify-between items-end mb-8">
              <div>
                <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-2">
                  <Activity className="h-8 w-8 text-primary" /> KeeperHub Execution
                </h1>
                <p className="text-muted-foreground">Monitor your agent&apos;s live execution using the KeeperHub Direct Execution API.</p>
              </div>
            </div>

            <ApiWizard />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
              
              <div className="lg:col-span-4 space-y-4">
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
              
              <div className="lg:col-span-8 space-y-6">
                <div className="bg-card/50 backdrop-blur-xl rounded-xl border border-border/50 p-6 flex flex-col h-[500px]">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                      <Terminal className="h-5 w-5 text-primary" /> Relayer Logs
                    </h2>
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">KeeperHub API</Badge>
                  </div>
                  
                  <div className="flex-1 bg-black/40 rounded-lg p-4 font-mono text-sm overflow-y-auto border border-border/50 space-y-2 relative">
                    {logs.map((log, i) => (
                      <div key={i} dangerouslySetInnerHTML={{ __html: log }} />
                    ))}
                    {!isRunning && logs.length === 0 && (
                      <div className="text-muted-foreground/50 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        Awaiting execution...
                      </div>
                    )}
                  </div>
                </div>
                
                {keeperhubError && <ErrorInspector error={keeperhubError} />}
                
                {activeStep > workflowSteps.length && auditData && (
                  <Card className={`animate-in fade-in slide-in-from-bottom-4 duration-500 border ${auditData.status.toLowerCase() === 'failed' ? 'bg-red-950/20 border-red-500/30' : 'bg-green-950/20 border-green-500/30'}`}>
                    <CardHeader className={`border-b pb-4 ${auditData.status.toLowerCase() === 'failed' ? 'border-red-500/20' : 'border-green-500/20'}`}>
                      <div className="flex items-center justify-between">
                        <CardTitle className={`flex items-center gap-2 text-xl ${auditData.status.toLowerCase() === 'failed' ? 'text-red-400' : 'text-green-400'}`}>
                          {auditData.status.toLowerCase() === 'failed' ? <Activity className="h-6 w-6" /> : <CheckCircle2 className="h-6 w-6" />} 
                          Transaction {auditData.status.toLowerCase() === 'failed' ? 'Failed' : 'Executed'}
                        </CardTitle>
                        <Badge className={`${auditData.status.toLowerCase() === 'failed' ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-green-500/20 text-green-400 border-green-500/30'}`}>
                          {auditData.status.toUpperCase()}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-6">
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground">Hash</p>
                          <p className={`text-sm font-mono truncate pr-4 ${auditData.txHash === 'Pending' ? 'text-muted-foreground' : 'text-blue-400'}`}>{auditData.txHash}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground">Network</p>
                          <p className="text-sm font-medium text-foreground">Sepolia</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground">Gas Used</p>
                          <p className="text-sm font-medium text-foreground">{auditData.estimatedGas || '21000'}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground">Execution Time</p>
                          <p className="text-sm font-medium text-foreground">{auditData.executionTimeMs}ms</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground">Retries</p>
                          <p className="text-sm font-medium text-foreground">{auditData.retries}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground">Status</p>
                          <p className={`text-sm font-medium ${auditData.status.toLowerCase() === 'failed' ? 'text-red-400' : 'text-green-400'}`}>{auditData.status}</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-4 pt-4 border-t border-border/50">
                        <a href={auditData.txHash !== 'Pending' ? `https://sepolia.etherscan.io/tx/${auditData.txHash}` : '#'} target="_blank" rel="noreferrer" className={`flex-1 block ${auditData.txHash === 'Pending' ? 'pointer-events-none opacity-50' : ''}`}>
                          <Button variant="outline" className="w-full gap-2 border-primary/50 text-primary hover:bg-primary/10">
                            View on Etherscan <ExternalLink className="h-4 w-4" />
                          </Button>
                        </a>
                        <Button variant="outline" className="flex-1 gap-2 border-primary/50 text-primary hover:bg-primary/10">
                          View KeeperHub Audit <ShieldCheck className="h-4 w-4" />
                        </Button>
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
