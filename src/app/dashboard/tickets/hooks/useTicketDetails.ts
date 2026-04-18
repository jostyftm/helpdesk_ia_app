import { useState, useEffect, useCallback } from "react";
import { getTicketById } from "../services/ticket.service";
import { TicketItem, TicketUser } from "../types";

export const useTicketDetails = (id: string) => {
    const [ticket, setTicket] = useState<TicketItem | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchTicket = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await getTicketById(id);
            setTicket(response.data);
        } catch (err: any) {
            console.error("Error fetching ticket details:", err);
            setError(err.response?.data?.message || "Failed to load ticket details");
        } finally {
            setIsLoading(false);
        }
    }, [id]);

    useEffect(() => {
        if (id) {
            fetchTicket();
        }
    }, [id, fetchTicket]);

    const getRequester = (): TicketUser | null => {
        if (!ticket?.relationships?.ticket_users) return null;
        return ticket.relationships.ticket_users.find(
            (tu) => tu.relationships.role.attributes.name.toLowerCase().includes("requester")
        ) || null;
    };

    const getTechnicians = (): TicketUser[] => {
        if (!ticket?.relationships?.ticket_users) return [];
        return ticket.relationships.ticket_users.filter(
            (tu) => tu.relationships.role.attributes.name.toLowerCase().includes("technician")
        );
    };

    return {
        ticket,
        isLoading,
        error,
        refetch: fetchTicket,
        getRequester,
        getTechnicians
    };
};
