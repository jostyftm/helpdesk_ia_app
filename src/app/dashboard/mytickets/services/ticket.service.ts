import { httpRequest } from "@/lib/request";
import { TicketCategory, TicketPriority, TicketState, TicketSource, TicketAgent, TicketPaginatedResponse, TicketItem } from "../types";

export interface TicketQueryParams {
    page?: number;
    limit?: number;
    sort?: string; // id, updated_at, created_at
    filter?: {
        id?: string;
        ticket_category_id?: string;
        description?: string;
        subject?: string;
        ticket_priority_id?: string;
        ticket_source_id?: string;
        state_id?: string;
        start_after?: string; // yyyy-mm-dd or yyyy-mm-dd,yyyy-mm-dd
        user_id?: string;
    };
}

export const getTickets = async (params: TicketQueryParams = {}): Promise<TicketPaginatedResponse> => {
    const searchParams = new URLSearchParams();
    searchParams.append("paginate", "true");
    
    if (params.page !== undefined) searchParams.append("page", params.page.toString());
    if (params.limit !== undefined) searchParams.append("limit", params.limit.toString());
    if (params.sort) searchParams.append("sort", params.sort);
    
    if (params.filter) {
        Object.entries(params.filter).forEach(([key, value]) => {
            if (value && value.trim() !== '') {
                searchParams.append(`filter[${key}]`, value);
            }
        });
    }

    return await httpRequest({
        url: `/api/v1/tickets?${searchParams.toString()}`,
        method: "GET"
    });
};

export const createTicket = async (formData: FormData): Promise<{ data: TicketItem }> => {
    return await httpRequest({
        url: "/api/v1/tickets",
        method: "POST",
        data: formData,
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
};

export const getTicketById = async (id: string): Promise<{ data: TicketItem }> => {
    return await httpRequest({
        url: `/api/v1/tickets/${id}`,
        method: "GET"
    });
};

export const updateTicketCategorization = async (id: string, payload: { ticket_category_id: number, ticket_priority_id: number }): Promise<{ message: string }> => {
    return await httpRequest({
        url: `/api/v1/tickets/${id}/categorization`,
        method: "PUT",
        data: payload
    });
};

export const assignTechnicianToTicket = async (id: string, payload: { technicians: { id: number, role_id: number }[] }): Promise<{ message: string }> => {
    return await httpRequest({
        url: `/api/v1/tickets/${id}/assign-technician`,
        method: "PUT",
        data: payload
    });
};

export const resolveTicket = async (id: string, payload: { description: string }): Promise<{ message: string }> => {
    return await httpRequest({
        url: `/api/v1/tickets/${id}/resolve`,
        method: "POST",
        data: payload
    });
};

export const getTicketCategories = async (): Promise<{ data: TicketCategory[] }> => {
    return await httpRequest({ url: "/api/v1/ticket-categories", method: "GET" });
};

export const getTicketPriorities = async (): Promise<{ data: TicketPriority[] }> => {
    return await httpRequest({ url: "/api/v1/ticket-priorities", method: "GET" });
};

export const getTicketStates = async (): Promise<{ data: TicketState[] }> => {
    return await httpRequest({ url: "/api/v1/ticket-states", method: "GET" });
};

export const getTicketSources = async (): Promise<{ data: TicketSource[] }> => {
    return await httpRequest({ url: "/api/v1/ticket-sources", method: "GET" });
};

// Assuming Role comes from our types, or we can just define a lightweight type here
export const getTechnicianRoles = async (): Promise<{ data: any[] }> => {
    return await httpRequest({ url: "/api/v1/ticket-user-roles?filter[name]=technician", method: "GET" });
};

export const getTicketAgents = async (): Promise<{ data: TicketAgent[] }> => {
    return await httpRequest({ url: "/api/v1/users?filter[role_id]=3", method: "GET" });
};
