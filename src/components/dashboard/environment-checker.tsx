"use client"

import { useState } from "react"
import { CheckCircle2, XCircle, Loader2, Server, Terminal, Wallet, Shield } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function EnvironmentChecker() {
  const [activeStep, setActiveStep] = useState(-1)
  const [statuses, setStatuses] = useState<Record<string, "pending" | "running" | "success" | "error">>({})
  const [messages, setMessages] = useState<Record<string, string>>({})
  const [isChecking, setIsChecking] = useState(false)

  const steps = [
    { id: "node", label: "Node.js Environment", icon: Server, requirement: "v18.0.0+" },
    { id: "npm", label: "NPM Package Manager", icon: Server, requirement: "Installed" },
    { id: "wallet", label: "Web3 Wallet", icon: Wallet, requirement: "Connected" },
    { id: "cli", label: "KeeperHub CLI", icon: Terminal, requirement: "Installed" },
    { id: "mcp", label: "KeeperHub MCP", icon: Shield, requirement: "Running" },
  ]

  const runCheck = async () => {
    setIsChecking(true)
    setStatuses({})
    setMessages({})
    
    // Check Node/NPM/CLI/MCP via API
    setStatuses({ node: "running", npm: "running", cli: "running", mcp: "running", wallet: "running" })
    
    try {
      const res = await fetch('/api/doctor')
      const data = await res.json()
      
      // Node Check
      setActiveStep(0)
      await new Promise(r => setTimeout(r, 600))
      setStatuses(prev => ({ ...prev, node: data.node?.success ? "success" : "error" }))
      setMessages(prev => ({ ...prev, node: data.node?.version || "Not Found" }))

      // NPM Check
      setActiveStep(1)
      await new Promise(r => setTimeout(r, 600))
      setStatuses(prev => ({ ...prev, npm: data.npm?.success ? "success" : "error" }))
      setMessages(prev => ({ ...prev, npm: data.npm?.version || "Not Found" }))

      // Wallet Check
      setActiveStep(2)
      await new Promise(r => setTimeout(r, 600))
      const hasWallet = typeof window !== 'undefined' && (window as any).ethereum !== undefined;
      setStatuses(prev => ({ ...prev, wallet: hasWallet ? "success" : "error" }))
      setMessages(prev => ({ ...prev, wallet: hasWallet ? "Detected" : "MetaMask Not Installed" }))

      // CLI Check
      setActiveStep(3)
      await new Promise(r => setTimeout(r, 600))
      setStatuses(prev => ({ ...prev, cli: data.cli?.installed ? "success" : "error" }))
      setMessages(prev => ({ ...prev, cli: data.cli?.version || "Not Installed" }))

      // MCP Check
      setActiveStep(4)
      await new Promise(r => setTimeout(r, 600))
      setStatuses(prev => ({ ...prev, mcp: data.mcp?.reachable ? "success" : "error" }))
      setMessages(prev => ({ ...prev, mcp: data.mcp?.status || "Unreachable" }))

    } catch (err) {
      console.error(err)
      setStatuses({ node: "error", npm: "error", cli: "error", mcp: "error", wallet: "error" })
    }
    
    setActiveStep(steps.length)
    setIsChecking(false)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto bg-card/50 backdrop-blur-xl border-primary/20">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          <Terminal className="h-6 w-6 text-primary" />
          Environment Checker
        </CardTitle>
        <CardDescription>
          Diagnose and validate your real local setup before executing onchain.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          {steps.map((step, index) => {
            const status = statuses[step.id] || "pending"
            const msg = messages[step.id]
            const Icon = step.icon
            
            return (
              <div 
                key={step.id} 
                className={`flex items-center justify-between p-4 rounded-lg border transition-all duration-300 ${
                  status === "running" ? "border-primary bg-primary/5" : 
                  status === "success" ? "border-green-500/30 bg-green-500/5" : 
                  status === "error" ? "border-red-500/30 bg-red-500/5" :
                  "border-border/50 bg-background/50"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-full ${
                    status === "running" ? "bg-primary/20 text-primary" :
                    status === "success" ? "bg-green-500/20 text-green-500" :
                    status === "error" ? "bg-red-500/20 text-red-500" :
                    "bg-muted text-muted-foreground"
                  }`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium">{step.label}</h4>
                    <p className="text-xs text-muted-foreground">Required: {step.requirement}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  {msg && <span className="text-xs font-mono bg-black/40 px-2 py-1 rounded border border-border/50 text-muted-foreground">{msg}</span>}
                  {status === "pending" && <div className="h-2 w-2 rounded-full bg-muted-foreground/30" />}
                  {status === "running" && <Loader2 className="h-5 w-5 animate-spin text-primary" />}
                  {status === "success" && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                  {status === "error" && <XCircle className="h-5 w-5 text-destructive" />}
                </div>
              </div>
            )
          })}
        </div>
        
        <div className="pt-4 flex justify-end">
          <Button 
            onClick={runCheck} 
            disabled={isChecking}
            className="w-full sm:w-auto shadow-[0_0_15px_rgba(var(--primary),0.2)]"
          >
            {isChecking ? "Running Diagnostics..." : "Run Diagnostics"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
