import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { getCsrfCookie } from '@/app/login/services/auth.service';
import { resetPassword } from '../services/reset-password.service';
import { useSearchParams } from 'next/navigation';

export const resetPasswordSchema = z.object({
    email: z.email("Ingrese una dirección de correo válida."),
    token: z.string().min(1, "El token es requerido."),
    password: z.string()
        .min(8, 'La contraseña debe tener al menos 8 caracteres.')
        .regex(/[A-Z]/, 'La contraseña debe contener al menos una letra mayúscula.')
        .regex(/[a-z]/, 'La contraseña debe contener al menos una letra minúscula.')
        .regex(/[0-9]/, 'La contraseña debe contener al menos un número.'),
    password_confirmation: z.string()
}).refine((data) => data.password === data.password_confirmation, {
    message: "Las contraseñas no coinciden.",
    path: ["password_confirmation"],
});

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

export const useResetPassword = () => {
    const searchParams = useSearchParams();
    const emailFromUrl = searchParams.get("email") || "";
    const tokenFromUrl = searchParams.get("token") || "";

    const [globalError, setGlobalError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);

    const form = useForm<ResetPasswordFormValues>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            email: emailFromUrl,
            token: tokenFromUrl,
            password: '',
            password_confirmation: '',
        }
    });

    // Update form values if URL params change/load late
    useEffect(() => {
        if (emailFromUrl) form.setValue('email', emailFromUrl);
        if (tokenFromUrl) form.setValue('token', tokenFromUrl);
    }, [emailFromUrl, tokenFromUrl, form]);

    const onSubmit = async (data: ResetPasswordFormValues) => {
        setIsLoading(true);
        setGlobalError('');

        try {
            await getCsrfCookie();
            await resetPassword(data);
            setIsSuccess(true);
        } catch (error: any) {
            const response = error?.response;
            if (response?.status === 422 && response?.data?.errors) {
                // Parse Laravel 422 errors and set them into React Hook Form
                const errors = response.data.errors;
                Object.keys(errors).forEach((key) => {
                    form.setError(key as keyof ResetPasswordFormValues, {
                        type: 'server',
                        message: Array.isArray(errors[key]) ? errors[key][0] : errors[key]
                    });
                });
            } else {
                setGlobalError(
                    response?.data?.message || 'Ha ocurrido un error al restablecer la contraseña. Verifica que tu enlace sea válido.'
                );
            }
        } finally {
            setIsLoading(false);
        }
    };

    return {
        form,
        isLoading,
        globalError,
        isSuccess,
        emailFromUrl,
        onSubmit: form.handleSubmit(onSubmit)
    };
};
