import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCsrfCookie, login } from '../services/auth.service';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Define the validation schema with zod
export const loginSchema = z.object({
    email: z.email("Ingrese una dirección de correo electrónico válida."),
    password: z.string()
        .min(1, "La contraseña es requerida.")
        .min(6, 'La contraseña debe tener al menos 6 caracteres.')
});

// Define the response structure
export interface LoginResponse {
    data: {
        access_token: string;
        token_type: string;
    }
}

// Infer the TypeScript type from the schema
export type LoginFormValues = z.infer<typeof loginSchema>;

export const useLogin = () => {
    const [globalError, setGlobalError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        }
    });

    const onSubmit = async (data: LoginFormValues) => {
        setIsLoading(true);
        setGlobalError('');

        try {
            // 1. Get the CSRF Cookie from Sanctum before submitting
            await getCsrfCookie();

            // 2. Perform the actual login
            const response: LoginResponse = await login(data);

            // The Axios response wraps data. As per requirements our structure is: { "data": { "access_token": ... } }
            const payload = response.data;
            const token = payload.access_token;

            if (token) {
                localStorage.setItem('access_token', token);
                // document.cookie = `access_token=${token}; path=/; max-age=86400`;
                router.push('/dashboard/tickets');
            } else {
                setGlobalError('Missing access token in response');
            }
        } catch (error: any) {
            setGlobalError(
                error.response?.data?.message || 'Credenciales inválidas o ha ocurrido un error.'
            );
        } finally {
            setIsLoading(false);
        }
    };

    return {
        form,
        isLoading,
        globalError,
        onSubmit: form.handleSubmit(onSubmit)
    };
};
