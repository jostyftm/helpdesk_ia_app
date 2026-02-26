"use client";

import React, { createContext, useContext, useState } from "react";
import { X, CheckCircle, AlertCircle } from "lucide-react";

type ModalsContextType = {
    openChangePasswordModal: () => void;
    openUpdateProfileModal: () => void;
    openLogoutModal: () => void;
};

const ModalsContext = createContext<ModalsContextType | null>(null);

export function useModals() {
    const context = useContext(ModalsContext);
    if (!context) {
        throw new Error("useModals must be used within a ModalsProvider");
    }
    return context;
}

export function ModalsProvider({ children }: { children: React.ReactNode }) {
    const [activeModal, setActiveModal] = useState<"password" | "profile" | "logout" | null>(null);

    const openChangePasswordModal = () => setActiveModal("password");
    const openUpdateProfileModal = () => setActiveModal("profile");
    const openLogoutModal = () => setActiveModal("logout");
    const closeModal = () => setActiveModal(null);

    return (
        <ModalsContext.Provider value={{ openChangePasswordModal, openUpdateProfileModal, openLogoutModal }}>
            {children}
            {activeModal === "password" && <ChangePasswordModal onClose={closeModal} />}
            {activeModal === "profile" && <UpdateProfileModal onClose={closeModal} />}
            {activeModal === "logout" && <LogoutModal onClose={closeModal} />}
        </ModalsContext.Provider>
    );
}

// ---------------- Modals Implementations ----------------

function ModalWrapper({ children, onClose, title }: { children: React.ReactNode, onClose: () => void, title: string }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" onClick={onClose} />
            <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                    <h3 className="text-lg font-bold text-slate-800">{title}</h3>
                    <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-lg transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <div className="px-6 py-6 border-b border-slate-100">
                    {children}
                </div>
            </div>
        </div>
    );
}

function ChangePasswordModal({ onClose }: { onClose: () => void }) {
    const [isSuccess, setIsSuccess] = useState(false);

    if (isSuccess) {
        return (
            <ModalWrapper onClose={onClose} title="Contraseña Actualizada">
                <div className="text-center py-4 space-y-4">
                    <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4 text-green-600">
                        <CheckCircle className="w-6 h-6" />
                    </div>
                    <p className="text-slate-600 text-sm">Tu contraseña ha sido actualizada exitosamente.</p>
                    <button onClick={onClose} className="w-full py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-sm font-semibold transition-colors mt-6">
                        Cerrar
                    </button>
                </div>
            </ModalWrapper>
        );
    }

    return (
        <ModalWrapper onClose={onClose} title="Actualizar Contraseña">
            <form onSubmit={(e) => { e.preventDefault(); setIsSuccess(true); }} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Contraseña Actual</label>
                    <input type="password" required className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Nueva Contraseña</label>
                    <input type="password" required className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Confirmar Nueva Contraseña</label>
                    <input type="password" required className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm" />
                </div>
                <div className="flex gap-3 pt-4 border-t border-slate-100 mt-6">
                    <button type="button" onClick={onClose} className="flex-1 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg text-sm font-medium transition-colors">
                        Cancelar
                    </button>
                    <button type="submit" className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-semibold transition-colors">
                        Actualizar
                    </button>
                </div>
            </form>
        </ModalWrapper>
    );
}

function UpdateProfileModal({ onClose }: { onClose: () => void }) {
    const [isSuccess, setIsSuccess] = useState(false);

    if (isSuccess) {
        return (
            <ModalWrapper onClose={onClose} title="Perfil Actualizado">
                <div className="text-center py-4 space-y-4">
                    <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4 text-green-600">
                        <CheckCircle className="w-6 h-6" />
                    </div>
                    <p className="text-slate-600 text-sm">Tu perfil ha sido actualizado exitosamente.</p>
                    <button onClick={onClose} className="w-full py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-sm font-semibold transition-colors mt-6">
                        Cerrar
                    </button>
                </div>
            </ModalWrapper>
        );
    }

    return (
        <ModalWrapper onClose={onClose} title="Actualizar Perfil">
            <form onSubmit={(e) => { e.preventDefault(); setIsSuccess(true); }} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Nombre</label>
                    <input type="text" defaultValue="Admin Usuario" required className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Correo Electrónico</label>
                    <input type="email" defaultValue="admin@helpdesk.com" required className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm" />
                </div>

                <div className="flex gap-3 pt-4 border-t border-slate-100 mt-6">
                    <button type="button" onClick={onClose} className="flex-1 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg text-sm font-medium transition-colors">
                        Cancelar
                    </button>
                    <button type="submit" className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-semibold transition-colors">
                        Guardar Cambios
                    </button>
                </div>
            </form>
        </ModalWrapper>
    );
}

function LogoutModal({ onClose }: { onClose: () => void }) {
    return (
        <ModalWrapper onClose={onClose} title="Cerrar Sesión">
            <div className="text-center py-2 space-y-4">
                <div className="mx-auto w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mb-4 text-rose-600">
                    <AlertCircle className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-slate-800">¿Estás seguro?</h4>
                <p className="text-slate-600 text-sm">Se cerrará tu sesión actual y tendrás que volver a ingresar tus credenciales para acceder al sistema.</p>
                <div className="flex gap-3 pt-6">
                    <button onClick={onClose} className="flex-1 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg text-sm font-medium transition-colors">
                        Cancelar
                    </button>
                    <a href="/login" className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-sm font-semibold transition-colors flex items-center justify-center">
                        Sí, salir
                    </a>
                </div>
            </div>
        </ModalWrapper>
    );
}
