import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resolveTicket } from "../services/ticket.service";

// Zod validation requiring a description of at least 10 chars (assuming a meaningful resolution)
const resolveSchema = z.object({
    description: z.string().min(10, "La resolución debe tener al menos 10 caracteres").nonempty("La resolución es obligatoria")
});

export type ResolveTicketFormData = z.infer<typeof resolveSchema>;

export const useResolveTicket = (ticketId: string, onSuccess: () => void) => {
    const [globalError, setGlobalError] = useState<string | null>(null);

    const form = useForm<ResolveTicketFormData>({
        resolver: zodResolver(resolveSchema),
        defaultValues: {
            description: ""
        }
    });

    const onSubmit = async (data: ResolveTicketFormData) => {
        setGlobalError(null);
        try {
            // Some WYSIWYG editors leave '<p><br></p>' when empty, stripping it conceptually or letting backend handle it.
            if (data.description === '<p><br></p>' || data.description.trim() === '') {
                form.setError("description", { type: "manual", message: "La resolución no puede estar vacía." });
                return;
            }

            await resolveTicket(ticketId, data);
            form.reset(); // Clear the form on success
            onSuccess();
        } catch (error: any) {
            console.error("Error resolving ticket:", error);
            const status = error.response?.status;
            const dataResponse = error.response?.data;

            if (status === 422 && dataResponse?.errors) {
                Object.keys(dataResponse.errors).forEach((key) => {
                    form.setError(key as keyof ResolveTicketFormData, {
                        type: "server",
                        message: dataResponse.errors[key][0],
                    });
                });
                if (dataResponse.message) {
                    setGlobalError(dataResponse.message);
                }
            } else if (status === 403) {
                setGlobalError("No tienes permisos para resolver este ticket (403).");
            } else {
                setGlobalError(dataResponse?.message || "Ocurrió un error inesperado al enviar la resolución.");
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
