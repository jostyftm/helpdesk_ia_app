"use client";

import { useState } from "react";
import { Send, Paperclip, Smile } from "lucide-react";

export function ChatWidget() {
    const [messages, setMessages] = useState([
        { id: 1, text: "Hola, ¿podemos revisar este ticket?", sender: "Maria Lopez", time: "10:35 AM", isMe: false },
        { id: 2, text: "Claro, estoy revisando los logs ahora mismo.", sender: "Tu", time: "10:38 AM", isMe: true },
        { id: 3, text: "Parece ser un problema con el Gateway.", sender: "Tu", time: "10:39 AM", isMe: true },
        { id: 4, text: "Entendido, esperare actualizaciones.", sender: "Maria Lopez", time: "10:45 AM", isMe: false },
    ]);
    const [newMessage, setNewMessage] = useState("");

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (newMessage.trim() === "") return;

        setMessages([
            ...messages,
            {
                id: messages.length + 1,
                text: newMessage,
                sender: "Tu",
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                isMe: true
            }
        ]);
        setNewMessage("");
    };

    return (
        <div className="flex flex-col h-[500px] bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden animate-in fade-in duration-300">
            {/* Chat Messages Area */}
            <div className="flex-1 p-6 overflow-y-auto space-y-6">
                {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
                        {!msg.isMe && (
                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-xs shrink-0 mr-3 mt-auto">
                                ML
                            </div>
                        )}
                        <div className={`max-w-[75%] ${msg.isMe ? 'items-end' : 'items-start'}`}>
                            {!msg.isMe && <p className="text-xs text-slate-500 mb-1 ml-1">{msg.sender}</p>}
                            <div className={`relative px-4 py-3 rounded-2xl shadow-sm text-sm ${msg.isMe ? 'bg-indigo-600 text-white rounded-br-sm' : 'bg-slate-50 border border-slate-200 text-slate-700 rounded-bl-sm'}`}>
                                <p>{msg.text}</p>
                            </div>
                            <p className={`text-[10px] text-slate-400 mt-1 ${msg.isMe ? 'text-right mr-1' : 'ml-1'}`}>{msg.time}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Chat Input Area */}
            <div className="p-4 border-t border-slate-100 bg-slate-50/50">
                <form onSubmit={handleSendMessage} className="relative flex items-end gap-2">
                    <div className="flex-1 bg-white border border-slate-200 rounded-2xl shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-transparent transition-all flex items-center pl-3">
                        <button type="button" className="p-2 text-slate-400 hover:text-indigo-600 transition-colors shrink-0">
                            <Smile className="w-5 h-5" />
                        </button>
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Escribe un mensaje..."
                            className="w-full bg-transparent border-none focus:ring-0 py-3 px-2 text-sm text-slate-700 placeholder-slate-400"
                        />
                        <button type="button" className="p-2 text-slate-400 hover:text-indigo-600 transition-colors shrink-0 mr-2">
                            <Paperclip className="w-5 h-5" />
                        </button>
                    </div>
                    <button
                        type="submit"
                        disabled={!newMessage.trim()}
                        className="p-3.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white rounded-2xl shadow-sm shrink-0 transition-colors flex items-center justify-center"
                    >
                        <Send className="w-5 h-5 -ml-0.5" />
                    </button>
                </form>
            </div>
        </div>
    );
}
