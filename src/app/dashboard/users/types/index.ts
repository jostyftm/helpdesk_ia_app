export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: "admin" | "agent" | "client";
    createdAt: string;
}

export interface UserFormData {
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
    role: "admin" | "agent" | "client";
}
