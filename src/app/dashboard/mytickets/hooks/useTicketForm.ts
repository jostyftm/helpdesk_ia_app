import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { createTicket } from "../services/ticket.service";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";

// 5MB max
const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ticketSchema = z.object({
    subject: z.string().min(1, "El asunto es requerido"),
    description: z.string().min(1, "La descripción es requerida").refine(val => {
        // Strip HTML tags to see if it's actually empty
        const stripped = val.replace(/<[^>]*>?/gm, '').trim();
        return stripped.length > 0;
    }, "La descripción no puede estar vacía"),
    ticket_source_id: z.number().default(3),
    files: z.array(
        z.any().refine((file: File) => file?.size <= MAX_FILE_SIZE, `El archivo excede el tamaño máximo de 5MB`)
    ).optional().default([]),
});

export type TicketFormValues = z.infer<typeof ticketSchema>;

export const useTicketForm = () => {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [globalError, setGlobalError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const form = useForm<TicketFormValues>({
        resolver: zodResolver(ticketSchema as any),
        defaultValues: {
            subject: "",
            description: "",
            ticket_source_id: 3,
            files: []
        }
    });

    const onSubmit = async (data: TicketFormValues) => {
        setIsSubmitting(true);
        setGlobalError(null);
        setSuccessMessage(null);

        try {
            const formData = new FormData();
            formData.append("subject", data.subject);
            formData.append("description", data.description);
            formData.append("ticket_source_id", data.ticket_source_id.toString());
            
            if (data.files && data.files.length > 0) {
                data.files.forEach((file: File) => {
                    formData.append("files[]", file);
                });
            }

            await createTicket(formData);
            
            // Redirect happens after success
            router.push("/dashboard/mytickets");
            
        } catch (error: any) {
            console.error("Ticket creation error", error);
            
            if (error instanceof AxiosError && error.response?.status === 422) {
                const validationErrors = error.response.data.errors;
                if (validationErrors) {
                    Object.keys(validationErrors).forEach((key) => {
                        form.setError(key as any, {
                            type: "server",
                            message: validationErrors[key][0]
                        });
                    });
                } else {
                    setGlobalError(error.response.data.message || "Error de validación del servidor");
                }
            } else {
                setGlobalError(error.message || "Ocurrió un error inesperado al intentar crear el ticket.");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        form,
        onSubmit: form.handleSubmit(onSubmit),
        isSubmitting,
        globalError,
        successMessage
    };
};
