"use client";

import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { ModalsProvider } from "./ModalsProvider";
import { SessionGuard } from "./SessionGuard";

export function DashboardShell({ children }: { children: React.ReactNode }) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    // Provide the modals context to the whole dashboard tree so Sidebar can trigger them
    return (
        <SessionGuard>
            <ModalsProvider>
                <div className="flex h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900 overflow-hidden">
                    {/* Overlay for mobile when sidebar is open */}
                    {!isCollapsed && (
                        <div
                            className="fixed inset-0 bg-slate-900/50 z-20 md:hidden"
                            onClick={() => setIsCollapsed(true)}
                        />
                    )}
                    <div className={`fixed inset-y-0 left-0 z-30 transition-transform duration-300 md:relative md:translate-x-0 ${isCollapsed ? "-translate-x-full" : "translate-x-0"} md:block`}>
                        <Sidebar isCollapsed={isCollapsed} />
                    </div>
                    <div className="flex flex-1 flex-col w-full md:w-0 overflow-hidden relative min-h-screen">
                        <Header isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
                        <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none w-full">
                            {children}
                        </main>
                    </div>
                </div>
            </ModalsProvider>
        </SessionGuard>
    );
}
