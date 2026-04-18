import { useState, useEffect, useCallback } from "react";
import { getTickets, TicketQueryParams } from "../services/ticket.service";
import { TicketPaginatedResponse } from "../types";
import { useDebounce } from "../../users/hooks/useDebounce"; // Reuse debounce

export const useTickets = () => {
    const [ticketsResponse, setTicketsResponse] = useState<TicketPaginatedResponse | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [page, setPage] = useState(1);
    const [sort, setSort] = useState<string>('-created_at'); // default backend descending mostly

    const [filters, setFilters] = useState<TicketQueryParams['filter']>({
        id: '',
        subject: '',
        description: '',
        ticket_category_id: '',
        ticket_priority_id: '',
        ticket_source_id: '',
        state_id: '',
        start_after: '',
        user_id: typeof window !== 'undefined' ? (localStorage.getItem('user_id') || '1') : '1'
    });

    // Debounce textual filters
    const debouncedId = useDebounce(filters?.id || '', 500);
    const debouncedSubject = useDebounce(filters?.subject || '', 500);
    const debouncedDescription = useDebounce(filters?.description || '', 500);

    const fetchTicketsData = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const params: TicketQueryParams = {
                page,
                sort,
                filter: {
                    ...filters,
                    id: debouncedId,
                    subject: debouncedSubject,
                    description: debouncedDescription
                }
            };
            const response = await getTickets(params);
            setTicketsResponse(response);
        } catch (err: any) {
            console.error("Error fetching tickets:", err);
            setError(err.message || 'Ocurrió un error al cargar la lista de tickets');
            setTicketsResponse(null);
        } finally {
            setIsLoading(false);
        }
    }, [page, sort, debouncedId, debouncedSubject, debouncedDescription, filters?.ticket_category_id, filters?.ticket_priority_id, filters?.ticket_source_id, filters?.state_id, filters?.start_after, filters?.user_id]);

    useEffect(() => {
        fetchTicketsData();
    }, [fetchTicketsData]);

    const handleFilterChange = (key: keyof NonNullable<TicketQueryParams['filter']>, value: string) => {
        setFilters(prev => ({ ...prev, [key]: value }));
        setPage(1); 
    };

    const handleSort = (fieldKey: string) => {
        // Toggle behavior
        if (sort === fieldKey) {
            setSort(`-${fieldKey}`);
        } else {
            setSort(fieldKey);
        }
    };

    return {
        ticketsResponse,
        isLoading,
        error,
        page,
        setPage,
        sort,
        handleSort,
        filters,
        handleFilterChange,
        setFilters,
        fetchTicketsData
    };
};
