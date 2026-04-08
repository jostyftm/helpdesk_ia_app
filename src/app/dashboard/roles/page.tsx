"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, Shield, Users, Save } from "lucide-react";
import { Modal } from "@/components/Modal";

interface Role {
    id: string;
    name: string;
    description: string;
    userCount: number;
}

const mockRoles: Role[] = [
    { id: "1", name: "Administrator", description: "Full system access and configuration.", userCount: 3 },
    { id: "2", name: "Agent", description: "Can interact with tickets, chat, and notes.", userCount: 15 },
    { id: "3", name: "Client", description: "Can create and view only their own tickets.", userCount: 1240 },
    { id: "4", name: "Manager", description: "Reporting and agent supervision access.", userCount: 2 },
];

const availablePermissions = [
    { id: "tickets.create", name: "Create Tickets", group: "Tickets" },
    { id: "tickets.read.all", name: "Read All Tickets", group: "Tickets" },
    { id: "tickets.read.own", name: "Read Own Tickets", group: "Tickets" },
    { id: "tickets.update", name: "Update Tickets", group: "Tickets" },
    { id: "tickets.delete", name: "Delete Tickets", group: "Tickets" },
    { id: "users.manage", name: "Manage Users", group: "System" },
    { id: "roles.manage", name: "Manage Roles", group: "System" },
    { id: "reports.view", name: "View Reports", group: "Reports" },
    { id: "chat.access", name: "Access Live Chat", group: "Chat" },
];

export default function RolesPage() {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isPermissionsOpen, setIsPermissionsOpen] = useState(false);
    const [activeRole, setActiveRole] = useState<Role | null>(null);

    const handleOpenForm = (role?: Role) => {
        setActiveRole(role || null);
        setIsFormOpen(true);
    };

    const handleOpenPermissions = (role: Role) => {
        setActiveRole(role);
        setIsPermissionsOpen(true);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 h-full flex flex-col">
            <div className="flex justify-between items-center mb-6 shrink-0 bg-white/60 backdrop-blur-md p-6 rounded-2xl border border-white/40 shadow-sm">
                <div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                        Roles y Permisos
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">Configura niveles de acceso y permisos para tus usuarios.</p>
                </div>
                <button
                    onClick={() => handleOpenForm()}
                    className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all hover:shadow-lg hover:-translate-y-0.5"
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Crear Rol
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockRoles.map((role) => (
                    <div key={role.id} className="bg-white rounded-2xl border border-slate-200/60 p-6 shadow-sm hover:shadow-md transition-all group flex flex-col relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                            <button onClick={() => handleOpenForm(role)} className="p-2 bg-slate-50 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="Edit Role">
                                <Edit2 className="h-4 w-4" />
                            </button>
                            <button className="p-2 bg-slate-50 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" title="Delete Role">
                                <Trash2 className="h-4 w-4" />
                            </button>
                        </div>

                        <div className="flex items-center mb-4 mt-2">
                            <div className="p-3 bg-indigo-50 rounded-xl border border-indigo-100 mr-4">
                                <Shield className="h-6 w-6 text-indigo-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-800">{role.name}</h3>
                                <div className="flex items-center text-xs font-medium text-slate-500 mt-1">
                                    <Users className="h-3 w-3 mr-1" />
                                    {role.userCount} usuarios asignados
                                </div>
                            </div>
                        </div>

                        <p className="text-sm text-slate-600 leading-relaxed mb-6 flex-1">
                            {role.description}
                        </p>

                        <button
                            onClick={() => handleOpenPermissions(role)}
                            className="w-full py-2.5 mt-auto rounded-xl border border-slate-200 bg-slate-50 text-sm font-semibold text-slate-700 hover:bg-slate-100 hover:text-indigo-700 hover:border-indigo-200 transition-colors"
                        >
                            Gestionar Permisos
                        </button>
                    </div>
                ))}
            </div>

            {/* Role Form Modal (Create/Edit) */}
            <Modal
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                title={activeRole ? "Editar Rol" : "Crear Nuevo Rol"}
            >
                <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); setIsFormOpen(false); }}>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Nombre del Rol</label>
                        <input
                            type="text"
                            required
                            defaultValue={activeRole?.name}
                            className="block w-full rounded-xl border-slate-200 bg-slate-50/50 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-3 border transition-colors hover:bg-slate-50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Descripción</label>
                        <textarea
                            required
                            rows={3}
                            defaultValue={activeRole?.description}
                            className="block w-full rounded-xl border-slate-200 bg-slate-50/50 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-3 border transition-colors hover:bg-slate-50"
                        />
                    </div>
                    <div className="flex justify-end gap-3 pt-6 border-t border-slate-100 mt-6">
                        <button type="button" onClick={() => setIsFormOpen(false)} className="rounded-xl border border-slate-300 bg-white py-2.5 px-6 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 transition-colors">
                            Cancelar
                        </button>
                        <button type="submit" className="inline-flex justify-center rounded-xl bg-indigo-600 py-2.5 px-6 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 transition-all">
                            Guardar Rol
                        </button>
                    </div>
                </form>
            </Modal>

            {/* Manage Permissions Modal */}
            <Modal
                isOpen={isPermissionsOpen}
                onClose={() => setIsPermissionsOpen(false)}
                title={`Permisos: ${activeRole?.name}`}
                maxWidth="max-w-2xl"
            >
                <div className="space-y-6">
                    <p className="text-sm text-slate-500 bg-indigo-50 p-4 rounded-xl border border-indigo-100 flex items-start">
                        <Shield className="h-5 w-5 text-indigo-600 mr-3 shrink-0" />
                        Marca las casillas a continuación para otorgar capacidades a este rol. Los usuarios asignados a este rol heredarán todos los permisos seleccionados automáticamente.
                    </p>

                    <div className="space-y-6 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
                        {["Tickets", "System", "Reports", "Chat"].map(group => (
                            <div key={group} className="border border-slate-200 rounded-xl overflow-hidden">
                                <div className="bg-slate-50/80 px-4 py-2 border-b border-slate-200">
                                    <h4 className="font-semibold text-slate-700 text-sm tracking-wide uppercase">{group}</h4>
                                </div>
                                <div className="divide-y divide-slate-100">
                                    {availablePermissions.filter(p => p.group === group).map(perm => (
                                        <div key={perm.id} className="flex items-center px-4 py-3 hover:bg-slate-50 transition-colors">
                                            <input
                                                id={perm.id}
                                                type="checkbox"
                                                defaultChecked={activeRole?.id === "1" || Math.random() > 0.5} // mock check
                                                className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-600 cursor-pointer"
                                            />
                                            <div className="ml-3 flex flex-col">
                                                <label htmlFor={perm.id} className="text-sm font-medium text-slate-800 cursor-pointer">{perm.name}</label>
                                                <span className="text-xs text-slate-400">{perm.id}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
                        <button onClick={() => setIsPermissionsOpen(false)} className="rounded-xl border border-slate-300 bg-white py-2.5 px-6 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 transition-colors">
                            Cancelar
                        </button>
                        <button onClick={() => setIsPermissionsOpen(false)} className="inline-flex items-center justify-center rounded-xl bg-indigo-600 py-2.5 px-6 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 transition-all">
                            <Save className="h-4 w-4 mr-2" />
                            Actualizar Permisos
                        </button>
                    </div>
                </div>
            </Modal>

        </div>
    );
}
