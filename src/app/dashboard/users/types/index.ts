export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: "admin" | "agent" | "client";
    createdAt: string;
}

export interface UserAttribute {
    name: string;
    last_name: string;
    email: string;
    is_active: boolean;
    role?: string; // We'll keep this just in case, but rely on relationships
    created_at?: string;
}

export interface UserItem {
    id: number;
    type: string;
    attributes: UserAttribute;
    relationships?: {
        roles: Array<{
            id: number;
            type: string;
            attributes: {
                name: string;
                description: string;
                total_user: number;
                created_at: string;
                updated_at: string;
            }
        }>;
    };
}

export interface PaginatedMetaLink {
    url: string | null;
    label: string;
    active: boolean;
}

export interface PaginatedMeta {
    current_page: number;
    from: number | null;
    last_page: number;
    links: PaginatedMetaLink[];
    path: string;
    per_page: number;
    to: number | null;
    total: number;
}

export interface PaginatedResponse<T> {
    data: T[];
    links: {
        first: string;
        last: string;
        prev: string | null;
        next: string | null;
    };
    meta: PaginatedMeta;
}

export interface UserFormData {
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
    role: "admin" | "agent" | "client";
}
