import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { EnvironmentChecker } from "@/components/dashboard/environment-checker";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function DoctorPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-8 relative">
          <div className="mx-auto max-w-5xl space-y-8 relative z-10">
            <div className="flex items-center gap-4 mb-8">
              <Link href="/">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">System Doctor</h1>
                <p className="text-muted-foreground">Verify your environment is ready for onchain execution.</p>
              </div>
            </div>

            <EnvironmentChecker />

          </div>
        </main>
      </div>
    </div>
  );
}
