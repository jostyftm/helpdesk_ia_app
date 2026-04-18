import { useEffect } from "react";
import { X, Loader2, AlertCircle, Plus, Trash2 } from "lucide-react";
import { useAssignTechnician } from "../hooks/useAssignTechnician";

interface AssignTechnicianModalProps {
    isOpen: boolean;
    onClose: () => void;
    ticketId: string;
    currentTechnicians: { id: number, role_id: number }[];
    onSuccess: () => void;
}

export function AssignTechnicianModal({ isOpen, onClose, ticketId, currentTechnicians, onSuccess }: AssignTechnicianModalProps) {
    const handleSuccess = () => {
        onSuccess();
        onClose();
    };

    const { 
        form, 
        fields, 
        append, 
        remove, 
        roles, 
        agents, 
        isLoadingData, 
        onSubmit, 
        isSubmitting, 
        globalError 
    } = useAssignTechnician(ticketId, handleSuccess, currentTechnicians);

    // Reset the form when opened to sync with potential new currentTechnicians
    useEffect(() => {
        if (isOpen) {
            form.reset({
                technicians: currentTechnicians.length > 0 
                    ? currentTechnicians.map(ct => ({ ...ct, is_existing: true })) 
                    : [{ id: 0, role_id: 0, is_existing: false }]
            });
        }
    }, [isOpen, currentTechnicians, form]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl border border-slate-200 overflow-hidden flex flex-col animate-in zoom-in-95 duration-200 max-h-[90vh]">
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                    <h2 className="text-lg font-bold text-slate-800">Técnicos Asignados</h2>
                    <button 
                        onClick={onClose}
                        className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6 overflow-y-auto">
                    {globalError && (
                        <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-xl flex gap-3 text-rose-600">
                            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                            <p className="text-sm font-medium">{globalError}</p>
                        </div>
                    )}

                    {isLoadingData ? (
                        <div className="flex flex-col items-center justify-center py-12 text-slate-500">
                            <Loader2 className="w-8 h-8 animate-spin text-indigo-500 mb-4" />
                            <p className="text-sm">Cargando roles y técnicos...</p>
                        </div>
                    ) : (
                        <form id="assign-tech-form" onSubmit={onSubmit} className="space-y-6">
                            <div className="space-y-4">
                                {fields.map((field, index) => {
                                    const isExisting = field.is_existing;
                                    const selectClass = isExisting 
                                        ? "w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 opacity-70 pointer-events-none text-sm" 
                                        : "w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm transition-all";

                                    return (
                                        <div key={field.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 bg-slate-50/50 border border-slate-100 rounded-xl relative group">
                                            <div className="flex-1 w-full space-y-1.5">
                                                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Técnico</label>
                                                <select
                                                    {...form.register(`technicians.${index}.id`, { valueAsNumber: true })}
                                                    className={selectClass}
                                                    disabled={isSubmitting}
                                                >
                                                    <option value={0} disabled>Selecciona...</option>
                                                    {agents.map(agent => (
                                                        <option key={agent.id} value={agent.id}>
                                                            {agent.attributes.name} {agent.attributes.last_name || ''}
                                                        </option>
                                                    ))}
                                                </select>
                                                {form.formState.errors.technicians?.[index]?.id && (
                                                    <p className="text-xs font-medium text-rose-500 mt-1">
                                                        {form.formState.errors.technicians[index]?.id?.message}
                                                    </p>
                                                )}
                                            </div>

                                            <div className="flex-1 w-full space-y-1.5">
                                                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Rol</label>
                                                <select
                                                    {...form.register(`technicians.${index}.role_id`, { valueAsNumber: true })}
                                                    className={selectClass}
                                                    disabled={isSubmitting}
                                                >
                                                    <option value={0} disabled>Selecciona rol...</option>
                                                    {roles.map(role => (
                                                        <option key={role.id} value={role.id}>
                                                            {role.attributes.display_name || role.attributes.name.replace(/_/g, ' ')}
                                                        </option>
                                                    ))}
                                                </select>
                                                {form.formState.errors.technicians?.[index]?.role_id && (
                                                    <p className="text-xs font-medium text-rose-500 mt-1">
                                                        {form.formState.errors.technicians[index]?.role_id?.message}
                                                    </p>
                                                )}
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() => remove(index)}
                                                disabled={isSubmitting}
                                                className="mt-6 p-2.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors disabled:opacity-50"
                                                title="Eliminar técnico"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>

                            <button
                                type="button"
                                onClick={() => append({ id: 0, role_id: 0, is_existing: false })}
                                disabled={isSubmitting}
                                className="w-full py-3 border-2 border-dashed border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 rounded-xl flex items-center justify-center gap-2 font-medium text-sm transition-colors"
                            >
                                <Plus className="w-4 h-4" />
                                Añadir técnico
                            </button>
                        </form>
                    )}
                </div>

                <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isSubmitting}
                        className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 font-medium rounded-xl hover:bg-slate-50 transition-colors shadow-sm disabled:opacity-50"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        form="assign-tech-form"
                        disabled={isSubmitting || isLoadingData}
                        className="px-6 py-2.5 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition-colors shadow-sm disabled:opacity-70 flex justify-center items-center gap-2"
                    >
                        {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                        Guardar asignación
                    </button>
                </div>
            </div>
        </div>
    );
}
