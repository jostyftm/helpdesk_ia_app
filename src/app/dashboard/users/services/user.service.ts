import { httpRequest } from "@/lib/request";
import { PaginatedResponse, UserItem } from "../types";

export interface CreateUserPayload {
    name: string;
    last_name: string;
    email: string;
    password?: string;
    password_confirmation?: string;
    role_id: number;
}

export interface UserQueryParams {
    page?: number;
    limit?: number;
    sort?: string;
    filter?: {
        name?: string;
        last_name?: string;
        email?: string;
        role?: string;
    };
}

export const getUsers = async (params: UserQueryParams = {}): Promise<PaginatedResponse<UserItem>> => {
    const searchParams = new URLSearchParams();
    searchParams.append("paginate", "true");
    
    if (params.page !== undefined) {
        searchParams.append("page", params.page.toString());
    }
    
    if (params.limit !== undefined) {
        searchParams.append("limit", params.limit.toString());
    }
    
    if (params.sort) {
        searchParams.append("sort", params.sort);
    }
    
    if (params.filter) {
        if (params.filter.name) {
            searchParams.append("filter[name]", params.filter.name);
        }
        if (params.filter.last_name) {
            searchParams.append("filter[last_name]", params.filter.last_name);
        }
        if (params.filter.email) {
            searchParams.append("filter[email]", params.filter.email);
        }
        if (params.filter.role) {
            searchParams.append("filter[role]", params.filter.role);
        }
    }

    const requestUrl = `/api/v1/users?${searchParams.toString()}`;

    return await httpRequest({
        url: requestUrl,
        method: "GET"
    });
};

export const createUser = async (data: CreateUserPayload): Promise<{ data: UserItem }> => {
    return await httpRequest({
        url: "/api/v1/users",
        method: "POST",
        data
    });
};

export interface UpdateUserPayload {
    name: string;
    last_name: string;
    email: string;
    role_id: number;
}

export const updateUser = async (id: number, data: UpdateUserPayload): Promise<{ data: UserItem }> => {
    return await httpRequest({
        url: `/api/v1/users/${id}`,
        method: "PUT",
        data
    });
};

export const deleteUser = async (id: number): Promise<void> => {
    return await httpRequest({
        url: `/api/v1/users/${id}`,
        method: "DELETE"
    });
};
