import { httpRequest } from "@/lib/request";

export interface ModulePermission {
    id: number;
    type: string;
    attributes: {
        name: string;
        description: string;
        icon: string;
        path: string;
        show_sidebar: boolean;
        created_at: string;
        updated_at: string;
    };
    relationships?: {
        permissions?: {
            id: number;
            type: string;
            attributes: {
                name: string;
                display_name: string;
                description: string;
                created_at: string;
                updated_at: string;
            };
        }[];
    };
}

export const getModulePermissions = async (): Promise<{ data: ModulePermission[] }> => {
    return await httpRequest({
        url: "/api/v1/module-permissions?sort=order",
        method: "GET"
    });
};
