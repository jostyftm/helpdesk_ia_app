import { UserFormData } from "../types";

export function UserForm({ onSubmit, onCancel, initialData }: any) {
    return (
        <form
            className="space-y-5"
            onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const data: UserFormData = {
                    firstName: (form.elements.namedItem("firstName") as HTMLInputElement).value,
                    lastName: (form.elements.namedItem("lastName") as HTMLInputElement).value,
                    email: (form.elements.namedItem("email") as HTMLInputElement).value,
                    password: (form.elements.namedItem("password") as HTMLInputElement).value || undefined,
                    role: (form.elements.namedItem("role") as HTMLSelectElement).value as any,
                };
                onSubmit(data);
            }}
        >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Nombre</label>
                    <input
                        type="text"
                        name="firstName"
                        required
                        defaultValue={initialData?.firstName}
                        className="block w-full rounded-xl border-slate-200 bg-slate-50/50 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-3 border transition-colors hover:bg-slate-50"
                        placeholder="Juan"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Apellido</label>
                    <input
                        type="text"
                        name="lastName"
                        required
                        defaultValue={initialData?.lastName}
                        className="block w-full rounded-xl border-slate-200 bg-slate-50/50 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-3 border transition-colors hover:bg-slate-50"
                        placeholder="Pérez"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Correo Electrónico</label>
                <input
                    type="email"
                    name="email"
                    required
                    defaultValue={initialData?.email}
                    className="block w-full rounded-xl border-slate-200 bg-slate-50/50 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-3 border transition-colors hover:bg-slate-50"
                    placeholder="usuario@empresa.com"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Contraseña {initialData && <span className="text-slate-400 font-normal">(Dejar en blanco para mantener la actual)</span>}</label>
                <input
                    type="password"
                    name="password"
                    required={!initialData}
                    className="block w-full rounded-xl border-slate-200 bg-slate-50/50 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-3 border transition-colors hover:bg-slate-50"
                    placeholder="••••••••"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Rol del Sistema</label>
                <select
                    name="role"
                    defaultValue={initialData?.role || "client"}
                    className="block w-full rounded-xl border-slate-200 bg-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-3 border transition-colors"
                >
                    <option value="admin">Administrador - Acceso Total</option>
                    <option value="agent">Agente - Manejar Casos</option>
                    <option value="client">Cliente - Solo Lectura/Crear Casos</option>
                </select>
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t border-slate-100 mt-6">
                <button
                    type="button"
                    onClick={onCancel}
                    className="rounded-xl border border-slate-300 bg-white py-2.5 px-6 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    className="inline-flex justify-center rounded-xl border border-transparent bg-indigo-600 py-2.5 px-6 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:shadow-md transition-all"
                >
                    {initialData ? "Actualizar Usuario" : "Crear Usuario"}
                </button>
            </div>
        </form>
    );
}
