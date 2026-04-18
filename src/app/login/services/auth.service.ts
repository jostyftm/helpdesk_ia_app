import { httpRequest } from "@/lib/request";

export const getCsrfCookie = async (): Promise<void> => {
    return await httpRequest({
        url: "/sanctum/csrf-cookie",
        method: "GET"
    })
}

export const login = async (credentials: any): Promise<any> => {
    return await httpRequest({
        url: "/api/v1/auth/login",
        method: "POST",
        data: credentials
    })
}

export const logout = async (): Promise<any> => {
    return await httpRequest({
        url: "/api/v1/auth/logout",
        method: "POST"
    })
}

export const checkSession = async (): Promise<any> => {
    return await httpRequest({
        url: "/api/v1/auth/check-session",
        method: "POST"
    })
}

export const getMe = async (): Promise<any> => {
    return await httpRequest({
        url: "/api/v1/auth/me",
        method: "GET"
    })
}