import { PaginatedResponse } from "../../users/types"; // Re-using generic paginated mapping

export interface TicketCategory {
    id: number;
    type: "ticket_category";
    attributes: {
        name: string;
        created_at: string;
        updated_at: string;
    };
}

export interface TicketPriority {
    id: number;
    type: "ticket_priority";
    attributes: {
        name: string;
        weight: number;
        text_color: string;
        bg_color: string;
        created_at: string;
        updated_at: string;
    };
}

export interface TicketState {
    id: number;
    type: "ticket-states";
    attributes: {
        name: string;
        display_name: string;
        pause_sla: boolean;
        text_color: string;
        bg_color: string;
        created_at: string;
        updated_at: string;
    };
}

export interface TicketSource {
    id: number;
    type: "ticket_source";
    attributes: {
        name: string;
        icon: string;
        created_at: string;
        updated_at: string;
    };
}

export interface TicketAgent {
    id: number;
    type: "users";
    attributes: {
        name: string;
        last_name: string;
        email: string;
        is_active: boolean;
        created_at: string;
        updated_at: string;
    };
}

export interface Role {
    id: number;
    type: "role";
    attributes: {
        name: string;
        description: string;
        total_user: number;
        created_at: string;
        updated_at: string;
    };
}

export interface TicketUser {
    id: number;
    type: "ticket_user";
    attributes: {
        created_at: string;
        updated_at: string;
    };
    relationships: {
        user: TicketAgent;
        role: Role;
    };
}

export interface TicketResolution {
    id: number;
    type: string;
    attributes: {
        description: string;
        created_at: string;
        updated_at: string;
    };
}

export interface TicketItem {
    id: string | number; // usually number, keeping string possibility just in case formatted.
    type: "ticket";
    attributes: {
        subject: string;
        description: string;
        ticket_source_id: number;
        ticket_priority_id: number;
        ticket_category_id: number;
        created_at: string;
        updated_at: string;
    };
    relationships?: {
        priority?: TicketPriority;
        category?: TicketCategory;
        source?: TicketSource;
        current_state?: TicketState;
        technician_responsible?: TicketAgent;
        ticket_users?: TicketUser[];
        resolutions?: TicketResolution[];
    };
}

export type TicketPaginatedResponse = PaginatedResponse<TicketItem>;
