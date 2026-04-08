"use client";

import { useState } from "react";
import { UserForm } from "./components/UserForm";
import { User } from "./types";
import { Plus, Edit2, Trash2, Search, Filter, ShieldAlert } from "lucide-react";
import { Modal } from "@/components/Modal";

const mockUsers: User[] = [
    { id: "1", firstName: "Admin", lastName: "System", email: "admin@helpdesk.com", role: "admin", createdAt: "2024-01-01" },
    { id: "2", firstName: "John", lastName: "Doe", email: "john@example.com", role: "agent", createdAt: "2024-01-05" },
    { id: "3", firstName: "Alice", lastName: "Smith", email: "alice@client.com", role: "client", createdAt: "2024-02-12" },
];

export default function UsersPage() {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [userToDelete, setUserToDelete] = useState<User | null>(null);

    const handleCreateNew = () => {
        setEditingUser(null);
        setIsFormOpen(true);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 h-full flex flex-col">
            <div className="flex justify-between items-center mb-6 shrink-0 bg-white/60 backdrop-blur-md p-6 rounded-2xl border border-white/40 shadow-sm">
                <div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                        Usuarios y Agentes
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">Gestiona accesos a la plataforma, roles y preferencias.</p>
                </div>
                <button
                    onClick={handleCreateNew}
                    className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all hover:shadow-lg hover:-translate-y-0.5"
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Añadir Usuario
                </button>
            </div>

            <div className="flex-1 bg-white shadow-sm rounded-2xl border border-slate-200/60 overflow-hidden flex flex-col">
                {/* Table Filters */}
                <div className="p-4 border-b border-slate-200/60 bg-slate-50/50 flex items-center justify-between gap-4">
                    <div className="relative rounded-lg shadow-sm w-full max-w-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 text-slate-400" />
                        </div>
                        <input
                            type="text"
                            className="focus:ring-indigo-500 border focus:border-indigo-500 block w-full pl-10 sm:text-sm border-slate-200 rounded-lg py-2.5 px-3 bg-white"
                            placeholder="Buscar por nombre o correo..."
                        />
                    </div>
                    <button className="inline-flex items-center px-4 py-2.5 border border-slate-200 shadow-sm text-sm font-medium rounded-lg text-slate-700 bg-white hover:bg-slate-50 focus:outline-none transition-colors">
                        <Filter className="h-4 w-4 mr-2 text-slate-500" />
                        Filtros
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-200">
                        <thead className="bg-slate-50/80">
                            <tr>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                    Usuario
                                </th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                    Contacto
                                </th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                    Rol
                                </th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                    Unido
                                </th>
                                <th scope="col" className="relative px-6 py-4">
                                    <span className="sr-only">Acciones</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-slate-100">
                            {mockUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-slate-50 transition-colors group">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="h-10 w-10 flex-shrink-0">
                                                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-indigo-700 font-bold shadow-sm ring-2 ring-white">
                                                    {user.firstName[0]}{user.lastName[0]}
                                                </div>
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-slate-900">{user.firstName} {user.lastName}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-slate-500">{user.email}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2.5 py-1 inline-flex text-xs font-semibold rounded-full border ${user.role === 'admin' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                                            user.role === 'agent' ? 'bg-indigo-50 text-indigo-700 border-indigo-200' :
                                                'bg-slate-50 text-slate-700 border-slate-200'
                                            }`}>
                                            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                                        {user.createdAt}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => { setEditingUser(user); setIsFormOpen(true); }}
                                            className="text-indigo-600 hover:text-indigo-900 p-2 hover:bg-indigo-50 rounded-lg transition-colors mr-2"
                                            title="Edit User"
                                        >
                                            <Edit2 className="h-4 w-4" />
                                        </button>
                                        <button
                                            onClick={() => setUserToDelete(user)}
                                            className="text-rose-600 hover:text-rose-900 p-2 hover:bg-rose-50 rounded-lg transition-colors"
                                            title="Delete User"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Create / Edit User Modal */}
            <Modal
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                title={editingUser ? "Editar Perfil de Usuario" : "Crear Nuevo Usuario"}
            >
                <UserForm
                    initialData={editingUser || undefined}
                    onCancel={() => setIsFormOpen(false)}
                    onSubmit={(data: Partial<User>) => {
                        console.log("Saved", data);
                        setIsFormOpen(false);
                    }}
                />
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal
                isOpen={!!userToDelete}
                onClose={() => setUserToDelete(null)}
                title="Confirmar Eliminación"
                maxWidth="max-w-md"
            >
                <div className="pt-2 text-center text-slate-600 mb-6">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-rose-100 mb-4">
                        <ShieldAlert className="h-8 w-8 text-rose-600" aria-hidden="true" />
                    </div>
                    <p>
                        ¿Estás seguro de que quieres eliminar al usuario <strong>{userToDelete?.firstName} {userToDelete?.lastName}</strong>? Esta acción no se puede deshacer y revocará su acceso.
                    </p>
                </div>
                <div className="flex justify-end gap-3 w-full">
                    <button
                        onClick={() => setUserToDelete(null)}
                        className="flex-1 rounded-xl border border-slate-300 bg-white py-2.5 px-4 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={() => {
                            console.log("Deleted", userToDelete?.id);
                            setUserToDelete(null);
                        }}
                        className="flex-1 inline-flex justify-center rounded-xl bg-rose-600 py-2.5 px-4 text-sm font-medium text-white hover:bg-rose-700 transition-colors shadow-sm"
                    >
                        Sí, Eliminar Usuario
                    </button>
                </div>
            </Modal>
        </div>
    );
}
