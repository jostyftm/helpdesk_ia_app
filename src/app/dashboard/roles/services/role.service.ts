import { httpRequest } from "@/lib/request";

export interface PermissionAttribute {
    name: string;
    display_name: string;
    description: string;
    created_at: string;
    updated_at: string;
}

export interface PermissionItem {
    id: number;
    type: string;
    attributes: PermissionAttribute;
}

export interface RoleAttribute {
    name: string;
    description: string;
    total_user: number;
    created_at: string;
    updated_at: string;
}

export interface RoleItem {
    id: number;
    type: string;
    attributes: RoleAttribute;
    relationships?: {
        permissions: PermissionItem[];
    };
}

export interface ModulePermissionItem {
    id: number;
    type: string;
    attributes: {
        name: string;
        description: string;
        icon: string | null;
        created_at: string;
        updated_at: string;
    };
    relationships: {
        permissions: PermissionItem[];
    };
}

export const getRoles = async (): Promise<{ data: RoleItem[] }> => {
    return await httpRequest({
        url: "/api/v1/roles",
        method: "GET"
    });
};

export const createRole = async (data: { name: string, description: string }): Promise<any> => {
    return await httpRequest({
        url: "/api/v1/roles",
        method: "POST",
        data
    });
};

export const updateRole = async (id: number | string, data: { name: string, description: string }): Promise<any> => {
    return await httpRequest({
        url: `/api/v1/roles/${id}`,
        method: "PUT",
        data
    });
};

export const deleteRole = async (id: number | string): Promise<any> => {
    return await httpRequest({
        url: `/api/v1/roles/${id}`,
        method: "DELETE"
    });
};

export const getModulePermissions = async (): Promise<{ data: ModulePermissionItem[] }> => {
    return await httpRequest({
        url: "/api/v1/module-permissions",
        method: "GET"
    });
};

export const getRolePermissions = async (roleId: number | string): Promise<{ data: PermissionItem[] }> => {
    return await httpRequest({
        url: `/api/v1/roles/${roleId}/permissions`,
        method: "GET"
    });
};

export const syncRolePermissions = async (roleId: number | string, data: { permissions: { id: number }[] }): Promise<any> => {
    return await httpRequest({
        url: `/api/v1/roles/${roleId}/sync-permissions`,
        method: "POST",
        data
    });
};
