"use client"

import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, ShieldCheck, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const mockAudits = [
  {
    id: "tx_0x9f8b7c6d5e",
    agent: "Defi Rebalancer",
    status: "Success",
    time: "2 mins ago",
    gas: "21000",
    execTime: "1.8s",
    hash: "0x334460c5a2c427de7d6db6d795df94602f232414ed8ff9341debf2d2c12a76f6"
  },
  {
    id: "tx_0x1a2b3c4d5e6f7a8b9c",
    agent: "Arbitrage Bot (x402)",
    status: "Success",
    time: "1 hour ago",
    gas: "45000",
    execTime: "2.1s",
    hash: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b"
  },
  {
    id: "tx_0x5f4e3d2c1b0a9f8e7d",
    agent: "NFT Sniper",
    status: "Failed (MEV Protected)",
    time: "3 hours ago",
    gas: "12000",
    execTime: "0.5s",
    hash: "0x5f4e3d2c1b0a9f8e7d6c5b4a3f2e1d0c9b8a7f6e"
  },
  {
    id: "tx_0x2d3e4f5a6b7c8d9e0f",
    agent: "DAO Voter",
    status: "Success",
    time: "1 day ago",
    gas: "32000",
    execTime: "1.2s",
    hash: "0x334460c5a2c427de7d6db6d795df94602f232414ed8ff9341debf2d2c12a76f6"
  }
];

export default function AuditPage() {
  const [audits, setAudits] = useState(mockAudits);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('keeperhub_audits') || '[]');
      if (stored && stored.length > 0) {
        setAudits([...stored, ...mockAudits]);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

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
                  <ShieldCheck className="h-8 w-8 text-primary" /> KeeperHub Audit Logs
                </h1>
                <p className="text-muted-foreground">Historical execution trails for all your AI Agents.</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search hash or agent..." className="pl-10 bg-card/50" />
                </div>
                <Button variant="outline" className="bg-card/50"><Filter className="h-4 w-4 mr-2" /> Filter</Button>
              </div>
            </div>

            <Card className="bg-card/50 backdrop-blur-xl border-border/50">
              <CardHeader>
                <CardTitle>Recent Executions</CardTitle>
                <CardDescription>Immutable records of your agent&apos;s onchain actions verified by KeeperHub MCP.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border border-border/50">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-muted/50 text-muted-foreground">
                      <tr>
                        <th className="px-4 py-3 font-medium">Transaction ID</th>
                        <th className="px-4 py-3 font-medium">Agent</th>
                        <th className="px-4 py-3 font-medium">Status</th>
                        <th className="px-4 py-3 font-medium">Gas Used</th>
                        <th className="px-4 py-3 font-medium">Time</th>
                        <th className="px-4 py-3 font-medium">Block Explorer</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/50">
                      {audits.map((audit, index) => (
                        <tr key={index} className="hover:bg-muted/20 transition-colors">
                          <td className="px-4 py-4 font-mono text-xs">{audit.id}</td>
                          <td className="px-4 py-4 font-medium text-foreground">{audit.agent}</td>
                          <td className="px-4 py-4">
                            <Badge variant="outline" className={
                              audit.status === "Success" 
                                ? "border-green-500/30 text-green-400 bg-green-500/10" 
                                : "border-yellow-500/30 text-yellow-400 bg-yellow-500/10"
                            }>
                              {audit.status}
                            </Badge>
                          </td>
                          <td className="px-4 py-4 font-mono text-muted-foreground">{audit.gas}</td>
                          <td className="px-4 py-4 text-muted-foreground">{audit.time}</td>
                          <td className="px-4 py-4">
                            <a href={`https://sepolia.etherscan.io/tx/${audit.hash}`} target="_blank" rel="noreferrer" className="flex items-center text-blue-400 hover:underline">
                              View <ExternalLink className="ml-1 h-3 w-3" />
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

          </div>
        </main>
      </div>
    </div>
  );
}
