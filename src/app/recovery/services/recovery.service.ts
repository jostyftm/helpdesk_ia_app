import { httpRequest } from "@/lib/request";

export const forgotPassword = async (data: { email: string }): Promise<any> => {
    return await httpRequest({
        url: "/api/v1/auth/forgot-password",
        method: "POST",
        data
    });
};
