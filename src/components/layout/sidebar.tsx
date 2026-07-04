import Link from "next/link";
import { Compass, FileText, CheckCircle, LayoutTemplate, Activity, Bug } from "lucide-react";

const navigation = [
  { name: 'Dashboard', href: '/', icon: Compass },
  { name: 'Templates', href: '/templates', icon: LayoutTemplate },
  { name: 'Workflow', href: '/workflow', icon: Activity },
  { name: 'Debugger', href: '/debugger', icon: Bug },
  { name: 'Audit Trail', href: '/audit', icon: Activity },
  { name: 'Docs', href: '/docs', icon: FileText },
];

export function Sidebar() {
  return (
    <div className="flex h-full w-64 flex-col border-r bg-card/50 backdrop-blur-xl">
      <div className="flex h-16 shrink-0 items-center border-b px-6">
        <Compass className="h-6 w-6 text-primary mr-2" />
        <span className="text-lg font-bold tracking-tight">LaunchPad<span className="text-primary">AI</span></span>
      </div>
      <div className="flex flex-1 flex-col overflow-y-auto px-4 py-6">
        <nav className="flex-1 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className="group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-primary/10 hover:text-primary transition-colors text-muted-foreground"
              >
                <Icon className="mr-3 h-5 w-5 flex-shrink-0" aria-hidden="true" />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </div>
      <div className="p-4 border-t">
        <div className="rounded-lg bg-primary/10 p-4 border border-primary/20">
          <div className="flex items-center text-sm font-semibold text-primary mb-2">
            <CheckCircle className="mr-2 h-4 w-4" /> Environment
          </div>
          <p className="text-xs text-muted-foreground">KeeperHub MCP Ready</p>
        </div>
      </div>
    </div>
  );
}
