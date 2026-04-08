"use client";

import { useState } from "react";
import { Search, Send, Paperclip, MoreVertical, Phone, Video, CheckCircle, Clock } from "lucide-react";

const mockChats = [
    { id: "1", user: "Alice Smith", text: "Hola, intenté omitir el cortafuegos como me...", time: "10:30 AM", unread: 2, status: "active", ticketId: "T-1001" },
    { id: "2", user: "Bob Taylor", text: "Gracias por la ayuda, todo funciona bien ahora.", time: "Ayer", unread: 0, status: "closed", ticketId: "T-1002" },
    { id: "3", user: "Charlie Davis", text: "¿Cuándo volverá a estar en línea el servidor?", time: "Hace 2 días", unread: 0, status: "closed", ticketId: "T-1003" },
];

export default function ChatPage() {
    const [activeChat, setActiveChat] = useState(mockChats[0].id);
    const [filter, setFilter] = useState<"all" | "active" | "closed">("all");

    const filteredChats = mockChats.filter((c) => filter === "all" || c.status === filter);
    const selectedChatData = mockChats.find((c) => c.id === activeChat);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 h-full flex flex-col">
            <div className="mb-6 shrink-0 bg-white/60 backdrop-blur-md p-6 rounded-2xl border border-white/40 shadow-sm flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                        Chat de Soporte en Vivo
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">Interactúa con los clientes en tiempo real para resolver problemas más rápido.</p>
                </div>
                <div className="flex bg-slate-100 p-1 rounded-xl">
                    <button onClick={() => setFilter("all")} className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${filter === "all" ? "bg-white shadow-sm text-indigo-700" : "text-slate-500 hover:text-slate-700"}`}>Todos</button>
                    <button onClick={() => setFilter("active")} className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${filter === "active" ? "bg-white shadow-sm text-indigo-700" : "text-slate-500 hover:text-slate-700"}`}>Activos</button>
                    <button onClick={() => setFilter("closed")} className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${filter === "closed" ? "bg-white shadow-sm text-indigo-700" : "text-slate-500 hover:text-slate-700"}`}>Cerrados</button>
                </div>
            </div>

            <div className="flex-1 bg-white shadow-sm rounded-2xl border border-slate-200/60 overflow-hidden flex min-h-[500px] flex-col md:flex-row">
                {/* Sidebar Chat List (Hidden on mobile if activeChat is set, but since we always have an active chat let's just show it side-by-side or stack it) */}
                {/* For better UX, we'll hide the list on very small screens, or we show the list full width and hide the chat. Here we'll make list full width on mobile and hide chat, add a back button to chat interface if needed. */}
                <div className={`w-full md:w-1/3 border-r border-slate-200/60 flex flex-col bg-slate-50/30 ${activeChat ? 'hidden md:flex' : 'flex'}`}>
                    <div className="p-4 border-b border-slate-200/60">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-4 w-4 text-slate-400" />
                            </div>
                            <input type="text" className="block w-full pl-10 sm:text-sm border-slate-200 rounded-xl py-2.5 px-3 bg-white focus:ring-indigo-500 focus:border-indigo-500 border shadow-sm transition-colors" placeholder="Buscar chats o tickets..." />
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto custom-scrollbar">
                        {filteredChats.map((chat) => (
                            <div
                                key={chat.id}
                                onClick={() => setActiveChat(chat.id)}
                                className={`p-4 border-b border-slate-100 cursor-pointer transition-all hover:bg-white select-none relative
                  ${activeChat === chat.id ? "bg-indigo-50/50 border-l-4 border-l-indigo-500 md:bg-indigo-50/50" : "border-l-4 border-l-transparent"}
                `}
                            >
                                <div className="flex justify-between items-start mb-1">
                                    <h4 className={`text-sm font-semibold truncate pr-4 ${activeChat === chat.id ? "text-indigo-900" : "text-slate-800"}`}>{chat.user}</h4>
                                    <span className="text-xs text-slate-400 whitespace-nowrap pt-0.5">{chat.time}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <p className="text-xs text-slate-500 truncate mr-4">{chat.text}</p>
                                    {chat.unread > 0 && (
                                        <span className="bg-indigo-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shrink-0">
                                            {chat.unread}
                                        </span>
                                    )}
                                </div>
                                <div className="mt-2 flex items-center mt-2">
                                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded uppercase ${chat.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                                        {chat.status === 'active' ? 'ACTIVO' : 'CERRADO'}
                                    </span>
                                    <span className="text-[10px] text-slate-400 ml-2 font-medium tracking-wide">#{chat.ticketId}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Chat Interface */}
                <div className={`flex-1 flex flex-col bg-white ${activeChat ? 'flex' : 'hidden md:flex'}`}>
                    <div className="h-16 border-b border-slate-200/60 px-4 sm:px-6 flex items-center justify-between shrink-0 bg-white/80 backdrop-blur-sm relative z-10 w-full">
                        <div className="flex items-center">
                            {/* Back button for mobile */}
                            <button
                                onClick={() => setActiveChat("")}
                                className="md:hidden mr-3 p-2 -ml-2 text-slate-400 hover:text-indigo-600 rounded-lg transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left"><path d="m12 19-7-7 7-7" /><path d="M19 12H5" /></svg>
                            </button>
                            <div className="relative">
                                <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600 border border-slate-200 shadow-sm">
                                    {selectedChatData?.user.substring(0, 2).toUpperCase()}
                                </div>
                                {selectedChatData?.status === "active" && (
                                    <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 border-2 border-white"></div>
                                )}
                            </div>
                            <div className="ml-3 truncate">
                                <h3 className="text-sm font-bold text-slate-800 truncate">{selectedChatData?.user}</h3>
                                <p className="text-xs font-medium text-slate-500 truncate">Ticket #{selectedChatData?.ticketId}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1 sm:gap-2">
                            <button className="hidden sm:block p-2 text-slate-400 hover:text-indigo-600 hover:bg-slate-50 rounded-lg transition-colors"><Phone className="h-5 w-5" /></button>
                            <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-slate-50 rounded-lg transition-colors"><Video className="h-5 w-5" /></button>
                            <div className="w-px h-6 bg-slate-200 mx-1 sm:mx-2"></div>
                            <button className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"><MoreVertical className="h-5 w-5" /></button>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50/50 space-y-6 custom-scrollbar relative w-full">
                        {/* Date Separator */}
                        <div className="flex justify-center mb-6">
                            <span className="text-xs font-medium text-slate-400 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-sm">Hoy</span>
                        </div>

                        <div className="flex items-end pr-4 sm:pr-16 animate-in slide-in-from-left-4 fade-in duration-300">
                            <div className="w-8 h-8 rounded-full bg-slate-100 flex-shrink-0 flex items-center justify-center text-slate-600 text-xs font-bold mr-2 sm:mr-3 border border-slate-200 shadow-sm">
                                {selectedChatData?.user.substring(0, 2).toUpperCase()}
                            </div>
                            <div className="max-w-[85%] sm:max-w-[75%]">
                                <div className="bg-white border border-slate-200/60 text-slate-700 text-sm p-3 sm:p-4 rounded-2xl rounded-bl-sm shadow-sm inline-block leading-relaxed break-words">
                                    Hola, estoy teniendo problemas para conectarme a la VPN de nuevo. Dice que la conexión ha caducado.
                                </div>
                                <div className="text-[10px] text-slate-400 mt-1 ml-1 font-medium">10:24 AM</div>
                            </div>
                        </div>

                        <div className="flex items-end pl-4 sm:pl-16 justify-end animate-in slide-in-from-right-4 fade-in duration-300">
                            <div className="flex flex-col items-end max-w-[85%] sm:max-w-[75%] w-full">
                                <div className="bg-indigo-600 text-white text-sm p-3 sm:p-4 rounded-2xl rounded-br-sm shadow-sm leading-relaxed self-end w-auto text-left break-words">
                                    Hola {selectedChatData?.user.split(" ")[0]}, veo el ticket que abriste. Déjame revisar los registros de conexión de tu dispositivo.
                                </div>
                                <div className="text-[10px] text-slate-400 mt-1 mr-1 font-medium">10:26 AM</div>
                            </div>
                        </div>

                        <div className="flex items-end pr-4 sm:pr-16 animate-in slide-in-from-left-4 fade-in duration-300">
                            <div className="w-8 h-8 rounded-full bg-slate-100 flex-shrink-0 flex items-center justify-center text-slate-600 text-xs font-bold mr-2 sm:mr-3 border border-slate-200 shadow-sm">
                                {selectedChatData?.user.substring(0, 2).toUpperCase()}
                            </div>
                            <div className="max-w-[85%] sm:max-w-[75%]">
                                <div className="bg-white border border-slate-200/60 text-slate-700 text-sm p-3 sm:p-4 rounded-2xl rounded-bl-sm shadow-sm inline-block leading-relaxed break-words">
                                    {selectedChatData?.text}
                                </div>
                                <div className="text-[10px] text-slate-400 mt-1 ml-1 font-medium">10:30 AM</div>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 bg-white border-t border-slate-200/60 shrink-0">
                        {selectedChatData?.status === "closed" ? (
                            <div className="text-center p-4 bg-slate-50 rounded-xl border border-slate-200/60">
                                <p className="text-sm text-slate-500 font-medium">Esta conversación está cerrada. Reabre el ticket para enviar mensajes.</p>
                            </div>
                        ) : (
                            <div className="flex items-end bg-slate-50 border border-slate-200 rounded-2xl px-2 shadow-sm focus-within:ring-2 ring-indigo-500/20 focus-within:border-indigo-500 transition-all">
                                <button className="p-3 text-slate-400 hover:text-indigo-600 transition-colors shrink-0 mb-1"><Paperclip className="h-5 w-5" /></button>
                                <textarea
                                    rows={1}
                                    className="flex-1 bg-transparent border-0 focus:ring-0 text-sm py-4 px-2 text-slate-700 resize-none max-h-32 min-h-[56px] custom-scrollbar"
                                    placeholder="Escribe tu mensaje..."
                                />
                                <button className="p-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-sm transition-colors mb-1.5 shrink-0 ml-2">
                                    <Send className="h-4 w-4" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
