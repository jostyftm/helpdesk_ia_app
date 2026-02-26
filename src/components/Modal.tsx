"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    maxWidth?: string;
}

export function Modal({ isOpen, onClose, title, children, maxWidth = "max-w-lg" }: ModalProps) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted || !isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
            <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" onClick={onClose} />
            <div className={`relative w-full ${maxWidth} mx-auto my-6 z-50 p-4`}>
                <div className="relative flex w-full flex-col rounded-xl border border-slate-200 bg-white/95 backdrop-blur shadow-2xl outline-none focus:outline-none overflow-hidden">
                    <div className="flex items-center justify-between border-b border-slate-200/60 p-5">
                        <h3 className="text-xl font-semibold text-slate-800">{title}</h3>
                        <button
                            onClick={onClose}
                            className="p-1 ml-auto border-0 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                    <div className="relative flex-auto max-h-[75vh] overflow-y-auto custom-scrollbar p-6">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
