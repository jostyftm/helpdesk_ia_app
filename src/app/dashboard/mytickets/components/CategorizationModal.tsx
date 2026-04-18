import { useState, useEffect } from "react";
import { X, Loader2, AlertCircle } from "lucide-react";
import { useUpdateCategorization } from "../hooks/useUpdateCategorization";
import { useTicketAttributes } from "../hooks/useTicketAttributes";
import { TicketItem } from "../types";

interface CategorizationModalProps {
    isOpen: boolean;
    onClose: () => void;
    ticketId: string;
    currentCategory?: number;
    currentPriority?: number;
    onSuccess: () => void;
}

export function CategorizationModal({ isOpen, onClose, ticketId, currentCategory, currentPriority, onSuccess }: CategorizationModalProps) {
    const { priorities, categories, isLoading: isLoadingAttributes } = useTicketAttributes();
    
    const handleSuccess = () => {
        onSuccess();
        onClose();
    };

    const { form, onSubmit, isSubmitting, globalError } = useUpdateCategorization(ticketId, handleSuccess);

    // Initialize form with current values when modal opens
    useEffect(() => {
        if (isOpen) {
            form.reset({
                ticket_category_id: currentCategory || 0,
                ticket_priority_id: currentPriority || 0,
            });
        }
    }, [isOpen, currentCategory, currentPriority, form]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md border border-slate-200 overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                    <h2 className="text-lg font-bold text-slate-800">Actualizar Categorización</h2>
                    <button 
                        onClick={onClose}
                        className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6">
                    {globalError && (
                        <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-xl flex gap-3 text-rose-600">
                            <AlertCircle className="w-5 h-5 shrink-0" />
                            <p className="text-sm font-medium">{globalError}</p>
                        </div>
                    )}

                    <form onSubmit={onSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700">Prioridad</label>
                            <select
                                {...form.register("ticket_priority_id", { valueAsNumber: true })}
                                disabled={isLoadingAttributes || isSubmitting}
                                className={`w-full px-4 py-2.5 rounded-xl border bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm shadow-sm ${
                                    form.formState.errors.ticket_priority_id ? "border-rose-300 focus:ring-rose-200" : "border-slate-200"
                                }`}
                            >
                                <option value={0} disabled>Selecciona una prioridad...</option>
                                {priorities.map((priority) => (
                                    <option key={priority.id} value={priority.id}>
                                        {priority.attributes.name}
                                    </option>
                                ))}
                            </select>
                            {form.formState.errors.ticket_priority_id && (
                                <p className="text-xs font-medium text-rose-500">{form.formState.errors.ticket_priority_id.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700">Categoría</label>
                            <select
                                {...form.register("ticket_category_id", { valueAsNumber: true })}
                                disabled={isLoadingAttributes || isSubmitting}
                                className={`w-full px-4 py-2.5 rounded-xl border bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm shadow-sm ${
                                    form.formState.errors.ticket_category_id ? "border-rose-300 focus:ring-rose-200" : "border-slate-200"
                                }`}
                            >
                                <option value={0} disabled>Selecciona una categoría...</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.attributes.name}
                                    </option>
                                ))}
                            </select>
                            {form.formState.errors.ticket_category_id && (
                                <p className="text-xs font-medium text-rose-500">{form.formState.errors.ticket_category_id.message}</p>
                            )}
                        </div>

                        <div className="pt-4 flex gap-3">
                            <button
                                type="button"
                                onClick={onClose}
                                disabled={isSubmitting}
                                className="flex-1 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 font-medium rounded-xl hover:bg-slate-50 transition-colors shadow-sm disabled:opacity-50"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting || isLoadingAttributes}
                                className="flex-1 px-4 py-2.5 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition-colors shadow-sm disabled:opacity-70 flex justify-center items-center"
                            >
                                {isSubmitting ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    "Actualizar"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
