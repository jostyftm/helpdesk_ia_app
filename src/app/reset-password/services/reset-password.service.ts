import { httpRequest } from "@/lib/request";

export const resetPassword = async (data: any): Promise<any> => {
    return await httpRequest({
        url: "/api/v1/auth/reset-password",
        method: "POST",
        data
    });
};
