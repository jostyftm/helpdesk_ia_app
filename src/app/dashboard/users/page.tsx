"use client";

import { useState } from "react";
import { UserForm } from "./components/UserForm";
import { UserItem } from "./types";
import { Plus, Edit2, Trash2, Filter, ShieldAlert, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, X, CheckCircle, AlertTriangle } from "lucide-react";
import { Modal } from "@/components/Modal";
import { useUsers } from "./hooks/useUsers";
import { useRoles } from "../roles/hooks/useRoles";
import { deleteUser } from "./services/user.service";

export default function UsersPage() {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<UserItem | null>(null);
    const [userToDelete, setUserToDelete] = useState<UserItem | null>(null);
    const [showFilters, setShowFilters] = useState(false);
    const [toast, setToast] = useState<{message: string; type: 'success'|'error'} | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState('');

    const { roles } = useRoles();
    const {
        usersResponse, isLoading, error, page, setPage,
        sort, handleSort, filters, handleFilterChange, fetchUsersData
    } = useUsers();

    const SortIcon = ({ field }: { field: string }) => {
        if (sort === field) return <ChevronUp className="h-4 w-4 ml-1 inline-block text-indigo-600" />;
        if (sort === `-${field}`) return <ChevronDown className="h-4 w-4 ml-1 inline-block text-indigo-600" />;
        return <ChevronUp className="h-4 w-4 ml-1 inline-block text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />;
    };

    const handleSuccessSave = () => {
        setIsFormOpen(false);
        setToast({ message: editingUser ? 'El usuario se ha actualizado exitosamente.' : 'El usuario se ha guardado exitosamente.', type: 'success' });
        fetchUsersData();
        setTimeout(() => setToast(null), 5000);
    };

    const handleDeleteUser = async () => {
        if (!userToDelete) return;
        setIsDeleting(true);
        setDeleteError('');
        try {
            await deleteUser(userToDelete.id);
            setToast({ message: 'El usuario se ha eliminado exitosamente.', type: 'success' });
            setUserToDelete(null);
            fetchUsersData();
            setTimeout(() => setToast(null), 5000);
        } catch (error: any) {
            setDeleteError(error?.response?.data?.message || error?.response?.data?.errors?.user?.[0] || 'Error al eliminar el usuario.');
        } finally {
            setIsDeleting(false);
        }
    };

    const handleCreateNew = () => {
        setEditingUser(null);
        setIsFormOpen(true);
    };

    return (
        <div className="mx-auto px-4 sm:px-6 md:px-8 py-8 h-full flex flex-col relative">
            {toast && (
                <div className={`absolute top-4 right-4 z-50 animate-in slide-in-from-top-5 fade-in duration-300 rounded-xl px-4 py-3 shadow-lg border flex items-center gap-3 ${toast.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
                    {toast.type === 'success' ? <CheckCircle className="w-5 h-5 text-emerald-500" /> : <AlertTriangle className="w-5 h-5 text-red-500" />}
                    <p className="text-sm font-medium">{toast.message}</p>
                </div>
            )}

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

            <div className="flex-1 min-h-0 bg-white shadow-sm rounded-2xl border border-slate-200/60 overflow-hidden flex flex-col">
                {/* Table Filters header */}
                <div className="p-4 border-b border-slate-200/60 bg-slate-50/50 flex items-center justify-between gap-4">
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className={`inline-flex items-center px-4 py-2.5 border shadow-sm text-sm font-medium rounded-lg transition-colors focus:outline-none ${showFilters ? 'border-indigo-200 bg-indigo-50 text-indigo-700 hover:bg-indigo-100' : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'}`}
                    >
                        <Filter className="h-4 w-4 mr-2" />
                        Filtros Avanzados
                    </button>
                </div>

                {/* Filters Collapse Area */}
                {showFilters && (
                    <div className="p-4 bg-white border-b border-slate-200/60 shadow-inner grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 animate-in slide-in-from-top-2 fade-in duration-200">
                        <div>
                            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Nombre</label>
                            <input
                                type="text"
                                value={filters.name}
                                onChange={(e) => handleFilterChange('name', e.target.value)}
                                className="block w-full text-sm rounded-lg border-slate-200 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                                placeholder="Ej. Juan..."
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Apellido</label>
                            <input
                                type="text"
                                value={filters.last_name}
                                onChange={(e) => handleFilterChange('last_name', e.target.value)}
                                className="block w-full text-sm rounded-lg border-slate-200 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                                placeholder="Ej. Pérez..."
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Correo</label>
                            <input
                                type="text"
                                value={filters.email}
                                onChange={(e) => handleFilterChange('email', e.target.value)}
                                className="block w-full text-sm rounded-lg border-slate-200 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                                placeholder="correo@..."
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Rol</label>
                            <select
                                value={filters.role}
                                onChange={(e) => handleFilterChange('role', e.target.value)}
                                className="block w-full text-sm rounded-lg border-slate-200 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500 bg-white"
                            >
                                <option value="">Todos los roles</option>
                                {roles.map(r => (
                                    <option key={r.id} value={r.attributes.name}>{r.attributes.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                )}


                <div className="flex-1 overflow-auto relative min-h-[300px]">
                    {isLoading && (
                        <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-10 flex items-center justify-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                        </div>
                    )}
                    {error && (
                        <div className="p-6 text-center text-red-600">
                            <ShieldAlert className="h-8 w-8 mx-auto mb-2 opacity-50" />
                            {error}
                        </div>
                    )}

                    {!error && (
                        <table className="min-w-full divide-y divide-slate-200 relative">
                            <thead className="bg-slate-50/80">
                                <tr>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors group" onClick={() => handleSort('name')}>
                                        Usuario <SortIcon field="name" />
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors group" onClick={() => handleSort('email')}>
                                        Contacto <SortIcon field="email" />
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors group" onClick={() => handleSort('role')}>
                                        Rol <SortIcon field="role" />
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors group" onClick={() => handleSort('created_at')}>
                                        Unido <SortIcon field="created_at" />
                                    </th>
                                    <th scope="col" className="relative px-6 py-4">
                                        <span className="sr-only">Acciones</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-slate-100">
                                {usersResponse?.data.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                                            No se encontraron usuarios coincidiendo con los filtros.
                                        </td>
                                    </tr>
                                ) : (
                                    usersResponse?.data.map((user) => (
                                        <tr key={user.id} className="hover:bg-slate-50 transition-colors group">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="h-10 w-10 flex-shrink-0">
                                                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-indigo-700 font-bold shadow-sm ring-2 ring-white">
                                                            {user.attributes.name[0]}{user.attributes.last_name?.[0]}
                                                        </div>
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-slate-900 line-clamp-1">{user.attributes.name} {user.attributes.last_name}</div>
                                                        {!user.attributes.is_active && (
                                                            <span className="text-xs text-rose-500 font-medium">Inactivo</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-slate-500">{user.attributes.email}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {
                                                    (() => {
                                                        const userRoleName = user.relationships?.roles?.[0]?.attributes?.name;
                                                        return (
                                                            <span className={`px-2.5 py-1 inline-flex text-xs font-semibold rounded-full border ${userRoleName === 'admin' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                                                                userRoleName === 'agent' ? 'bg-indigo-50 text-indigo-700 border-indigo-200' :
                                                                    'bg-slate-50 text-slate-700 border-slate-200'
                                                                }`}>
                                                                {userRoleName ? userRoleName.charAt(0).toUpperCase() + userRoleName.slice(1) : 'Sin rol'}
                                                            </span>
                                                        );
                                                    })()
                                                }
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                                                {user.attributes.created_at || 'N/A'}
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
                                    )))}
                            </tbody>
                        </table>
                    )}
                </div>

                {/* Pagination Footer */}
                {usersResponse?.meta && usersResponse.meta.last_page > 1 && (
                    <div className="bg-white px-4 py-3 border-t border-slate-200 sm:px-6 flex items-center justify-between flex-wrap gap-4 mt-auto">
                        <div className="hidden sm:block text-sm text-slate-700">
                            Mostrando <span className="font-medium">{usersResponse.meta.from || 0}</span> a <span className="font-medium">{usersResponse.meta.to || 0}</span> de <span className="font-medium">{usersResponse.meta.total}</span> usuarios
                        </div>
                        <div className="flex-1 flex justify-between sm:justify-end">
                            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                {usersResponse.meta.links.map((link, i) => {
                                    // Parse label
                                    let label: React.ReactNode = link.label;
                                    if (link.label.includes('&laquo;')) label = <ChevronLeft className="h-4 w-4" />;
                                    if (link.label.includes('&raquo;')) label = <ChevronRight className="h-4 w-4" />;

                                    // Determine if it's disabled ("...")
                                    const isDisabled = !link.url && link.label === '...';

                                    // Extract target page from URL if custom logic is needed, or just rely on Laravel's URL,
                                    // but we handle state internally so we parse URL for `page=` query parameter.
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
                                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium
                                                ${link.active ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600' :
                                                    isDisabled ? 'bg-white border-slate-300 text-slate-500 cursor-default' :
                                                        !link.url ? 'bg-slate-50 border-slate-300 text-slate-400 cursor-not-allowed opacity-50' :
                                                            'bg-white border-slate-300 text-slate-500 hover:bg-slate-50'}
                                                ${i === 0 ? 'rounded-l-md' : ''} 
                                                ${i === usersResponse.meta.links.length - 1 ? 'rounded-r-md' : ''}
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

            {/* Create / Edit User Modal */}
            <Modal
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                title={editingUser ? "Editar Perfil de Usuario" : "Crear Nuevo Usuario"}
            >
                <UserForm
                    initialData={editingUser || undefined}
                    onCancel={() => setIsFormOpen(false)}
                    onSuccess={handleSuccessSave}
                    roles={roles}
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
                        ¿Estás seguro de que quieres eliminar al usuario <strong>{userToDelete?.attributes.name} {userToDelete?.attributes.last_name}</strong>? Esta acción no se puede deshacer y revocará su acceso.
                    </p>
                    {deleteError && (
                        <div className="mt-4 p-3 bg-red-50 border border-red-100 text-red-700 rounded-lg text-sm shadow-sm">
                            {deleteError}
                        </div>
                    )}
                </div>
                <div className="flex justify-end gap-3 w-full">
                    <button
                        onClick={() => {
                            setUserToDelete(null);
                            setDeleteError('');
                        }}
                        disabled={isDeleting}
                        className="flex-1 rounded-xl border border-slate-300 bg-white py-2.5 px-4 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors disabled:opacity-50"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleDeleteUser}
                        disabled={isDeleting}
                        className="flex-1 inline-flex justify-center rounded-xl bg-rose-600 py-2.5 px-4 text-sm font-medium text-white hover:bg-rose-700 transition-colors shadow-sm disabled:opacity-50"
                    >
                        {isDeleting ? "Eliminando..." : "Sí, Eliminar Usuario"}
                    </button>
                </div>
            </Modal>
        </div>
    );
}
