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
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        required
                        defaultValue={initialData?.firstName}
                        className="block w-full rounded-xl border-slate-200 bg-slate-50/50 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-3 border transition-colors hover:bg-slate-50"
                        placeholder="John"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        required
                        defaultValue={initialData?.lastName}
                        className="block w-full rounded-xl border-slate-200 bg-slate-50/50 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-3 border transition-colors hover:bg-slate-50"
                        placeholder="Doe"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
                <input
                    type="email"
                    name="email"
                    required
                    defaultValue={initialData?.email}
                    className="block w-full rounded-xl border-slate-200 bg-slate-50/50 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-3 border transition-colors hover:bg-slate-50"
                    placeholder="user@company.com"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Password {initialData && <span className="text-slate-400 font-normal">(Leave blank to keep current)</span>}</label>
                <input
                    type="password"
                    name="password"
                    required={!initialData}
                    className="block w-full rounded-xl border-slate-200 bg-slate-50/50 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-3 border transition-colors hover:bg-slate-50"
                    placeholder="••••••••"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">System Role</label>
                <select
                    name="role"
                    defaultValue={initialData?.role || "client"}
                    className="block w-full rounded-xl border-slate-200 bg-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-3 border transition-colors"
                >
                    <option value="admin">Administrator - Full Access</option>
                    <option value="agent">Agent - Handle Tickets</option>
                    <option value="client">Client - Read Only/Create Tickets</option>
                </select>
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t border-slate-100 mt-6">
                <button
                    type="button"
                    onClick={onCancel}
                    className="rounded-xl border border-slate-300 bg-white py-2.5 px-6 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="inline-flex justify-center rounded-xl border border-transparent bg-indigo-600 py-2.5 px-6 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:shadow-md transition-all"
                >
                    {initialData ? "Update User" : "Create User"}
                </button>
            </div>
        </form>
    );
}
