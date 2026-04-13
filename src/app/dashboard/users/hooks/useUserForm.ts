import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { createUser, updateUser } from '../services/user.service';
import { UserItem } from '../types';

const userSchema = z.object({
    name: z.string().min(1, "El nombre es requerido"),
    last_name: z.string().min(1, "El apellido es requerido"),
    email: z.string().email("El correo no es válido"),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres").optional().or(z.literal('')),
    password_confirmation: z.string().optional().or(z.literal('')),
    role_id: z.coerce.number().min(1, "Debe seleccionar un rol")
}).refine((data) => {
    if (data.password && data.password !== data.password_confirmation) {
        return false;
    }
    return true;
}, {
    message: "Las contraseñas no coinciden",
    path: ["password_confirmation"]
});

export type UserFormValues = z.infer<typeof userSchema>;

export const useUserForm = (onSuccess: () => void, initialData?: UserItem) => {
    const [isLoading, setIsLoading] = useState(false);
    const [globalError, setGlobalError] = useState('');

    const form = useForm<UserFormValues>({
        resolver: zodResolver(userSchema) as any,
        defaultValues: {
            name: initialData?.attributes.name || '',
            last_name: initialData?.attributes.last_name || '',
            email: initialData?.attributes.email || '',
            password: '',
            password_confirmation: '',
            role_id: initialData?.relationships?.roles?.[0]?.id || 0
        }
    });

    const onSubmit = form.handleSubmit(async (data) => {
        setIsLoading(true);
        setGlobalError('');
        try {
            if (initialData) {
                await updateUser(initialData.id, {
                    name: data.name,
                    last_name: data.last_name,
                    email: data.email,
                    role_id: data.role_id,
                });
            } else {
                await createUser({
                    name: data.name,
                    last_name: data.last_name,
                    email: data.email,
                    role_id: data.role_id,
                    password: data.password || undefined,
                    password_confirmation: data.password_confirmation || undefined,
                });
            }
            form.reset();
            onSuccess();
        } catch (error: any) {
            const response = error?.response;
            if (response?.status === 422 && response?.data?.errors) {
                // Laravel return keys mapping appropriately e.g. errors.email
                Object.keys(response.data.errors).forEach((key) => {
                    form.setError(key as any, {
                        type: 'manual',
                        message: response.data.errors[key][0]
                    });
                });
            } else {
                setGlobalError(response?.data?.message || 'Ha ocurrido un error al guardar el usuario.');
            }
        } finally {
            setIsLoading(false);
        }
    });

    return { form, isLoading, globalError, setGlobalError, onSubmit };
};
