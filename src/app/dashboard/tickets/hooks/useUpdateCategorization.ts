import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateTicketCategorization } from "../services/ticket.service";

const categorizationSchema = z.object({
    ticket_category_id: z.number().min(1, "Selecciona una categoría válida"),
    ticket_priority_id: z.number().min(1, "Selecciona una prioridad válida"),
});

export type CategorizationFormData = z.infer<typeof categorizationSchema>;

export const useUpdateCategorization = (ticketId: string, onSuccess: () => void) => {
    const [globalError, setGlobalError] = useState<string | null>(null);

    const form = useForm<CategorizationFormData>({
        resolver: zodResolver(categorizationSchema),
        defaultValues: {
            ticket_category_id: 0,
            ticket_priority_id: 0,
        }
    });

    const onSubmit = async (data: CategorizationFormData) => {
        setGlobalError(null);
        try {
            await updateTicketCategorization(ticketId, data);
            onSuccess();
        } catch (error: any) {
            console.error("Error updating categorization:", error);
            const status = error.response?.status;
            const dataResponse = error.response?.data;

            if (status === 422 && dataResponse?.errors) {
                // Map validation errors back to react-hook-form
                Object.keys(dataResponse.errors).forEach((key) => {
                    form.setError(key as keyof CategorizationFormData, {
                        type: "server",
                        message: dataResponse.errors[key][0],
                    });
                });
                if (dataResponse.message) {
                    setGlobalError(dataResponse.message);
                }
            } else if (status === 403) {
                setGlobalError("No tienes permisos para actualizar este ticket (403).");
            } else {
                setGlobalError(dataResponse?.message || "Ocurrió un error inesperado al actualizar.");
            }
        }
    };

    return {
        form,
        onSubmit: form.handleSubmit(onSubmit),
        isSubmitting: form.formState.isSubmitting,
        globalError
    };
};
