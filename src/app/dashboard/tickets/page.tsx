"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Plus, Search, Globe, Mail, MessageSquare, Clock, Bell, Filter, ArrowUpDown, ChevronDown, ChevronUp } from "lucide-react";

export default function TicketListingPage() {
    const [tickets] = useState([
        { id: "#1024", subject: "Error al procesar pago con tarjeta", author: "María García", status: "abierto", priority: "alta", source: "Web", assigned_to: "Carlos López", updated: "2026-02-25T16:30:00" },
        { id: "#1023", subject: "No puedo acceder a mi cuenta", author: "Juan Pérez", status: "pendiente", priority: "alta", source: "Email", assigned_to: "Ana Martínez", updated: "2026-02-25T16:20:00" },
        { id: "#1022", subject: "Solicitud de cambio de plan", author: "Laura Sánchez", status: "abierto", priority: "media", source: "Chat", assigned_to: "Carlos López", updated: "2026-02-25T16:05:00" },
        { id: "#1021", subject: "Problema con facturación mensual", author: "Pedro Rodríguez", status: "resuelto", priority: "media", source: "Email", assigned_to: "Ana Martínez", updated: "2026-02-25T14:35:00" },
        { id: "#1020", subject: "Consulta sobre integración API", author: "Sofía Torres", status: "pendiente", priority: "baja", source: "Web", assigned_to: "Diego Fernández", updated: "2026-02-25T13:35:00" },
        { id: "#1019", subject: "Error 500 en endpoint de reportes", author: "Roberto Díaz", status: "abierto", priority: "alta", source: "Web", assigned_to: "Diego Fernández", updated: "2026-02-25T12:35:00" },
        { id: "#1018", subject: "Solicitud de reembolso", author: "Carmen Ruiz", status: "cerrado", priority: "media", source: "Email", assigned_to: "Carlos López", updated: "2026-02-24T16:35:00" },
        { id: "#1017", subject: "Lentitud en carga de dashboard", author: "Andrés Morales", status: "resuelto", priority: "baja", source: "Chat", assigned_to: "Ana Martínez", updated: "2026-02-24T16:35:00" },
    ]);

    // Format relative time helper explicitly
    const getRelativeTime = (dateString: string) => {
        const ticketDate = new Date(dateString).getTime();
        const now = new Date("2026-02-25T16:35:00").getTime(); // fixed now based on mock times just to simulate "Hace X mins"
        const diffInMinutes = Math.floor((now - ticketDate) / 60000);
        if (diffInMinutes < 60) return `Hace ${diffInMinutes} min`;
        if (diffInMinutes < 1440) return `Hace ${Math.floor(diffInMinutes / 60)} horas`;
        return `Hace ${Math.floor(diffInMinutes / 1440)} dias`;
    };

    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("Todos");
    const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

    // Advanced filters
    const [priorityFilter, setPriorityFilter] = useState("Todas");
    const [assignedFilter, setAssignedFilter] = useState("Todos");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    // Sort config
    const [sortConfig, setSortConfig] = useState<{ key: keyof typeof tickets[0], direction: 'asc' | 'desc' } | null>(null);

    const handleSort = (key: keyof typeof tickets[0]) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const getSourceIcon = (source: string) => {
        switch (source) {
            case "Web": return <Globe className="h-4 w-4 mr-1.5 text-slate-400" />;
            case "Email": return <Mail className="h-4 w-4 mr-1.5 text-slate-400" />;
            case "Chat": return <MessageSquare className="h-4 w-4 mr-1.5 text-slate-400" />;
            default: return null;
        }
    };

    const getStatusStyles = (status: string) => {
        switch (status) {
            case "abierto": return "bg-blue-50 text-blue-600 border-blue-200";
            case "pendiente": return "bg-amber-50 text-amber-600 border-amber-200";
            case "resuelto": return "bg-emerald-50 text-emerald-600 border-emerald-200";
            case "cerrado": return "bg-slate-50 text-slate-600 border-slate-200";
            default: return "bg-slate-50 text-slate-600 border-slate-200";
        }
    };

    const getPriorityStyles = (priority: string) => {
        switch (priority) {
            case "alta": return "bg-rose-50 text-rose-600 border-rose-200";
            case "media": return "bg-amber-50 text-amber-600 border-amber-200";
            case "baja": return "bg-blue-50 text-blue-600 border-blue-200";
            default: return "bg-slate-50 text-slate-600 border-slate-200";
        }
    };

    // Derived data
    const filteredAndSortedTickets = useMemo(() => {
        let sortedData = [...tickets];

        // 1. Filter by global search term
        if (searchTerm) {
            const lowerQuery = searchTerm.toLowerCase();
            sortedData = sortedData.filter(t =>
                t.id.toLowerCase().includes(lowerQuery) ||
                t.subject.toLowerCase().includes(lowerQuery) ||
                t.author.toLowerCase().includes(lowerQuery) ||
                t.assigned_to.toLowerCase().includes(lowerQuery)
            );
        }

        // 2. Filter by status row
        if (statusFilter !== "Todos") {
            sortedData = sortedData.filter(t => t.status === statusFilter.toLowerCase());
        }

        // 3. Filter by priority
        if (priorityFilter !== "Todas") {
            sortedData = sortedData.filter(t => t.priority === priorityFilter.toLowerCase());
        }

        // 4. Filter by assignee
        if (assignedFilter !== "Todos") {
            sortedData = sortedData.filter(t => t.assigned_to === assignedFilter);
        }

        // 5. Filter by dates
        if (startDate) {
            sortedData = sortedData.filter(t => new Date(t.updated) >= new Date(startDate));
        }
        if (endDate) {
            const end = new Date(endDate);
            end.setHours(23, 59, 59, 999);
            sortedData = sortedData.filter(t => new Date(t.updated) <= end);
        }

        // 6. Sorting
        if (sortConfig !== null) {
            sortedData.sort((a, b) => {
                let valA = a[sortConfig.key];
                let valB = b[sortConfig.key];

                if (sortConfig.key === 'updated') {
                    valA = new Date(a.updated).getTime() as any;
                    valB = new Date(b.updated).getTime() as any;
                }

                if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
                if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }

        return sortedData;
    }, [tickets, searchTerm, statusFilter, priorityFilter, assignedFilter, startDate, endDate, sortConfig]);

    const uniqueAssignees = Array.from(new Set(tickets.map(t => t.assigned_to)));

    return (
        <div className="w-full px-4 sm:px-6 md:px-8 py-8 h-full flex flex-col space-y-6">

            {/* Top Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/60 backdrop-blur-md pb-4 border-b border-slate-200/60 z-10 w-full mb-2">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">
                        Tickets
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                        {filteredAndSortedTickets.length} tickets encontrados
                    </p>
                </div>
                <div className="flex items-center gap-6">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 text-slate-400" />
                        </div>
                        <input
                            type="text"
                            className="block w-64 pl-10 sm:text-sm border-slate-200 rounded-xl py-2 px-3 bg-slate-50/50 focus:ring-indigo-500 focus:border-indigo-500 border transition-colors shadow-sm cursor-text"
                            placeholder="Buscar tickets, chats..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Filters Row */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-0 gap-4">
                <div className="flex flex-wrap items-center gap-2 bg-slate-100/50 p-1 rounded-xl sm:rounded-full w-full sm:w-auto">
                    {["Todos", "Abierto", "Pendiente", "Resuelto", "Cerrado"].map((status) => (
                        <button
                            key={status}
                            onClick={() => setStatusFilter(status)}
                            className={`px-3 sm:px-5 py-1.5 rounded-lg sm:rounded-full text-xs sm:text-sm font-medium transition-colors flex-1 sm:flex-none text-center ${statusFilter === status
                                ? "bg-indigo-600 text-white shadow-sm"
                                : "text-slate-600 hover:bg-slate-200/50"
                                }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <button
                        onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                        className={`flex-1 sm:flex-none flex justify-center items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border transition-colors ${showAdvancedFilters
                            ? "bg-indigo-50 text-indigo-700 border-indigo-200"
                            : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                            }`}
                    >
                        <Filter className="h-4 w-4" />
                        <span className="hidden sm:inline">Filtros</span>
                        {showAdvancedFilters ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </button>
                    <Link
                        href="/dashboard/tickets/new"
                        className="flex-1 sm:flex-none inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-indigo-700 transition-colors whitespace-nowrap"
                    >
                        <Plus className="h-4 w-4 sm:mr-2" />
                        <span className="hidden sm:inline">Nuevo Ticket</span>
                    </Link>
                </div>
            </div>

            {/* Advanced Filters Panel */}
            {showAdvancedFilters && (
                <div className="bg-white border border-slate-200/60 rounded-xl p-4 shadow-sm animate-in fade-in slide-in-from-top-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Prioridad</label>
                            <select
                                value={priorityFilter}
                                onChange={(e) => setPriorityFilter(e.target.value)}
                                className="w-full text-sm border-slate-200 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 py-2 bg-slate-50/50"
                            >
                                <option value="Todas">Todas</option>
                                <option value="Alta">Alta</option>
                                <option value="Media">Media</option>
                                <option value="Baja">Baja</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Asignado a</label>
                            <select
                                value={assignedFilter}
                                onChange={(e) => setAssignedFilter(e.target.value)}
                                className="w-full text-sm border-slate-200 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 py-2 bg-slate-50/50"
                            >
                                <option value="Todos">Todos</option>
                                {uniqueAssignees.map(a => (
                                    <option key={a} value={a}>{a}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Fecha Inicio</label>
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="w-full text-sm border-slate-200 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 py-2 bg-slate-50/50 text-slate-700"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Fecha Fin</label>
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="w-full text-sm border-slate-200 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 py-2 bg-slate-50/50 text-slate-700"
                            />
                        </div>
                    </div>
                    {/* Clear filters button if any active */}
                    {(priorityFilter !== "Todas" || assignedFilter !== "Todos" || startDate || endDate) && (
                        <div className="mt-4 flex justify-end">
                            <button
                                onClick={() => {
                                    setPriorityFilter("Todas");
                                    setAssignedFilter("Todos");
                                    setStartDate("");
                                    setEndDate("");
                                }}
                                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
                            >
                                Limpiar Filtros Avanzados
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* Table Section */}
            <div className="flex-1 bg-white border border-slate-200/60 rounded-xl overflow-hidden shadow-sm flex flex-col">
                <div className="overflow-x-auto min-h-[400px] flex-1">
                    <table className="min-w-full divide-y divide-slate-100">
                        <thead className="bg-slate-50/50">
                            <tr>
                                {[
                                    { id: "id", label: "ID" },
                                    { id: "subject", label: "Asunto" },
                                    { id: "status", label: "Estado" },
                                    { id: "priority", label: "Prioridad" },
                                    { id: "source", label: "Fuente" },
                                    { id: "assigned_to", label: "Asignado" },
                                    { id: "updated", label: "Actualización" }
                                ].map((col) => (
                                    <th
                                        key={col.id}
                                        onClick={() => handleSort(col.id as any)}
                                        className="px-6 py-4 text-left text-xs font-semibold text-slate-500 border-b border-slate-200/60 cursor-pointer hover:bg-slate-100/50 transition-colors group select-none"
                                    >
                                        <div className="flex items-center gap-1.5">
                                            {col.label}
                                            <ArrowUpDown className={`h-3 w-3 transition-opacity ${sortConfig?.key === col.id ? 'opacity-100 text-indigo-500' : 'opacity-0 group-hover:opacity-100 text-slate-400'}`} />
                                            {/* author implies sorting by requester as well, so subject actually sorts by subject. Author is second line of subject row. */}
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-slate-100">
                            {filteredAndSortedTickets.length > 0 ? (
                                filteredAndSortedTickets.map((ticket, index) => (
                                    <tr key={index} className="hover:bg-slate-50/50 transition-colors group cursor-pointer">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 font-medium border-l-2 border-transparent group-hover:border-indigo-500 transition-all">
                                            {ticket.id}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <Link href={`/dashboard/tickets/${ticket.id.replace('#', '')}`} className="text-sm font-semibold text-slate-800 hover:text-indigo-600 hover:underline transition-colors w-max">
                                                    {ticket.subject}
                                                </Link>
                                                <span className="text-xs text-slate-500 mt-0.5">
                                                    {ticket.author}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap border-0">
                                            <span className={`px-4 py-1 inline-flex text-xs font-semibold rounded-full border ${getStatusStyles(ticket.status)}`}>
                                                {ticket.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap border-0">
                                            <span className={`px-4 py-1 inline-flex text-xs font-semibold rounded-full border ${getPriorityStyles(ticket.priority)}`}>
                                                {ticket.priority}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                                            <div className="flex items-center">
                                                {getSourceIcon(ticket.source)}
                                                {ticket.source}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700 font-medium">
                                            {ticket.assigned_to}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                                            <div className="flex items-center">
                                                <Clock className="h-4 w-4 mr-1.5 text-slate-400" />
                                                {getRelativeTime(ticket.updated)}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="px-6 py-12 text-center text-slate-500">
                                        <div className="flex flex-col items-center justify-center">
                                            <Search className="h-8 w-8 text-slate-300 mb-2" />
                                            <p className="text-sm font-medium">No se encontraron tickets con estos filtros.</p>
                                            <p className="text-xs mt-1 text-slate-400">Prueba cambiando tu búsqueda o limpiando los filtros avanzados.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
