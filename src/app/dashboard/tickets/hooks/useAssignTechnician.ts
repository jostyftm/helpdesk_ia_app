import { useState, useEffect } from "react";
import { z } from "zod";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { assignTechnicianToTicket, getTechnicianRoles, getTicketAgents } from "../services/ticket.service";
import { TicketAgent } from "../types";

export const assignTechnicianSchema = z.object({
    technicians: z.array(z.object({
        id: z.number().min(1, "Debes seleccionar un técnico"),
        role_id: z.number().min(1, "Debes seleccionar un rol"),
        is_existing: z.boolean().optional() // For UI tracking
    })).min(1, "Debe haber al menos un técnico asignado")
});

export type AssignTechnicianFormData = z.infer<typeof assignTechnicianSchema>;

export const useAssignTechnician = (ticketId: string, onSuccess: () => void, currentTechnicians: { id: number, role_id: number }[]) => {
    const [globalError, setGlobalError] = useState<string | null>(null);
    const [roles, setRoles] = useState<any[]>([]);
    const [agents, setAgents] = useState<TicketAgent[]>([]);
    const [isLoadingData, setIsLoadingData] = useState(true);

    const form = useForm<AssignTechnicianFormData>({
        resolver: zodResolver(assignTechnicianSchema),
        defaultValues: {
            technicians: currentTechnicians.length > 0 
                ? currentTechnicians.map(ct => ({ ...ct, is_existing: true })) 
                : [{ id: 0, role_id: 0, is_existing: false }]
        }
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "technicians"
    });

    useEffect(() => {
        let isMounted = true;
        const fetchData = async () => {
            try {
                setIsLoadingData(true);
                const [rolesRes, agentsRes] = await Promise.all([
                    getTechnicianRoles(),
                    getTicketAgents()
                ]);
                if (isMounted) {
                    setRoles(rolesRes.data);
                    setAgents(agentsRes.data);
                }
            } catch (err) {
                console.error("Error fetching dependencies for assignment", err);
            } finally {
                if (isMounted) setIsLoadingData(false);
            }
        };
        fetchData();
        return () => { isMounted = false; };
    }, []);

    const onSubmit = async (data: AssignTechnicianFormData) => {
        setGlobalError(null);
        try {
            // Strip out is_existing before sending to backend
            const payload = {
                technicians: data.technicians.map(t => ({ id: t.id, role_id: t.role_id }))
            };
            await assignTechnicianToTicket(ticketId, payload);
            onSuccess();
        } catch (error: any) {
            console.error("Error updating technicians:", error);
            const status = error.response?.status;
            const dataResponse = error.response?.data;

            if (status === 422 && dataResponse?.errors) {
                // For nested array errors in Laravel, it might come as "technicians.0.id"
                Object.keys(dataResponse.errors).forEach((key) => {
                    form.setError(key as any, {
                        type: "server",
                        message: dataResponse.errors[key][0],
                    });
                });
                if (dataResponse.message) {
                    setGlobalError(dataResponse.message);
                }
            } else if (status === 403) {
                setGlobalError("No tienes permisos para asignar técnicos (403).");
            } else {
                setGlobalError(dataResponse?.message || "Ocurrió un error inesperado.");
            }
        }
    };

    return {
        form,
        fields,
        append,
        remove,
        roles,
        agents,
        isLoadingData,
        onSubmit: form.handleSubmit(onSubmit),
        isSubmitting: form.formState.isSubmitting,
        globalError
    };
};
