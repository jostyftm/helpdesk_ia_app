import { UserFormData } from "../types";

import { useUserForm } from '../hooks/useUserForm';
import { RoleItem } from '../../roles/services/role.service';
import { UserItem } from '../types';

interface UserFormProps {
    onSuccess: () => void;
    onCancel: () => void;
    roles: RoleItem[];
    initialData?: UserItem;
}

export function UserForm({ onSuccess, onCancel, roles, initialData }: UserFormProps) {
    const { form, isLoading, globalError, onSubmit } = useUserForm(onSuccess, initialData);
    const { register, formState: { errors } } = form;

    return (
        <form className="space-y-5" onSubmit={onSubmit}>
            {globalError && (
                <div className="p-3 bg-red-50 rounded-lg border border-red-100 mb-4">
                    <p className="text-sm text-red-600 font-medium">{globalError}</p>
                </div>
            )}
            
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Nombre</label>
                    <input
                        type="text"
                        {...register("name")}
                        className={`block w-full rounded-xl bg-slate-50/50 shadow-sm sm:text-sm px-4 py-3 border transition-colors hover:bg-slate-50 focus:outline-none ${errors.name ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-500'}`}
                        placeholder="Juan"
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Apellido</label>
                    <input
                        type="text"
                        {...register("last_name")}
                        className={`block w-full rounded-xl bg-slate-50/50 shadow-sm sm:text-sm px-4 py-3 border transition-colors hover:bg-slate-50 focus:outline-none ${errors.last_name ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-500'}`}
                        placeholder="Pérez"
                    />
                    {errors.last_name && <p className="mt-1 text-sm text-red-500">{errors.last_name.message}</p>}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Correo Electrónico</label>
                <input
                    type="email"
                    {...register("email")}
                    className={`block w-full rounded-xl bg-slate-50/50 shadow-sm sm:text-sm px-4 py-3 border transition-colors hover:bg-slate-50 focus:outline-none ${errors.email ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-500'}`}
                    placeholder="usuario@empresa.com"
                />
                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
            </div>

            {!initialData && (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Contraseña</label>
                        <input
                            type="password"
                            {...register("password")}
                            className={`block w-full rounded-xl bg-slate-50/50 shadow-sm sm:text-sm px-4 py-3 border transition-colors hover:bg-slate-50 focus:outline-none ${errors.password ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-500'}`}
                            placeholder="••••••••"
                        />
                        {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Confirmar Contraseña</label>
                        <input
                            type="password"
                            {...register("password_confirmation")}
                            className={`block w-full rounded-xl bg-slate-50/50 shadow-sm sm:text-sm px-4 py-3 border transition-colors hover:bg-slate-50 focus:outline-none ${errors.password_confirmation ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-500'}`}
                            placeholder="••••••••"
                        />
                        {errors.password_confirmation && <p className="mt-1 text-sm text-red-500">{errors.password_confirmation.message}</p>}
                    </div>
                </div>
            )}

            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Rol del Sistema</label>
                <select
                    {...register("role_id")}
                    className={`block w-full rounded-xl bg-white shadow-sm sm:text-sm px-4 py-3 border transition-colors focus:outline-none ${errors.role_id ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-500'}`}
                >
                    <option value={0} disabled>-- Selecciona un rol --</option>
                    {roles.map(r => (
                        <option key={r.id} value={r.id}>{r.attributes.name}</option>
                    ))}
                </select>
                {errors.role_id && <p className="mt-1 text-sm text-red-500">{errors.role_id.message}</p>}
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t border-slate-100 mt-6">
                <button
                    type="button"
                    disabled={isLoading}
                    onClick={onCancel}
                    className="rounded-xl border border-slate-300 bg-white py-2.5 px-6 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors disabled:opacity-50"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="inline-flex justify-center rounded-xl border border-transparent bg-indigo-600 py-2.5 px-6 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:shadow-md transition-all disabled:opacity-50"
                >
                    {isLoading ? "Guardando..." : initialData ? "Actualizar Usuario" : "Crear Usuario"}
                </button>
            </div>
        </form>
    );
}
