"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, Shield, Users, Save, AlertTriangle, CheckCircle } from "lucide-react";
import { Modal } from "@/components/Modal";
import { useRoles } from "./hooks/useRoles";
import { RoleItem, deleteRole, PermissionItem } from "./services/role.service";
import { useRoleForm } from "./hooks/useRoleForm";
import { usePermissions } from "./hooks/usePermissions";

// Removed hardcoded availablePermissions

export default function RolesPage() {
    const { roles, isLoading, error, isForbidden, fetchRoles } = useRoles();
    const [toast, setToast] = useState<{message: string; type: 'success'|'error'} | null>(null);

    const handleSuccess = () => {
        setIsFormOpen(false);
        setToast({ message: activeRole ? 'El rol se ha actualizado exitosamente.' : 'El rol se ha guardado exitosamente.', type: 'success' });
        fetchRoles(); // Recarga la lista de roles
        setTimeout(() => setToast(null), 5000);
    }
    
    // We conditionally pass activeRole here, but we will declare it right below.
    // To fix declaration order, we'll shift handleSuccess and useRoleForm down.
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isPermissionsOpen, setIsPermissionsOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [activeRole, setActiveRole] = useState<RoleItem | null>(null);

    const { 
        modules, 
        selectedPermissions, 
        togglePermission, 
        syncPermissions, 
        isLoadingModules, 
        isSyncing, 
        globalError: syncGlobalError, 
        validationError: syncValidationError 
    } = usePermissions(isPermissionsOpen ? activeRole : null, () => {
        setIsPermissionsOpen(false);
        setToast({ message: 'Permisos sincronizados exitosamente.', type: 'success' });
        fetchRoles(); // fetch again so dashboard tiles update numbers
    });
    
    // Delete states
    const [roleToDelete, setRoleToDelete] = useState<RoleItem | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState('');


    const { form, isLoading: isSaving, globalError: saveError, setGlobalError, onSubmit } = useRoleForm(activeRole, handleSuccess);
    const { register, formState: { errors }, reset } = form;

    const handleOpenForm = (role?: RoleItem) => {
        setActiveRole(role || null);
        if (role) {
            reset({ name: role.attributes.name, description: role.attributes.description });
        } else {
            reset({ name: '', description: '' });
        }
        setGlobalError('');
        setIsFormOpen(true);
    };

    const handleOpenDelete = (role: RoleItem) => {
        setRoleToDelete(role);
        setDeleteError('');
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (!roleToDelete) return;
        setIsDeleting(true);
        setDeleteError('');
        
        try {
            await deleteRole(roleToDelete.id);
            setIsDeleteModalOpen(false);
            setToast({ message: 'El rol se ha eliminado exitosamente.', type: 'success' });
            fetchRoles();
        } catch (error: any) {
            const response = error.response;
            if (response?.status === 422 && response?.data?.errors?.role) {
                setDeleteError(response.data.errors.role[0]);
            } else {
                setDeleteError(response?.data?.message || 'Ha ocurrido un error al eliminar el rol.');
            }
        } finally {
            setIsDeleting(false);
        }
    };

    const handleOpenPermissions = (role: RoleItem) => {
        setActiveRole(role);
        setIsPermissionsOpen(true);
    };

    if (isLoading) {
        return (
            <div className="flex h-full items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (isForbidden) {
        return (
            <div className="flex h-full items-center justify-center p-6">
                <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-rose-100 p-8 text-center animate-in fade-in zoom-in duration-300">
                    <div className="mx-auto w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mb-6">
                        <AlertTriangle className="h-8 w-8 text-rose-500" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-800 mb-2">Acceso Denegado</h2>
                    <p className="text-slate-600 text-sm">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 h-full flex flex-col relative">
            {toast && (
                <div className={`absolute top-4 right-4 z-50 animate-in slide-in-from-top-5 fade-in duration-300 rounded-xl px-4 py-3 shadow-lg border flex items-center gap-3 ${toast.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
                    {toast.type === 'success' ? <CheckCircle className="w-5 h-5 text-emerald-500" /> : <AlertTriangle className="w-5 h-5 text-red-500" />}
                    <p className="text-sm font-medium">{toast.message}</p>
                </div>
            )}

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

            {error && !isForbidden && (
                <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl border border-red-100">
                    <p className="text-sm">{error}</p>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {roles.length === 0 && !error && (
                    <div className="col-span-full py-12 text-center bg-white rounded-2xl border border-slate-200/60 border-dashed">
                        <Shield className="mx-auto h-12 w-12 text-slate-300 mb-3" />
                        <h3 className="text-sm font-medium text-slate-900">No hay roles definidos</h3>
                        <p className="mt-1 text-sm text-slate-500">Crea el primer rol para comenzar a gestionar el acceso.</p>
                    </div>
                )}
                {roles.map((role) => (
                    <div key={role.id} className="bg-white rounded-2xl border border-slate-200/60 p-6 shadow-sm hover:shadow-md transition-all group flex flex-col relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                            <button onClick={() => handleOpenForm(role)} className="p-2 bg-slate-50 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="Edit Role">
                                <Edit2 className="h-4 w-4" />
                            </button>
                            <button onClick={() => handleOpenDelete(role)} className="p-2 bg-slate-50 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" title="Delete Role">
                                <Trash2 className="h-4 w-4" />
                            </button>
                        </div>

                        <div className="flex items-center mb-4 mt-2">
                            <div className="p-3 bg-indigo-50 rounded-xl border border-indigo-100 mr-4">
                                <Shield className="h-6 w-6 text-indigo-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-800">{role.attributes.name}</h3>
                                <div className="flex items-center text-xs font-medium text-slate-500 mt-1">
                                    <Users className="h-3 w-3 mr-1" />
                                    {role.attributes.total_user || 0} usuarios asignados
                                </div>
                            </div>
                        </div>

                        <p className="text-sm text-slate-600 leading-relaxed mb-6 flex-1">
                            {role.attributes.description}
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
                <form className="space-y-5" onSubmit={onSubmit}>
                    {saveError && (
                        <div className="p-3 bg-red-50 rounded-lg border border-red-100">
                            <p className="text-sm text-red-600">{saveError}</p>
                        </div>
                    )}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Nombre del Rol</label>
                        <input
                            type="text"
                            {...register("name")}
                            className={`block w-full rounded-xl bg-slate-50/50 shadow-sm sm:text-sm px-4 py-3 border transition-colors hover:bg-slate-50 focus:outline-none ${errors.name ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 focus:ring-1'}`}
                        />
                        {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Descripción</label>
                        <textarea
                            rows={3}
                            {...register("description")}
                            className={`block w-full rounded-xl bg-slate-50/50 shadow-sm sm:text-sm px-4 py-3 border transition-colors hover:bg-slate-50 focus:outline-none ${errors.description ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 focus:ring-1'}`}
                        />
                        {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>}
                    </div>
                    <div className="flex justify-end gap-3 pt-6 border-t border-slate-100 mt-6">
                        <button type="button" disabled={isSaving} onClick={() => setIsFormOpen(false)} className="rounded-xl border border-slate-300 bg-white py-2.5 px-6 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 transition-colors disabled:opacity-50">
                            Cancelar
                        </button>
                        <button type="submit" disabled={isSaving} className="inline-flex justify-center flex-1 sm:flex-none items-center rounded-xl bg-indigo-600 py-2.5 px-6 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 transition-all disabled:opacity-50">
                            {isSaving ? "Guardando..." : "Guardar Rol"}
                        </button>
                    </div>
                </form>
            </Modal>

            {/* Manage Permissions Modal */}
            <Modal
                isOpen={isPermissionsOpen}
                onClose={() => !isSyncing && setIsPermissionsOpen(false)}
                title={`Permisos: ${activeRole?.attributes.name}`}
                maxWidth="max-w-2xl"
            >
                <div className="space-y-6">
                    <p className="text-sm text-slate-500 bg-indigo-50 p-4 rounded-xl border border-indigo-100 flex items-start">
                        <Shield className="h-5 w-5 text-indigo-600 mr-3 shrink-0" />
                        Marca las casillas a continuación para otorgar capacidades a este rol. Los usuarios asignados a este rol heredarán todos los permisos seleccionados automáticamente.
                    </p>

                    {syncGlobalError && (
                        <div className="p-3 bg-red-50 rounded-lg border border-red-100 text-sm text-red-600">
                            {syncGlobalError}
                        </div>
                    )}
                    
                    {syncValidationError && (
                        <div className="p-3 bg-red-50 rounded-lg border border-red-100 flex gap-2 items-center text-sm text-red-600">
                            <AlertTriangle className="h-4 w-4 shrink-0" />
                            {syncValidationError}
                        </div>
                    )}

                    <div className="space-y-6 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
                        {isLoadingModules ? (
                            <div className="flex justify-center p-8">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                            </div>
                        ) : (
                            modules.map(module => (
                                <div key={module.id} className="border border-slate-200 rounded-xl overflow-hidden">
                                    <div className="bg-slate-50/80 px-4 py-2 border-b border-slate-200 flex items-center">
                                        <h4 className="font-semibold text-slate-700 text-sm tracking-wide uppercase">{module.attributes.name}</h4>
                                    </div>
                                    <div className="divide-y divide-slate-100">
                                        {module.relationships?.permissions?.map((perm: PermissionItem) => (
                                            <div key={perm.id} className="flex items-center px-4 py-3 hover:bg-slate-50 transition-colors">
                                                <input
                                                    id={`perm-${perm.id}`}
                                                    type="checkbox"
                                                    checked={selectedPermissions.includes(perm.id)}
                                                    onChange={() => togglePermission(perm.id)}
                                                    className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-600 cursor-pointer"
                                                />
                                                <div className="ml-3 flex flex-col">
                                                    <label htmlFor={`perm-${perm.id}`} className="text-sm font-medium text-slate-800 cursor-pointer">
                                                        {perm.attributes.display_name}
                                                    </label>
                                                    <span className="text-xs text-slate-400">{perm.attributes.name}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="flex justify-end gap-3 pt-6 border-t border-slate-100 mt-6">
                        <button type="button" disabled={isSyncing} onClick={() => setIsPermissionsOpen(false)} className="rounded-xl border border-slate-300 bg-white py-2.5 px-6 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 transition-colors disabled:opacity-50">
                            Cancelar
                        </button>
                        <button type="button" onClick={syncPermissions} disabled={isSyncing} className="inline-flex items-center justify-center rounded-xl bg-indigo-600 py-2.5 px-6 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 transition-all disabled:opacity-50">
                            {isSyncing && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>}
                            {!isSyncing && <Save className="h-4 w-4 mr-2" />}
                            {isSyncing ? "Guardando..." : "Actualizar Permisos"}
                        </button>
                    </div>
                </div>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal
                isOpen={isDeleteModalOpen}
                onClose={() => !isDeleting && setIsDeleteModalOpen(false)}
                title="Eliminar Rol"
            >
                <div className="space-y-5">
                    {deleteError && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex">
                            <div className="flex-shrink-0">
                                <AlertTriangle className="h-5 w-5 text-red-500" />
                            </div>
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-red-800">No se puede eliminar</h3>
                                <div className="mt-2 text-sm text-red-700">
                                    <p>{deleteError}</p>
                                </div>
                            </div>
                        </div>
                    )}
                    <p className="text-sm text-slate-600 pl-1">
                        ¿Estás seguro de que deseas eliminar el rol <strong className="text-slate-800">{roleToDelete?.attributes.name}</strong>? Esta acción no se puede deshacer.
                    </p>
                    <div className="flex justify-end gap-3 pt-6 border-t border-slate-100 mt-6">
                        <button type="button" disabled={isDeleting} onClick={() => setIsDeleteModalOpen(false)} className="rounded-xl border border-slate-300 bg-white py-2.5 px-6 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 transition-colors disabled:opacity-50">
                            Cancelar
                        </button>
                        <button type="button" onClick={confirmDelete} disabled={isDeleting} className="inline-flex justify-center flex-1 sm:flex-none items-center rounded-xl bg-rose-600 py-2.5 px-6 text-sm font-medium text-white shadow-sm hover:bg-rose-700 transition-all disabled:opacity-50">
                            <Trash2 className="h-4 w-4 mr-2" />
                            {isDeleting ? "Eliminando..." : "Sí, eliminar"}
                        </button>
                    </div>
                </div>
            </Modal>

        </div>
    );
}
