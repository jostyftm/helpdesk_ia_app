"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Clock, MessageSquare, Paperclip, User, Bot, AlertCircle, CheckCircle, Search, Send, FileCheck, History, BarChart2, Edit, MoreHorizontal, Mail, Download, Edit3, Tag, MessageCircle, Info, Bold, Italic, Underline, List, ListOrdered, Link as LinkIcon, Image as ImageIcon, Code, AlignLeft, AlignCenter, AlignRight, Plus, Sparkles, ChevronRight, X, BarChart } from "lucide-react";
import { ChatWidget } from "@/components/ChatWidget";

export default function TicketDetailPage({ params }: { params: { id: string } }) {
    const [activeTab, setActiveTab] = useState("description");
    const [isAISuggestionModalOpen, setIsAISuggestionModalOpen] = useState(false);

    const tabs = [
        { id: "description", name: "Descripcion", icon: AlertCircle },
        { id: "resolution", name: "Resolucion", icon: CheckCircle },
        { id: "history", name: "Historial", icon: History },
        { id: "conversations", name: "Conversaciones", icon: MessageSquare },
        { id: "time", name: "Tiempos", icon: Clock },
    ];

    return (
        <div className="w-full px-4 sm:px-6 md:px-8 py-8 h-full flex flex-col space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between shrink-0 bg-white/60 backdrop-blur-md pb-4 border-b border-slate-200/60 z-10 w-full mb-2">
                <div className="flex items-start">
                    <Link href="/dashboard/tickets" className="mt-1 p-2 mr-4 rounded-xl hover:bg-slate-100 text-slate-500 transition-colors">
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                    <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                            <span className="font-semibold text-slate-800 text-sm">{params.id === '1042' ? 'TK-1042' : 'TK-1042'}</span>
                            <span className="px-2 py-0.5 rounded border bg-rose-50 border-rose-200 text-rose-600 text-xs font-semibold flex items-center gap-1">
                                <AlertCircle className="h-3 w-3" />
                                Critica
                            </span>
                            <span className="px-2 py-0.5 rounded border bg-blue-50 border-blue-200 text-blue-600 text-xs font-semibold">
                                Abierto
                            </span>
                            <span className="px-2 py-0.5 rounded border border-slate-200 text-slate-600 text-xs font-medium flex items-center gap-1 bg-white">
                                <Mail className="h-3 w-3 text-slate-400" />
                                Email
                            </span>
                        </div>
                        <h2 className="text-xl font-bold text-slate-800">
                            Error al procesar pagos con tarjeta de credito
                        </h2>
                    </div>
                </div>
                <div className="flex gap-2 mt-4 sm:mt-0">
                    <button className="px-4 py-2 border border-slate-200 bg-white rounded-lg shadow-sm text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-2">
                        <Edit3 className="h-4 w-4 text-slate-500" />
                        Editar
                    </button>
                    <button className="p-2 border border-slate-200 bg-white rounded-lg shadow-sm text-slate-700 hover:bg-slate-50 transition-colors flex items-center justify-center">
                        <MoreHorizontal className="h-4 w-4 text-slate-500" />
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex flex-col flex-1">
                {/* Modern Tabs */}
                <div className="mb-6 overflow-x-auto custom-scrollbar pb-2">
                    <nav className="flex space-x-2 w-max" aria-label="Tabs">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`
                                        flex items-center px-4 py-2 rounded-full font-medium text-sm transition-all whitespace-nowrap border
                                        ${activeTab === tab.id
                                            ? "bg-white text-slate-800 shadow-sm border-slate-200"
                                            : "border-transparent text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                                        }
                                    `}
                                >
                                    <Icon className={`mr-2 h-4 w-4 ${activeTab === tab.id ? 'text-slate-700' : 'text-slate-400'}`} />
                                    {tab.name}
                                </button>
                            )
                        })}
                    </nav>
                </div>

                {/* Tab Panels */}
                <div className="flex-1 pb-12">
                    {/* DESCRIPTION TAB */}
                    {activeTab === "description" && (
                        <div className="flex flex-col lg:flex-row gap-6">
                            {/* 70% Left Panel */}
                            <div className="lg:w-[70%] space-y-6">
                                {/* Descripcion Card */}
                                <div className="bg-white rounded-2xl border border-slate-200/60 p-6 shadow-sm">
                                    <div className="flex items-center gap-3 mb-6">
                                        <h3 className="text-base font-bold text-slate-800">Descripcion</h3>
                                        <div className="flex items-center text-xs font-medium text-slate-500 bg-slate-50 px-2.5 py-1 rounded border border-slate-200/60">
                                            <Clock className="mr-1.5 h-3.5 w-3.5 text-slate-400" />
                                            25 Feb 2026, 10:30
                                        </div>
                                    </div>
                                    <div className="prose prose-slate max-w-none text-sm leading-relaxed text-slate-700 mb-6">
                                        <p>
                                            Se reporta un error crítico en el procesamiento de pagos con tarjeta de credito.
                                            Desde las 09:00 AM, todos los intentos de pago a traves de la pasarela principal
                                            estan fallando con el codigo de error <span className="text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-100 font-mono text-xs">GW_TIMEOUT_503</span>.
                                            El problema afecta a todas las tarjetas de credito (Visa, MasterCard, AMEX) y esta impactando directamente en las ventas del dia.
                                            Se requiere atencion inmediata.
                                        </p>
                                    </div>

                                    <div className="pt-4 flex items-center gap-6 text-sm text-slate-600">
                                        <div className="flex items-center gap-1.5">
                                            <Tag className="h-4 w-4 text-slate-400" />
                                            Categoria: <span className="font-semibold text-slate-800">Pagos</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <User className="h-4 w-4 text-slate-400" />
                                            Reportado por: <span className="font-semibold text-slate-800">Maria Lopez</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Clock className="h-4 w-4 text-slate-400" />
                                            SLA: <span className="font-bold text-rose-600">2h restantes</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Comentarios Card */}
                                <div className="bg-white rounded-2xl border border-slate-200/60 p-6 shadow-sm">
                                    <h3 className="text-base font-bold text-slate-800 mb-6">
                                        Comentarios (3)
                                    </h3>

                                    <div className="space-y-6">
                                        {/* Comment 1 */}
                                        <div className="flex gap-4">
                                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-sm shrink-0">
                                                ML
                                            </div>
                                            <div className="flex-1 bg-white border border-slate-200 rounded-2xl rounded-tl-sm p-4 shadow-sm">
                                                <div className="flex justify-between items-start mb-2">
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-bold text-slate-800 text-sm">Maria Lopez</span>
                                                        <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider border border-slate-200 bg-slate-50 px-1.5 py-0.5 rounded-full">Solicitante</span>
                                                    </div>
                                                    <span className="text-xs text-slate-400">25 Feb 2026, 10:30</span>
                                                </div>
                                                <p className="text-sm text-slate-600">
                                                    Hemos detectado que desde las 9:00 AM los pagos con tarjeta de credito estan siendo rechazados. El mensaje de error que aparece es 'Gateway Timeout'. Esto esta afectando directamente a nuestros clientes.
                                                </p>
                                            </div>
                                        </div>

                                        {/* Comment 2 */}
                                        <div className="flex gap-4">
                                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-sm shrink-0">
                                                PD
                                            </div>
                                            <div className="flex-1 bg-white border border-slate-200 rounded-2xl rounded-tl-sm p-4 shadow-sm">
                                                <div className="flex justify-between items-start mb-2">
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-bold text-slate-800 text-sm">Pedro Diaz</span>
                                                        <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider border border-slate-200 bg-slate-50 px-1.5 py-0.5 rounded-full">Tecnico Asignado</span>
                                                    </div>
                                                    <span className="text-xs text-slate-400">25 Feb 2026, 11:15</span>
                                                </div>
                                                <p className="text-sm text-slate-600">
                                                    Estoy revisando los logs del gateway de pagos. He detectado un aumento en la latencia del servicio externo. Contactare al proveedor para confirmar si hay una incidencia de su lado.
                                                </p>
                                            </div>
                                        </div>

                                        {/* Comment 3 */}
                                        <div className="flex gap-4">
                                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-sm shrink-0">
                                                AT
                                            </div>
                                            <div className="flex-1 bg-white border border-slate-200 rounded-2xl rounded-tl-sm p-4 shadow-sm">
                                                <div className="flex justify-between items-start mb-2">
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-bold text-slate-800 text-sm">Ana Torres</span>
                                                        <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider border border-slate-200 bg-slate-50 px-1.5 py-0.5 rounded-full">Supervisor</span>
                                                    </div>
                                                    <span className="text-xs text-slate-400">25 Feb 2026, 12:00</span>
                                                </div>
                                                <p className="text-sm text-slate-600">
                                                    Escalar este ticket a prioridad critica. Notificar al equipo de desarrollo para que preparen un rollback del ultimo deployment si es necesario.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Add Comment Input */}
                                    <div className="mt-6 flex gap-4">
                                        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-sm leading-none pt-[1px]">
                                            AD
                                        </div>
                                        <div className="flex-1 relative">
                                            <textarea
                                                rows={3}
                                                className="block w-full rounded-2xl border border-slate-200 bg-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-4 resize-none transition-colors pb-12"
                                                placeholder="Escribe un comentario..."
                                            />
                                            <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center bg-transparent">
                                                <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
                                                    <Paperclip className="h-4 w-4" />
                                                    Adjuntar
                                                </button>
                                                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-xl shadow-sm transition-colors">
                                                    <Send className="h-4 w-4" />
                                                    Enviar
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Archivos Adjuntos */}
                                <div className="bg-white rounded-2xl border border-slate-200/60 p-6 shadow-sm">
                                    <h3 className="text-base font-bold text-slate-800 mb-6 flex items-center gap-2">
                                        Archivos Adjuntos (3)
                                    </h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between p-3 border border-slate-200/60 rounded-xl hover:bg-slate-50 transition-colors group cursor-pointer shadow-sm">
                                            <div className="flex items-center truncate">
                                                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl mr-4 text-slate-400">
                                                    <FileCheck className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors">error_log_20260225.txt</p>
                                                    <p className="text-xs text-slate-500">24 KB</p>
                                                </div>
                                            </div>
                                            <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
                                                <Download className="h-4 w-4" />
                                            </button>
                                        </div>
                                        <div className="flex items-center justify-between p-3 border border-slate-200/60 rounded-xl hover:bg-slate-50 transition-colors group cursor-pointer shadow-sm">
                                            <div className="flex items-center truncate">
                                                <div className="p-2.5 bg-blue-50 border border-blue-100 rounded-xl mr-4 text-blue-500">
                                                    <FileCheck className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors">captura_error_pago.png</p>
                                                    <p className="text-xs text-slate-500">340 KB</p>
                                                </div>
                                            </div>
                                            <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
                                                <Download className="h-4 w-4" />
                                            </button>
                                        </div>
                                        <div className="flex items-center justify-between p-3 border border-slate-200/60 rounded-xl hover:bg-slate-50 transition-colors group cursor-pointer shadow-sm">
                                            <div className="flex items-center truncate">
                                                <div className="p-2.5 bg-rose-50 border border-rose-100 rounded-xl mr-4 text-rose-500">
                                                    <FileCheck className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors">reporte_transacciones.pdf</p>
                                                    <p className="text-xs text-slate-500">1.2 MB</p>
                                                </div>
                                            </div>
                                            <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
                                                <Download className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 30% Right Panel */}
                            <div className="lg:w-[30%] space-y-6">
                                {/* AI Categorization Suggestions */}
                                <div className="bg-gradient-to-br from-indigo-50 via-white to-indigo-50/50 rounded-2xl border border-indigo-100/60 p-6 shadow-sm relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl -mr-8 -mt-8 pointer-events-none"></div>
                                    <div className="flex justify-between items-start mb-4 relative">
                                        <div className="flex items-center gap-2">
                                            <div className="p-1.5 bg-indigo-100/50 rounded-lg text-indigo-600">
                                                <Sparkles className="w-4 h-4" />
                                            </div>
                                            <h3 className="text-sm font-bold text-slate-800">Sugerencias IA</h3>
                                        </div>
                                    </div>
                                    <p className="text-xs text-slate-600 mb-4">
                                        El sistema sugiere categorizar como <span className="font-semibold text-slate-800">Pagos / Pasarela</span> con prioridad <span className="font-semibold text-rose-600">Crítica</span> debido a las palabras clave "GW_TIMEOUT" e "impactando ventas".
                                    </p>
                                    <div className="flex gap-2">
                                        <button className="flex-1 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors">
                                            Aplicar
                                        </button>
                                        <button
                                            onClick={() => setIsAISuggestionModalOpen(true)}
                                            className="px-3 py-1.5 bg-white border border-indigo-200 text-indigo-700 hover:bg-indigo-50 text-xs font-semibold rounded-lg shadow-sm transition-colors flex items-center justify-center gap-1"
                                        >
                                            <BarChart className="w-3.5 h-3.5" />
                                            Ver detalle
                                        </button>
                                    </div>
                                </div>

                                {/* Estado del Ticket */}
                                <div className="bg-white rounded-2xl border border-slate-200/60 p-6 shadow-sm">
                                    <h3 className="text-base font-bold text-slate-800 mb-6">Estado del Ticket</h3>
                                    <div className="space-y-4 text-sm bg-white">
                                        <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                                            <span className="text-slate-500">Estado</span>
                                            <span className="px-3 py-1 bg-blue-50 text-blue-600 border border-blue-200 rounded-full text-xs font-semibold">Abierto</span>
                                        </div>
                                        <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                                            <span className="text-slate-500">Prioridad</span>
                                            <span className="px-3 py-1 bg-rose-50 text-rose-600 border border-rose-200 rounded-full text-xs font-semibold flex items-center gap-1">
                                                <AlertCircle className="h-3 w-3" /> Critica
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                                            <span className="text-slate-500">Categoria</span>
                                            <span className="font-semibold text-slate-800">Pagos</span>
                                        </div>
                                        <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                                            <span className="text-slate-500">Origen</span>
                                            <span className="font-semibold text-slate-800">Correo</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-slate-500 font-medium">SLA</span>
                                            <span className="font-bold text-rose-600">2h restantes</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Tecnicos Asignados */}
                                <div className="bg-white rounded-2xl border border-slate-200/60 p-6 shadow-sm">
                                    <h3 className="text-base font-bold text-slate-800 mb-6">Tecnicos Asignados</h3>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-sm shrink-0">
                                                PD
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-slate-800">Pedro Diaz</p>
                                                <p className="text-xs text-slate-500">Tecnico Principal</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-sm shrink-0">
                                                AT
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-slate-800">Ana Torres</p>
                                                <p className="text-xs text-slate-500">Supervisor</p>
                                            </div>
                                        </div>
                                        <button className="w-full mt-2 py-2.5 text-sm font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors flex items-center justify-center gap-2">
                                            <User className="h-4 w-4 text-slate-400" />
                                            Asignar tecnico
                                        </button>
                                    </div>
                                </div>

                                {/* Informacion Adicional */}
                                <div className="bg-white rounded-2xl border border-slate-200/60 p-6 shadow-sm">
                                    <h3 className="text-base font-bold text-slate-800 mb-6">Informacion Adicional</h3>
                                    <div className="space-y-4 text-sm font-medium">
                                        <div className="flex justify-between items-center">
                                            <span className="text-slate-500 font-normal">Departamento</span>
                                            <span className="text-slate-800 text-right">Finanzas</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-slate-500 font-normal">Empresa</span>
                                            <span className="text-slate-800 text-right">ACME Corp.</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-slate-500 font-normal">Telefono</span>
                                            <span className="text-slate-800 text-right">+52 555 1234</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-slate-500 font-normal">Tickets previos</span>
                                            <span className="text-slate-800 text-right">3</span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    )}

                    {/* HISTORY TAB */}
                    {activeTab === "history" && (
                        <div className="max-w-4xl bg-white rounded-2xl border border-slate-200/60 p-8 shadow-sm animate-in fade-in duration-300">
                            <h3 className="text-lg font-bold text-slate-800 mb-8 border-b border-slate-100 pb-4">Historial de Acciones (6)</h3>
                            <div className="relative pl-6">
                                <div className="absolute top-0 bottom-0 left-[27px] w-px bg-slate-200"></div>
                                <div className="space-y-8 relative">
                                    <div className="flex items-start gap-5">
                                        <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-500 border-2 border-white flex items-center justify-center mt-1 z-10 shrink-0">
                                            <ArrowLeft className="h-4 w-4 rotate-90" />
                                        </div>
                                        <div className="flex-1 bg-white">
                                            <div className="flex items-center gap-2 mb-1">
                                                <p className="text-sm font-bold text-slate-800">Prioridad cambiada</p>
                                                <span className="text-[11px] text-slate-500 px-1">•</span>
                                                <p className="text-[11px] text-slate-500">25 Feb 2026, 12:00</p>
                                            </div>
                                            <p className="text-sm text-slate-600 mb-2">Prioridad actualizada de Alta a <span className="font-semibold text-rose-600">Critica</span></p>
                                            <div className="flex items-center gap-1.5">
                                                <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[8px] font-bold text-slate-600">AT</div>
                                                <p className="text-[11px] font-medium text-slate-600">Ana Torres</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-5">
                                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-500 border-2 border-white flex items-center justify-center mt-1 z-10 shrink-0">
                                            <MessageCircle className="h-4 w-4" />
                                        </div>
                                        <div className="flex-1 bg-white">
                                            <div className="flex items-center gap-2 mb-1">
                                                <p className="text-sm font-bold text-slate-800">Comentario agregado</p>
                                                <span className="text-[11px] text-slate-500 px-1">•</span>
                                                <p className="text-[11px] text-slate-500">25 Feb 2026, 12:00</p>
                                            </div>
                                            <p className="text-sm text-slate-600 mb-2">Se agrego un comentario por el supervisor</p>
                                            <div className="flex items-center gap-1.5">
                                                <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[8px] font-bold text-slate-600">AT</div>
                                                <p className="text-[11px] font-medium text-slate-600">Ana Torres</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-5">
                                        <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-500 border-2 border-white flex items-center justify-center mt-1 z-10 shrink-0">
                                            <User className="h-4 w-4" />
                                        </div>
                                        <div className="flex-1 bg-white">
                                            <div className="flex items-center gap-2 mb-1">
                                                <p className="text-sm font-bold text-slate-800">Tecnico asignado</p>
                                                <span className="text-[11px] text-slate-500 px-1">•</span>
                                                <p className="text-[11px] text-slate-500">25 Feb 2026, 10:45</p>
                                            </div>
                                            <p className="text-sm text-slate-600 mb-2">Pedro Diaz asignado como tecnico principal</p>
                                            <div className="flex items-center gap-1.5">
                                                <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[8px] font-bold text-slate-600">SI</div>
                                                <p className="text-[11px] font-medium text-slate-600">Sistema</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-5">
                                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-500 border-2 border-white flex items-center justify-center mt-1 z-10 shrink-0">
                                            <MessageCircle className="h-4 w-4" />
                                        </div>
                                        <div className="flex-1 bg-white">
                                            <div className="flex items-center gap-2 mb-1">
                                                <p className="text-sm font-bold text-slate-800">Comentario agregado</p>
                                                <span className="text-[11px] text-slate-500 px-1">•</span>
                                                <p className="text-[11px] text-slate-500">25 Feb 2026, 11:15</p>
                                            </div>
                                            <p className="text-sm text-slate-600 mb-2">Revision de logs del gateway de pagos</p>
                                            <div className="flex items-center gap-1.5">
                                                <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[8px] font-bold text-slate-600">PD</div>
                                                <p className="text-[11px] font-medium text-slate-600">Pedro Diaz</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-5">
                                        <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-500 border-2 border-white flex items-center justify-center mt-1 z-10 shrink-0">
                                            <AlertCircle className="h-4 w-4" />
                                        </div>
                                        <div className="flex-1 bg-white">
                                            <div className="flex items-center gap-2 mb-1">
                                                <p className="text-sm font-bold text-slate-800">Ticket escalado</p>
                                                <span className="text-[11px] text-slate-500 px-1">•</span>
                                                <p className="text-[11px] text-slate-500">25 Feb 2026, 11:30</p>
                                            </div>
                                            <p className="text-sm text-slate-600 mb-2">Escalado al equipo de desarrollo</p>
                                            <div className="flex items-center gap-1.5">
                                                <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[8px] font-bold text-slate-600">PD</div>
                                                <p className="text-[11px] font-medium text-slate-600">Pedro Diaz</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-5">
                                        <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 border-2 border-white flex items-center justify-center mt-1 z-10 shrink-0">
                                            <Edit className="h-4 w-4" />
                                        </div>
                                        <div className="flex-1 bg-white">
                                            <div className="flex items-center gap-2 mb-1">
                                                <p className="text-sm font-bold text-slate-800">Estado cambiado</p>
                                                <span className="text-[11px] text-slate-500 px-1">•</span>
                                                <p className="text-[11px] text-slate-500">25 Feb 2026, 10:35</p>
                                            </div>
                                            <p className="text-sm text-slate-600 mb-2">Estado actualizado de Nuevo a Abierto</p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    )}

                    {/* TIME TAB */}
                    {activeTab === "time" && (
                        <div className="space-y-6 animate-in fade-in duration-300">
                            {/* Top Cards */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                <div className="bg-white rounded-2xl border border-slate-200/60 p-6 shadow-sm flex flex-col justify-center">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Clock className="w-4 h-4 text-emerald-500" />
                                        <span className="text-sm font-medium text-slate-500">Primera respuesta</span>
                                    </div>
                                    <span className="text-2xl font-bold text-emerald-500">15 min</span>
                                </div>
                                <div className="bg-white rounded-2xl border border-slate-200/60 p-6 shadow-sm flex flex-col justify-center">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Clock className="w-4 h-4 text-blue-500" />
                                        <span className="text-sm font-medium text-slate-500">Tiempo activo</span>
                                    </div>
                                    <span className="text-2xl font-bold text-blue-500">1h 30min</span>
                                </div>
                                <div className="bg-white rounded-2xl border border-slate-200/60 p-6 shadow-sm flex flex-col justify-center">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Clock className="w-4 h-4 text-amber-500" />
                                        <span className="text-sm font-medium text-slate-500">Tiempo en espera</span>
                                    </div>
                                    <span className="text-2xl font-bold text-amber-500">20 min</span>
                                </div>
                                <div className="bg-white rounded-2xl border border-slate-200/60 p-6 shadow-sm flex flex-col justify-center">
                                    <div className="flex items-center gap-2 mb-2">
                                        <AlertCircle className="w-4 h-4 text-rose-500" />
                                        <span className="text-sm font-medium text-slate-500">SLA restante</span>
                                    </div>
                                    <span className="text-2xl font-bold text-rose-600">2h 10min</span>
                                </div>
                            </div>

                            {/* Cumplimiento de SLA */}
                            <div className="bg-white rounded-2xl border border-slate-200/60 p-8 shadow-sm">
                                <h3 className="text-lg font-bold text-slate-800 mb-8">Cumplimiento de SLA</h3>
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                                        <span className="text-sm text-slate-500 font-medium">SLA de respuesta</span>
                                        <span className="px-3 py-1.5 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm">
                                            <CheckCircle className="w-3.5 h-3.5" /> Cumplido
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                                        <span className="text-sm text-slate-500 font-medium">SLA de resolucion</span>
                                        <span className="px-3 py-1.5 bg-amber-50 text-amber-700 border border-amber-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm">
                                            <Clock className="w-3.5 h-3.5" /> En curso
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                                        <span className="text-sm text-slate-500 font-medium">Tiempo restante SLA</span>
                                        <span className="px-3 py-1.5 bg-amber-50 text-amber-700 border border-amber-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm">
                                            <Clock className="w-3.5 h-3.5" /> 2h 10min
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-slate-500 font-medium">Prioridad SLA</span>
                                        <span className="px-3 py-1.5 bg-rose-50 text-rose-600 border border-rose-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm">
                                            <AlertCircle className="w-3.5 h-3.5" /> Critica - 4h
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Desglose de Tiempos */}
                            <div className="bg-white rounded-2xl border border-slate-200/60 p-8 shadow-sm">
                                <h3 className="text-lg font-bold text-slate-800 mb-10">Desglose de Tiempos</h3>
                                <div className="space-y-10">
                                    {/* 1 */}
                                    <div>
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-sm font-semibold text-slate-800">Tiempo de primera respuesta</span>
                                            <span className="text-sm text-slate-500">15 min / 30 min</span>
                                        </div>
                                        <div className="w-full bg-blue-100/50 rounded-full h-2.5 overflow-hidden">
                                            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '50%' }}></div>
                                        </div>
                                    </div>
                                    {/* 2 */}
                                    <div>
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-sm font-semibold text-slate-800">Tiempo de asignacion</span>
                                            <span className="text-sm text-slate-500">5 min / 15 min</span>
                                        </div>
                                        <div className="w-full bg-blue-100/50 rounded-full h-2.5 overflow-hidden">
                                            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '33%' }}></div>
                                        </div>
                                    </div>
                                    {/* 3 */}
                                    <div>
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-sm font-semibold text-slate-800">Tiempo en progreso</span>
                                            <span className="text-sm text-slate-500">1h 30min / 4h</span>
                                        </div>
                                        <div className="w-full bg-blue-100/50 rounded-full h-2.5 overflow-hidden">
                                            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '37.5%' }}></div>
                                        </div>
                                    </div>
                                    {/* 4 */}
                                    <div>
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-sm font-semibold text-slate-800">Tiempo total transcurrido</span>
                                            <span className="text-sm text-slate-500">1h 50min / 8h</span>
                                        </div>
                                        <div className="w-full bg-blue-100/50 rounded-full h-2.5 overflow-hidden">
                                            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '23%' }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Linea de Tiempo */}
                            <div className="bg-white rounded-2xl border border-slate-200/60 p-8 shadow-sm">
                                <h3 className="text-lg font-bold text-slate-800 mb-8">Linea de Tiempo</h3>
                                <div className="space-y-6">
                                    {[
                                        { time: '10:30', text: 'Ticket creado', elapsed: '' },
                                        { time: '10:32', text: 'Primer vistazo por tecnico', elapsed: '+2 min' },
                                        { time: '10:45', text: 'Primera respuesta enviada', elapsed: '+15 min' },
                                        { time: '10:45', text: 'Tecnico asignado', elapsed: '+15 min' },
                                        { time: '11:15', text: 'Investigacion iniciada', elapsed: '+45 min' },
                                        { time: '11:30', text: 'Ticket escalado', elapsed: '+1h' },
                                        { time: '12:00', text: 'Supervisor intervino', elapsed: '+1h 30min' },
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex items-center py-1">
                                            <div className="w-16 text-sm text-slate-500 tabular-nums font-mono">{item.time}</div>
                                            <div className="w-2 h-2 rounded-full bg-blue-600 shrink-0 mx-4"></div>
                                            <div className="flex-1 text-sm text-slate-800 font-medium">{item.text}</div>
                                            {item.elapsed && <div className="text-xs text-slate-500 text-right tabular-nums ml-4">{item.elapsed}</div>}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* RESOLUTION TAB */}
                    {activeTab === "resolution" && (
                        <div className="flex flex-col lg:flex-row gap-6 animate-in fade-in duration-300">
                            {/* 70% Left Panel - Editor & Attachments */}
                            <div className="lg:w-[70%] space-y-6">
                                {/* Editor Card */}
                                <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden flex flex-col">
                                    {/* Header */}
                                    <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                                        <h3 className="text-lg font-bold text-slate-800">Solución del Ticket</h3>
                                        <span className="px-2.5 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-sm">
                                            <Clock className="w-3.5 h-3.5" /> En progreso
                                        </span>
                                    </div>

                                    {/* Rich Text Toolbar */}
                                    <div className="px-4 py-2 border-b border-slate-200/60 bg-white flex flex-wrap items-center gap-1">
                                        <div className="flex items-center gap-1 pr-3 border-r border-slate-200">
                                            <select className="text-sm font-medium border-none bg-transparent text-slate-700 focus:ring-0 cursor-pointer hover:bg-slate-50 rounded-md py-1 px-2">
                                                <option>Normal text</option>
                                                <option>Heading 1</option>
                                                <option>Heading 2</option>
                                                <option>Heading 3</option>
                                            </select>
                                        </div>
                                        <div className="flex items-center gap-1 px-3 border-r border-slate-200">
                                            <button className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-md transition-colors" title="Bold"><Bold className="w-4 h-4" /></button>
                                            <button className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-md transition-colors" title="Italic"><Italic className="w-4 h-4" /></button>
                                            <button className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-md transition-colors" title="Underline"><Underline className="w-4 h-4" /></button>
                                        </div>
                                        <div className="flex items-center gap-1 px-3 border-r border-slate-200 hidden sm:flex">
                                            <button className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-md transition-colors" title="Align Left"><AlignLeft className="w-4 h-4" /></button>
                                            <button className="p-1.5 text-slate-400 hover:bg-slate-100 rounded-md transition-colors" title="Align Center"><AlignCenter className="w-4 h-4" /></button>
                                            <button className="p-1.5 text-slate-400 hover:bg-slate-100 rounded-md transition-colors" title="Align Right"><AlignRight className="w-4 h-4" /></button>
                                        </div>
                                        <div className="flex items-center gap-1 px-3 border-r border-slate-200">
                                            <button className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-md transition-colors" title="Bullet List"><List className="w-4 h-4" /></button>
                                            <button className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-md transition-colors" title="Numbered List"><ListOrdered className="w-4 h-4" /></button>
                                        </div>
                                        <div className="flex items-center gap-1 pl-3">
                                            <button className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-md transition-colors" title="Insert Link"><LinkIcon className="w-4 h-4" /></button>
                                            <button className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-md transition-colors" title="Insert Image"><ImageIcon className="w-4 h-4" /></button>
                                            <button className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-md transition-colors" title="Code Block"><Code className="w-4 h-4" /></button>
                                        </div>
                                    </div>

                                    {/* Text Area */}
                                    <div className="p-6 bg-white min-h-[300px]">
                                        <textarea
                                            className="w-full h-full min-h-[250px] resize-none border-none focus:ring-0 text-slate-700 text-sm leading-relaxed placeholder:text-slate-400"
                                            placeholder="Escribe la solución detallada aquí..."
                                            defaultValue={`El problema fue identificado en el microservicio de procesamiento de pagos (PaymentGateway v2.4). Durante el pico de transacciones de hoy a las 09:00 AM, el pool de conexiones a la base de datos se saturó debido a consultas no optimizadas introducidas en el último despliegue.

Acciones tomadas:
1. Se reinició el pod del servicio afectados para liberar bloqueos temporalmente.
2. Se incrementó el número máximo de conexiones en el pooler (PgBouncer) de 500 a 1000.
3. Se aplicó un hotfix revirtiendo el query conflictivo a su estado anterior.

El servicio se encuentra estable y monitoreado. Se adjuntan logs del análisis.`}
                                        />
                                    </div>
                                </div>

                                {/* Attachments Section */}
                                <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-6">
                                    <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
                                        <Paperclip className="w-4 h-4 text-slate-500" />
                                        Archivos Adjuntos
                                    </h3>

                                    {/* Drag & Drop Zone */}
                                    <div className="border-2 border-dashed border-slate-200 rounded-xl bg-slate-50 p-8 text-center hover:bg-slate-100 hover:border-indigo-300 transition-colors cursor-pointer group mb-6">
                                        <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                                            <Plus className="w-6 h-6 text-indigo-500" />
                                        </div>
                                        <p className="text-sm font-medium text-slate-700">Arrastra archivos aquí o <span className="text-indigo-600">examinar</span></p>
                                        <p className="text-xs text-slate-500 mt-1">Soporta ZIP, PDF, PNG, JPG hasta 50MB</p>
                                    </div>

                                    {/* Uploaded Files List */}
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between p-3 border border-slate-200/60 rounded-xl bg-white shadow-sm">
                                            <div className="flex items-center truncate">
                                                <div className="p-2.5 bg-indigo-50 border border-indigo-100 rounded-xl mr-4 text-indigo-600">
                                                    <FileCheck className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold text-slate-800">hotfix_query_v2.sql</p>
                                                    <p className="text-xs text-slate-500">Subido hace 5 min • 12 KB</p>
                                                </div>
                                            </div>
                                            <button className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors" title="Eliminar">
                                                <AlertCircle className="h-4 w-4" /> {/* Just using alert as placeholder for delete/trash, ideally trash icon */}
                                            </button>
                                        </div>
                                        <div className="flex items-center justify-between p-3 border border-slate-200/60 rounded-xl bg-white shadow-sm">
                                            <div className="flex items-center truncate">
                                                <div className="p-2.5 bg-blue-50 border border-blue-100 rounded-xl mr-4 text-blue-500">
                                                    <ImageIcon className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold text-slate-800">monitoreo_cpu_ram.png</p>
                                                    <p className="text-xs text-slate-500">Subido hace 2 min • 1.4 MB</p>
                                                </div>
                                            </div>
                                            <button className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors" title="Eliminar">
                                                <AlertCircle className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex justify-end gap-3 pt-4">
                                    <button className="px-5 py-2.5 border border-slate-200 bg-white rounded-xl shadow-sm text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                                        Guardar Borrador
                                    </button>
                                    <button className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-sm text-sm font-medium flex items-center gap-2 transition-colors">
                                        <CheckCircle className="w-4 h-4" />
                                        Resolver Ticket
                                    </button>
                                </div>
                            </div>

                            {/* 30% Right Panel - AI Suggestions */}
                            <div className="lg:w-[30%] space-y-6">
                                <div className="bg-gradient-to-b from-indigo-50/50 to-white rounded-2xl border border-indigo-100/60 p-6 shadow-sm relative overflow-hidden group">
                                    {/* Decoration */}
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>

                                    <div className="flex items-center gap-2 mb-6 relative">
                                        <div className="p-2 bg-indigo-100/50 rounded-lg text-indigo-600">
                                            <Sparkles className="w-5 h-5" />
                                        </div>
                                        <h3 className="text-base font-bold text-slate-800">Sugerencias IA</h3>
                                    </div>

                                    <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                                        Basado en el historial de la categoría <span className="font-semibold text-slate-800">Pagos</span> y el error <span className="font-mono text-xs bg-slate-100 px-1 py-0.5 rounded">GW_TIMEOUT_503</span>, he encontrado resoluciones previas exitosas.
                                    </p>

                                    <div className="space-y-4 relative">
                                        {/* Suggestion 1 */}
                                        <div className="p-4 bg-white rounded-xl border border-indigo-100 shadow-sm hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer">
                                            <div className="flex justify-between items-start mb-2">
                                                <h4 className="font-semibold text-sm text-slate-800">Aumentar pool de PgBouncer</h4>
                                                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">98% Éxito</span>
                                            </div>
                                            <p className="text-xs text-slate-500 mb-3 line-clamp-2">
                                                Incrementar max_client_conn a 1000 en la configuración de la base de datos de la pasarela.
                                            </p>
                                            <button className="text-xs font-semibold text-indigo-600 flex items-center gap-1 hover:text-indigo-700">
                                                Aplicar al editor <ChevronRight className="w-3 h-3" />
                                            </button>
                                        </div>

                                        {/* Suggestion 2 */}
                                        <div className="p-4 bg-white rounded-xl border border-slate-100 shadow-sm hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer">
                                            <div className="flex justify-between items-start mb-2">
                                                <h4 className="font-semibold text-sm text-slate-800">Reversión de Queries</h4>
                                                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">75% Éxito</span>
                                            </div>
                                            <p className="text-xs text-slate-500 mb-3 line-clamp-2">
                                                Ejecutar el script de rollback para el repositorio del PaymentGateway a la versión previa.
                                            </p>
                                            <button className="text-xs font-semibold text-indigo-600 flex items-center gap-1 hover:text-indigo-700">
                                                Aplicar al editor <ChevronRight className="w-3 h-3" />
                                            </button>
                                        </div>
                                    </div>

                                    <button className="w-full mt-6 py-2 border border-indigo-200 bg-indigo-50 text-indigo-700 rounded-xl text-sm font-semibold hover:bg-indigo-100 transition-colors flex items-center justify-center gap-2">
                                        Generar más opciones
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* CONVERSATIONS TAB */}
                    {activeTab === "conversations" && (
                        <div className="max-w-4xl mx-auto">
                            <ChatWidget />
                        </div>
                    )}
                </div>
            </div>

            {/* AI Suggestion Detail Modal */}
            {isAISuggestionModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
                    <div
                        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
                        onClick={() => setIsAISuggestionModalOpen(false)}
                    ></div>
                    <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
                        {/* Modal Header */}
                        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-indigo-50/50">
                            <div className="flex items-center gap-2">
                                <div className="p-1.5 bg-indigo-100/80 rounded-lg text-indigo-700">
                                    <Sparkles className="w-5 h-5" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-800">Análisis de Predicción IA</h3>
                            </div>
                            <button
                                onClick={() => setIsAISuggestionModalOpen(false)}
                                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="px-6 py-6 border-b border-slate-100">
                            <div className="mb-6">
                                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                                    Basado en el procesamiento de lenguaje natural de <span className="font-semibold text-slate-800">482 tickets históricos</span> similares, el modelo sugiere las siguientes categorizaciones:
                                </p>
                            </div>

                            <div className="space-y-4">
                                {/* Top Prediction */}
                                <div className="p-4 border border-indigo-200 bg-indigo-50/30 rounded-xl relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
                                    <div className="flex justify-between items-start mb-2 pl-2">
                                        <div>
                                            <h4 className="font-bold text-slate-800 text-sm">Pagos / Pasarela</h4>
                                            <p className="text-xs text-slate-500 mt-0.5">Prioridad Sugerida: <span className="font-semibold text-rose-600">Crítica</span></p>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <span className="text-sm font-bold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded-md">89%</span>
                                            <span className="text-[10px] text-slate-500 mt-1">Confianza</span>
                                        </div>
                                    </div>
                                    <div className="mt-3 pl-2">
                                        <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
                                            <span>Casos exitosos: 429</span>
                                            <span>Tasa de éxito de resolución</span>
                                        </div>
                                        <div className="w-full bg-slate-200 rounded-full h-1.5">
                                            <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: '89%' }}></div>
                                        </div>
                                    </div>
                                    <button className="w-full mt-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-semibold transition-colors shadow-sm">
                                        Aplicar esta categorización
                                    </button>
                                </div>

                                {/* Second Prediction */}
                                <div className="p-4 border border-slate-200 bg-white rounded-xl shadow-sm hover:border-slate-300 transition-colors cursor-pointer group">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h4 className="font-semibold text-slate-800 text-sm group-hover:text-indigo-600 transition-colors">Infraestructura / BD</h4>
                                            <p className="text-xs text-slate-500 mt-0.5">Prioridad Sugerida: Alta</p>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <span className="text-sm font-bold text-slate-600">8%</span>
                                            <span className="text-[10px] text-slate-400 mt-0.5">38 casos</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Third Prediction */}
                                <div className="p-4 border border-slate-200 bg-white rounded-xl shadow-sm hover:border-slate-300 transition-colors cursor-pointer group">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h4 className="font-semibold text-slate-800 text-sm group-hover:text-indigo-600 transition-colors">Ventas / Checkout</h4>
                                            <p className="text-xs text-slate-500 mt-0.5">Prioridad Sugerida: Media</p>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <span className="text-sm font-bold text-slate-600">3%</span>
                                            <span className="text-[10px] text-slate-400 mt-0.5">15 casos</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
