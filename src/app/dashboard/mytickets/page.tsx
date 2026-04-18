"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Search, Globe, Mail, MessageSquare, Clock, Filter, ArrowUpDown, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, CheckCircle, Smartphone } from "lucide-react";
import { useTickets } from "./hooks/useTickets";
import { useTicketAttributes } from "./hooks/useTicketAttributes";
import { DateRangePicker } from "./components/DateRangePicker";

export default function TicketListingPage() {
    const {
        ticketsResponse, isLoading, error, page, setPage,
        sort, handleSort, filters, handleFilterChange, setFilters
    } = useTickets();

    const {
        categories, priorities, states, sources, agents, isLoading: isLoadingAttributes
    } = useTicketAttributes();

    const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

    // Format relative time helper
    const getRelativeTime = (dateString: string) => {
        const ticketDate = new Date(dateString).getTime();
        const now = new Date().getTime();
        const diffInMinutes = Math.floor((now - ticketDate) / 60000);
        if (diffInMinutes < 1) return `Justo ahora`;
        if (diffInMinutes < 60) return `Hace ${diffInMinutes} min`;
        if (diffInMinutes < 1440) return `Hace ${Math.floor(diffInMinutes / 60)} horas`;
        return `Hace ${Math.floor(diffInMinutes / 1440)} dias`;
    };

    const getSourceIcon = (sourceName?: string) => {
        if (!sourceName) return <Globe className="h-4 w-4 mr-1.5 text-slate-400" />;
        const s = sourceName.toLowerCase();
        if (s.includes('web')) return <Globe className="h-4 w-4 mr-1.5 text-slate-400" />;
        if (s.includes('email') || s.includes('correo')) return <Mail className="h-4 w-4 mr-1.5 text-slate-400" />;
        if (s.includes('chat') || s.includes('whatsapp')) return <MessageSquare className="h-4 w-4 mr-1.5 text-slate-400" />;
        if (s.includes('phone') || s.includes('telefono')) return <Smartphone className="h-4 w-4 mr-1.5 text-slate-400" />;
        return <Globe className="h-4 w-4 mr-1.5 text-slate-400" />;
    };

    const hasAdvancedFiltersActive = Boolean(
        filters?.ticket_category_id ||
        filters?.ticket_priority_id ||
        filters?.ticket_source_id ||
        filters?.start_after
    );

    // Utility component for dynamic badging colors
    const ColorBadge = ({ text, color, bgColor }: { text: string; color?: string; bgColor?: string }) => {
        // Fallback robust tailwind colors when direct hex isn't mapped properly or handled in style tags
        const styles = (color && bgColor)
            ? { color, backgroundColor: bgColor, borderColor: color + '40' }
            : {};

        return (
            <span
                className="px-3 py-1 inline-flex text-xs font-semibold rounded-full border shadow-sm items-center"
                style={styles}
            >
                {text}
            </span>
        );
    }

    return (
        <div className="w-full px-4 sm:px-6 md:px-8 py-8 h-full flex flex-col space-y-6">

            {/* Top Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/60 backdrop-blur-md pb-4 border-b border-slate-200/60 z-10 w-full mb-2">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">
                        Casos y Tickets
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                        {ticketsResponse?.meta?.total || 0} tickets registrados
                    </p>
                </div>
                <div className="flex items-center gap-6">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 text-slate-400" />
                        </div>
                        <input
                            type="text"
                            className="block w-64 pl-10 sm:text-sm border-slate-200 rounded-xl py-2.5 px-3 bg-white focus:ring-indigo-500 focus:border-indigo-500 border transition-colors shadow-sm outline-none"
                            placeholder="Buscar caso web por asunto..."
                            value={filters?.subject || ''}
                            onChange={(e) => handleFilterChange('subject', e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Filters Row */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-0 gap-4">
                <div className="flex flex-wrap items-center gap-2 bg-slate-100/50 p-1.5 w-full sm:w-auto overflow-x-auto custom-scrollbar">
                    <button
                        onClick={() => handleFilterChange('state_id', '')}
                        className={`px-4 py-2 rounded-lg sm:rounded-full text-xs sm:text-sm font-medium transition-colors flex-1 sm:flex-none text-center whitespace-nowrap ${!filters?.state_id
                            ? "bg-indigo-600 text-white shadow-sm"
                            : "text-slate-600 hover:bg-slate-200/50"
                            }`}
                    >
                        Todos
                    </button>
                    {states.map((status) => (
                        <button
                            key={status.id}
                            onClick={() => handleFilterChange('state_id', status.id.toString())}
                            className={`px-4 py-2 rounded-lg sm:rounded-full text-xs sm:text-sm font-medium transition-colors flex-1 sm:flex-none text-center whitespace-nowrap ${filters?.state_id === status.id.toString()
                                ? "bg-indigo-600 text-white shadow-sm"
                                : "text-slate-600 hover:bg-slate-200/50"
                                }`}
                        >
                            {status.attributes.display_name}
                        </button>
                    ))}
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto shrink-0">
                    <button
                        onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                        className={`flex-1 sm:flex-none flex justify-center items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl border transition-colors relative ${showAdvancedFilters || hasAdvancedFiltersActive
                            ? "bg-indigo-50 text-indigo-700 border-indigo-200"
                            : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                            }`}
                    >
                        <Filter className="h-4 w-4" />
                        <span className="hidden sm:inline">Avanzados</span>
                        {hasAdvancedFiltersActive && <span className="absolute -top-1 -right-1 flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span></span>}
                        {showAdvancedFilters ? <ChevronUp className="h-4 w-4 opacity-70" /> : <ChevronDown className="h-4 w-4 opacity-70" />}
                    </button>
                    <Link
                        href="/dashboard/tickets/new"
                        className="flex-1 sm:flex-none inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-indigo-700 transition-colors whitespace-nowrap"
                    >
                        <Plus className="h-4 w-4 sm:mr-2" />
                        <span className="hidden sm:inline">Nuevo Ticket</span>
                    </Link>
                </div>
            </div>

            {/* Advanced Filters Panel */}
            {showAdvancedFilters && (
                <div className="bg-white border border-slate-200/60 rounded-2xl p-5 shadow-sm animate-in fade-in slide-in-from-top-2 relative">
                    {isLoadingAttributes && (
                        <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-10 flex items-center justify-center rounded-2xl">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                        </div>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
                        <div>
                            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Prioridad</label>
                            <select
                                value={filters?.ticket_priority_id || ''}
                                onChange={(e) => handleFilterChange('ticket_priority_id', e.target.value)}
                                className="w-full text-sm border-slate-200 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 py-2.5 bg-slate-50/50 outline-none"
                            >
                                <option value="">Todas las prioridades</option>
                                {priorities.map(p => (
                                    <option key={p.id} value={p.id}>{p.attributes.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Categoría</label>
                            <select
                                value={filters?.ticket_category_id || ''}
                                onChange={(e) => handleFilterChange('ticket_category_id', e.target.value)}
                                className="w-full text-sm border-slate-200 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 py-2.5 bg-slate-50/50 outline-none"
                            >
                                <option value="">Todas las categorías</option>
                                {categories.map(c => (
                                    <option key={c.id} value={c.id}>{c.attributes.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Fuente / Origen</label>
                            <select
                                value={filters?.ticket_source_id || ''}
                                onChange={(e) => handleFilterChange('ticket_source_id', e.target.value)}
                                className="w-full text-sm border-slate-200 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 py-2.5 bg-slate-50/50 outline-none"
                            >
                                <option value="">Todos los orígenes</option>
                                {sources.map(s => (
                                    <option key={s.id} value={s.id}>{s.attributes.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Intervalo de Fecha (Actualización)</label>
                            <DateRangePicker
                                value={filters?.start_after || ''}
                                onChange={(val) => handleFilterChange('start_after', val)}
                            />
                        </div>
                        <div className="md:col-span-4 grid grid-cols-1 md:grid-cols-3 gap-5">
                            <div>
                                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">ID del Ticket</label>
                                <input
                                    type="text"
                                    value={filters?.id || ''}
                                    onChange={(e) => handleFilterChange('id', e.target.value)}
                                    className="block w-full text-sm rounded-lg border-slate-200 px-3 py-2.5 bg-slate-50/50 focus:border-indigo-500 focus:ring-indigo-500 outline-none shadow-sm"
                                    placeholder="Ej: 1234"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Asunto</label>
                                <input
                                    type="text"
                                    value={filters?.subject || ''}
                                    onChange={(e) => handleFilterChange('subject', e.target.value)}
                                    className="block w-full text-sm rounded-lg border-slate-200 px-3 py-2.5 bg-slate-50/50 focus:border-indigo-500 focus:ring-indigo-500 outline-none shadow-sm"
                                    placeholder="Buscar en asunto..."
                                />
                            </div>
                             <div>
                                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Descripción</label>
                                <input
                                    type="text"
                                    value={filters?.description || ''}
                                    onChange={(e) => handleFilterChange('description', e.target.value)}
                                    className="block w-full text-sm rounded-lg border-slate-200 px-3 py-2.5 bg-slate-50/50 focus:border-indigo-500 focus:ring-indigo-500 outline-none shadow-sm"
                                    placeholder="Contiene texto..."
                                />
                            </div>
                        </div>
                    </div>
                    {/* Clear filters button if any active */}
                    {hasAdvancedFiltersActive && (
                        <div className="mt-5 flex justify-end pt-4 border-t border-slate-100">
                            <button
                                onClick={() => {
                                    setFilters({
                                        subject: '',
                                        id: '',
                                        description: '',
                                        ticket_category_id: '',
                                        ticket_priority_id: '',
                                        ticket_source_id: '',
                                        state_id: filters?.state_id || '',
                                        start_after: ''
                                    });
                                    setPage(1);
                                }}
                                className="text-sm font-semibold text-rose-600 hover:text-rose-800 transition-colors flex items-center bg-rose-50 px-4 py-2 rounded-lg"
                            >
                                Limpiar Filtros Avanzados
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* Table Section */}
            <div className="flex-1 bg-white border border-slate-200/60 rounded-2xl overflow-hidden shadow-sm flex flex-col relative min-h-[400px]">
                {isLoading && (
                    <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-10 flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                    </div>
                )}
                {error && !isLoading && (
                    <div className="p-12 pl-12 text-center flex flex-col items-center justify-center h-full">
                        <div className="bg-red-50 p-4 rounded-full mb-4">
                            <CheckCircle className="h-10 w-10 text-red-500" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-800 mb-1">Error de Conexión</h3>
                        <p className="text-red-500 font-medium">{error}</p>
                    </div>
                )}

                {!error && (
                    <div className="overflow-x-auto flex-1">
                        <table className="min-w-full divide-y divide-slate-100">
                            <thead className="bg-slate-50/80">
                                <tr>
                                    {[
                                        { id: "id", label: "ID", sortable: true },
                                        { id: "subject", label: "Asunto", sortable: false },
                                        { id: "state", label: "Estado", sortable: false }, // states not fundamentally sortable directly usually unless backend maps it
                                        { id: "priority", label: "Prioridad", sortable: false },
                                        { id: "category", label: "Categoría", sortable: false },
                                        { id: "assigned_to", label: "Agente Asignado", sortable: false },
                                        { id: "updated_at", label: "Actualización", sortable: true }
                                    ].map((col) => (
                                        <th
                                            key={col.id}
                                            onClick={() => col.sortable ? handleSort(col.id) : undefined}
                                            className={`px-6 py-4 text-left text-xs font-semibold text-slate-500 border-b border-slate-200/60 uppercase tracking-wider shadow-none ${col.sortable ? 'cursor-pointer hover:bg-slate-100/50 group select-none transition-colors' : ''}`}
                                        >
                                            <div className="flex items-center gap-1.5">
                                                {col.label}
                                                {col.sortable && (
                                                    <ArrowUpDown className={`h-3.5 w-3.5 transition-opacity ${sort === col.id || sort === `-${col.id}` ? 'opacity-100 text-indigo-500' : 'opacity-0 group-hover:opacity-100 text-slate-400'}`} />
                                                )}
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-slate-100/80">
                                {ticketsResponse?.data.length === 0 && !isLoading ? (
                                    <tr>
                                        <td colSpan={7} className="px-6 py-16 text-center text-slate-500">
                                            <div className="flex flex-col items-center justify-center opacity-80 mt-10">
                                                <Search className="h-10 w-10 text-slate-300 mb-3" />
                                                <p className="text-base font-medium">No se encontraron tickets en esta vista.</p>
                                                <p className="text-xs mt-1 text-slate-400 max-w-sm">Prueba ajustando los términos de búsqueda, cambiando el estado o limpiando los filtros dinámicos.</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    ticketsResponse?.data.map((ticket) => {
                                        const p = ticket.relationships?.priority?.attributes;
                                        const s = ticket.relationships?.current_state?.attributes;
                                        const c = ticket.relationships?.category?.attributes;
                                        const a = ticket.relationships?.technician_responsible?.attributes;
                                        const src = ticket.relationships?.source?.attributes;

                                        return (
                                            <tr key={ticket.id} className="hover:bg-slate-50/80 transition-colors group cursor-pointer relative">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 font-medium border-l-4 border-transparent group-hover:border-indigo-500 transition-all">
                                                    #{ticket.id}
                                                </td>
                                                <td className="px-6 py-4 max-w-[280px]">
                                                    <div className="flex flex-col">
                                                        <Link href={`/dashboard/tickets/${ticket.id}`} className="text-sm font-bold text-slate-800 hover:text-indigo-600 hover:underline transition-colors line-clamp-1">
                                                            {ticket.attributes.subject}
                                                        </Link>

                                                        <div className="flex items-center text-[10px] text-slate-400 mt-1 font-medium bg-slate-100/50 w-max px-2 py-0.5 rounded">
                                                            {getSourceIcon(src?.name)}
                                                            {src ? src.name : 'Unknown source'}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {s ? (
                                                        <ColorBadge text={s.display_name} color={s.text_color} bgColor={s.bg_color} />
                                                    ) : <span className="text-xs text-slate-400">Sin Estado</span>}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {p ? (
                                                        <ColorBadge text={p.name} color={p.text_color} bgColor={p.bg_color} />
                                                    ) : <span className="text-xs text-slate-400">Baja</span>}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="text-sm font-medium text-slate-600 bg-slate-100 border border-slate-200 px-3 py-1 rounded-lg">
                                                        {c ? c.name : 'Varios'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {a ? (
                                                        <div className="flex items-center">
                                                            <div className="h-7 w-7 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-indigo-700 font-bold shadow-sm ring-1 ring-white text-[10px] mr-2">
                                                                {a.name?.[0]}{a.last_name?.[0]}
                                                            </div>
                                                            <div className="text-sm text-slate-700 font-medium">
                                                                {a.name} {a.last_name}
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <span className="text-sm text-slate-400 italic">No Asignado</span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                                                    <div className="flex flex-col">
                                                        <div className="flex items-center font-medium text-slate-600">
                                                            <Clock className="h-3.5 w-3.5 mr-1.5 text-indigo-400" />
                                                            {getRelativeTime(ticket.attributes.updated_at)}
                                                        </div>
                                                        <span className="text-[10px] text-slate-400 mt-1 ml-5">
                                                            {new Date(ticket.attributes.updated_at).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Pagination Footer */}
                {ticketsResponse?.meta && ticketsResponse.meta.last_page > 1 && (
                    <div className="bg-white px-4 py-3.5 border-t border-slate-200 sm:px-6 flex items-center justify-between flex-wrap gap-4 mt-auto shadow-inner rounded-b-2xl">
                        <div className="hidden sm:block text-sm text-slate-600">
                            Mostrando <span className="font-semibold text-slate-900">{ticketsResponse.meta.from || 0}</span> a <span className="font-semibold text-slate-900">{ticketsResponse.meta.to || 0}</span> de <span className="font-semibold text-slate-900">{ticketsResponse.meta.total}</span> resultados
                        </div>
                        <div className="flex-1 flex justify-between sm:justify-end">
                            <nav className="relative z-0 inline-flex rounded-lg shadow-sm -space-x-px" aria-label="Pagination">
                                {ticketsResponse.meta.links.map((link, i) => {
                                    let label: React.ReactNode = link.label;
                                    if (link.label.includes('&laquo;')) label = <ChevronLeft className="h-4 w-4" />;
                                    if (link.label.includes('&raquo;')) label = <ChevronRight className="h-4 w-4" />;

                                    const isDisabled = !link.url && link.label === '...';
                                    let targetPage = page;

                                    if (link.url) {
                                        const match = link.url.match(/[?&]page=(\d+)/);
                                        if (match) {
                                            targetPage = parseInt(match[1], 10);
                                        } else {
                                            if (link.label.includes('&laquo;')) targetPage = page - 1;
                                            if (link.label.includes('&raquo;')) targetPage = page + 1;
                                            if (!isNaN(Number(link.label))) targetPage = parseInt(link.label, 10);
                                        }
                                    }

                                    return (
                                        <button
                                            key={i}
                                            disabled={!link.url || isDisabled || link.active}
                                            onClick={() => setPage(targetPage)}
                                            className={`relative inline-flex items-center px-4 py-2 text-sm font-medium transition-colors
                                                ${link.active ? 'z-10 bg-indigo-600 border-indigo-600 text-white hover:bg-indigo-700 shadow-inner' :
                                                    isDisabled ? 'bg-white border-slate-300 text-slate-500 cursor-default' :
                                                        !link.url ? 'bg-slate-50 border-slate-300 text-slate-400 cursor-not-allowed opacity-50' :
                                                            'bg-white border-slate-300 text-slate-500 hover:bg-slate-50 hover:text-slate-700'}
                                                ${i === 0 ? 'rounded-l-lg border' : 'border-t border-b border-r'} 
                                                ${i === ticketsResponse.meta.links.length - 1 ? 'rounded-r-lg' : ''}
                                            `}
                                        >
                                            {label}
                                        </button>
                                    );
                                })}
                            </nav>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
