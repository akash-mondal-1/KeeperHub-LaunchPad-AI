import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { EnvironmentChecker } from "@/components/dashboard/environment-checker"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, Shield, Zap, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-8 relative">
          
          <div className="mx-auto max-w-5xl space-y-12 relative z-10">
            
            {/* HERO SECTION */}
            <div className="text-center space-y-6 py-12">
              <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
                First Transaction in <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">3 Minutes</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                The fastest, most reliable way to scaffold, test, and deploy AI Agents onchain using the KeeperHub Execution Layer.
              </p>
              
              <div className="flex justify-center items-center gap-4 text-sm font-medium text-muted-foreground pt-4 overflow-x-auto">
                <div className="flex flex-col items-center gap-2"><div className="h-8 w-8 rounded-full bg-primary/20 text-primary flex items-center justify-center">1</div>Start Here</div>
                <ArrowRight className="h-4 w-4" />
                <div className="flex flex-col items-center gap-2"><div className="h-8 w-8 rounded-full bg-primary/20 text-primary flex items-center justify-center">2</div>Run Doctor</div>
                <ArrowRight className="h-4 w-4" />
                <div className="flex flex-col items-center gap-2"><div className="h-8 w-8 rounded-full bg-primary/20 text-primary flex items-center justify-center">3</div>Connect Wallet</div>
                <ArrowRight className="h-4 w-4" />
                <div className="flex flex-col items-center gap-2"><div className="h-8 w-8 rounded-full bg-primary/20 text-primary flex items-center justify-center">4</div>Generate Agent</div>
                <ArrowRight className="h-4 w-4" />
                <div className="flex flex-col items-center gap-2"><div className="h-8 w-8 rounded-full bg-primary/20 text-primary flex items-center justify-center">5</div>Execute</div>
              </div>

              <div className="pt-8">
                <Link href="/workflow">
                  <Button size="lg" className="text-lg px-8 py-6 shadow-[0_0_30px_rgba(var(--primary),0.4)] hover:shadow-[0_0_50px_rgba(var(--primary),0.6)] transition-all gap-2 bg-blue-600 hover:bg-blue-700 text-white">
                    🚀 Execute Demo Transaction
                  </Button>
                </Link>
              </div>
            </div>

            <EnvironmentChecker />

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="bg-card/50 backdrop-blur-xl border-border/50 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" /> KeeperHub MCP
                  </CardTitle>
                  <CardDescription>Secure context protocol for your agents.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Connect LangChain, OpenClaw, or CrewAI directly to onchain execution with our seamless abstractions.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-xl border-border/50 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-primary" /> x402 Execution
                  </CardTitle>
                  <CardDescription>No more failed transactions.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    KeeperHub routes your transactions via private mempools, handling gas spikes and MEV protection automatically.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-xl border-border/50 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-primary" /> Audit Trail
                  </CardTitle>
                  <CardDescription>Complete observability.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                   Monitor your agent&apos;s decisions in real-time. See the exact path from AI intent to onchain confirmation.
                  </p>
                </CardContent>
              </Card>
            </div>
            
          </div>
        </main>
      </div>
    </div>
  )
}
