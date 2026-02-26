"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Users, FileText, Settings, HelpCircle, LogOut,
    LayoutDashboard, MessageSquareText, Shield, User, Key,
    HeadphonesIcon, MoreVertical
} from "lucide-react";
import { useModals } from "./ModalsProvider";

const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Tickets", href: "/dashboard/tickets", icon: HelpCircle },
    { name: "Chat en Vivo", href: "/dashboard/chat", icon: MessageSquareText },
    { name: "Usuarios", href: "/dashboard/users", icon: Users },
    { name: "Roles y Permisos", href: "/dashboard/roles", icon: Shield },
    { name: "Reportes", href: "/dashboard/reports", icon: FileText },
    { name: "Configuración", href: "/dashboard/settings", icon: Settings },
];

export function Sidebar({ isCollapsed }: { isCollapsed: boolean }) {
    const pathname = usePathname();
    const { openChangePasswordModal, openUpdateProfileModal, openLogoutModal } = useModals();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className={`flex h-full flex-col bg-[#1a1a27] border-r border-slate-800 transition-all duration-300 z-30 ${isCollapsed ? 'w-[72px]' : 'w-64'}`}>
            <div className={`flex h-16 shrink-0 items-center border-b border-slate-800/60 ${isCollapsed ? 'justify-center px-0' : 'px-6'}`}>
                <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center' : ''}`}>
                    <div className="p-2 bg-indigo-600 rounded-lg shrink-0 shadow-lg shadow-indigo-500/30">
                        <HeadphonesIcon className="h-5 w-5 text-white" />
                    </div>
                    {!isCollapsed && (
                        <h1 className="text-xl font-bold text-white truncate tracking-wide">
                            HelpDesk
                        </h1>
                    )}
                </div>
            </div>

            <div className="flex flex-1 flex-col overflow-y-auto custom-scrollbar overflow-x-hidden pt-4 pb-4">
                <nav className="flex-1 space-y-1.5 px-3">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname?.startsWith(item.href));
                        return (
                            <div key={item.name} className="relative group flex">
                                <Link
                                    href={item.href}
                                    className={`flex items-center py-3 text-sm font-medium rounded-xl transition-all duration-200 w-full ${isActive
                                        ? "bg-[#28293d] text-white shadow-sm"
                                        : "text-slate-400 hover:bg-[#28293d]/50 hover:text-slate-200"
                                        } ${isCollapsed ? 'justify-center px-0' : 'px-4'}`}
                                >
                                    <item.icon
                                        className={`h-5 w-5 flex-shrink-0 transition-colors ${isActive ? "text-indigo-400" : "text-slate-400 group-hover:text-slate-300"
                                            } ${!isCollapsed ? 'mr-3' : ''}`}
                                        aria-hidden="true"
                                    />
                                    {!isCollapsed && <span className="truncate">{item.name}</span>}
                                </Link>

                                {/* Tooltip for collapsed state */}
                                {isCollapsed && (
                                    <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-2 bg-slate-800 text-white text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity shadow-xl">
                                        {item.name}
                                        <div className="absolute top-1/2 -left-1 -translate-y-1/2 border-y-4 border-y-transparent border-r-4 border-r-slate-800"></div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </nav>

                <div className="border-t border-slate-800/60 p-3 mt-4" ref={dropdownRef}>
                    <div className="relative">
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className={`w-full flex items-center py-2 rounded-xl text-slate-400 hover:bg-[#28293d] transition-all duration-200 ${isCollapsed ? 'justify-center px-0' : 'px-3 justify-between'}`}
                        >
                            <div className="flex items-center">
                                <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-xs shrink-0">
                                    AU
                                </div>
                                {!isCollapsed && (
                                    <div className="ml-3 text-left">
                                        <p className="text-sm font-medium text-slate-200 max-w-[120px] truncate">Admin Usuario</p>
                                        <p className="text-xs text-slate-500 max-w-[120px] truncate">admin@helpdesk.com</p>
                                    </div>
                                )}
                            </div>
                            {!isCollapsed && <MoreVertical className="h-4 w-4 text-slate-500" />}
                        </button>

                        {/* Dropdown Menu */}
                        {isDropdownOpen && (
                            <div className={`absolute bottom-full mb-2 ${isCollapsed ? 'left-full ml-3' : 'left-0 w-full'} bg-slate-800 rounded-xl shadow-xl border border-slate-700 py-1 z-50 overflow-hidden min-w-[200px]`}>
                                <button
                                    onClick={() => { setIsDropdownOpen(false); openUpdateProfileModal(); }}
                                    className="w-full flex items-center px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                                >
                                    <User className="h-4 w-4 mr-3" />
                                    Actualizar Perfil
                                </button>
                                <button
                                    onClick={() => { setIsDropdownOpen(false); openChangePasswordModal(); }}
                                    className="w-full flex items-center px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                                >
                                    <Key className="h-4 w-4 mr-3" />
                                    Cambiar Contraseña
                                </button>
                                <div className="h-px bg-slate-700 my-1"></div>
                                <button
                                    onClick={() => { setIsDropdownOpen(false); openLogoutModal(); }}
                                    className="w-full flex items-center px-4 py-2.5 text-sm text-rose-400 hover:bg-rose-500/10 transition-colors"
                                >
                                    <LogOut className="h-4 w-4 mr-3" />
                                    Cerrar Sesión
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
