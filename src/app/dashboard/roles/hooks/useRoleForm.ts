import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { createRole, updateRole, RoleItem } from '../services/role.service';

export const roleSchema = z.object({
    name: z.string().min(1, "El nombre es requerido."),
    description: z.string().min(1, "La descripción es requerida.")
});

export type RoleFormValues = z.infer<typeof roleSchema>;

export const useRoleForm = (activeRole: RoleItem | null, onSuccessCallback: () => void) => {
    const [isLoading, setIsLoading] = useState(false);
    const [globalError, setGlobalError] = useState('');

    const form = useForm<RoleFormValues>({
        resolver: zodResolver(roleSchema),
        defaultValues: {
            name: '',
            description: ''
        }
    });

    const onSubmit = async (data: RoleFormValues) => {
        setIsLoading(true);
        setGlobalError('');

        try {
            if (activeRole) {
                await updateRole(activeRole.id, data);
            } else {
                await createRole(data);
            }
            form.reset();
            onSuccessCallback();
        } catch (error: any) {
            const response = error?.response;
            if (response?.status === 422 && response?.data?.errors) {
                const errors = response.data.errors;
                Object.keys(errors).forEach((key) => {
                    form.setError(key as keyof RoleFormValues, {
                        type: 'server',
                        message: Array.isArray(errors[key]) ? errors[key][0] : errors[key]
                    });
                });
            } else {
                setGlobalError(response?.data?.message || 'Error al guardar el rol. Verifica los datos e intenta nuevamente.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return {
        form,
        isLoading,
        globalError,
        setGlobalError,
        onSubmit: form.handleSubmit(onSubmit)
    };
};
