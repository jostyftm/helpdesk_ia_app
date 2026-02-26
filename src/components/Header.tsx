"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Home, Menu, Search, Bell } from "lucide-react";

export function Header({ isCollapsed, setIsCollapsed }: { isCollapsed: boolean, setIsCollapsed: (val: boolean) => void }) {
    const pathname = usePathname();

    // Generate Breadcrumbs
    const pathnames = pathname.split('/').filter(x => x);
    const breadcrumbs = pathnames.map((segment, index) => {
        const href = `/${pathnames.slice(0, index + 1).join('/')}`;
        // capitalize first letter and format
        const label = segment.charAt(0).toUpperCase() + segment.slice(1);
        const isLast = index === pathnames.length - 1;

        return { href, label, isLast };
    });

    return (
        <header className="h-16 shrink-0 bg-white border-b border-slate-200/60 sticky top-0 z-20 px-4 sm:px-6 flex items-center justify-between shadow-sm shadow-slate-200/20">
            <div className="flex items-center gap-4 flex-1">
                {/* Collapse Sidebar Button */}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
                    title={isCollapsed ? "Expandir menú" : "Colapsar menú"}
                >
                    <Menu className="h-5 w-5" />
                </button>

                {/* Vertical Divider */}
                <div className="w-px h-6 bg-slate-200 hidden sm:block"></div>

                {/* Breadcrumbs */}
                <nav className="flex items-center hidden sm:flex" aria-label="Breadcrumb">
                    <ol className="flex items-center gap-2">
                        <li>
                            <Link href="/dashboard" className="text-slate-500 hover:text-indigo-600 transition-colors">
                                <Home className="h-4 w-4" />
                            </Link>
                        </li>
                        {breadcrumbs.length > 0 && breadcrumbs.map((crumb, idx) => (
                            // Skip the first "Dashboard" crumb if it duplicates the home icon logic
                            crumb.label.toLowerCase() !== 'dashboard' && (
                                <li key={idx} className="flex items-center gap-2">
                                    <ChevronRight className="h-4 w-4 text-slate-300" />
                                    {crumb.isLast ? (
                                        <span className="text-sm font-semibold text-slate-800 tracking-wide">{crumb.label}</span>
                                    ) : (
                                        <Link href={crumb.href} className="text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors">
                                            {crumb.label}
                                        </Link>
                                    )}
                                </li>
                            )
                        ))}
                    </ol>
                </nav>
            </div>

            {/* Right side utilities (Search, Notifications, User Profile is in Sidebar now) */}
            <div className="flex items-center gap-2">
                <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors relative">
                    <Search className="h-5 w-5" />
                </button>
                <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white"></span>
                </button>
            </div>
        </header>
    );
}
