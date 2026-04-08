import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { getCsrfCookie } from '@/app/login/services/auth.service';
import { forgotPassword } from '../services/recovery.service';

export const recoverySchema = z.object({
    email: z.string()
        .min(1, "El correo es requerido.")
        .email("Ingrese una dirección de correo electrónico válida.")
});

export type RecoveryFormValues = z.infer<typeof recoverySchema>;

export const useRecovery = () => {
    const [globalError, setGlobalError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isSent, setIsSent] = useState<boolean>(false);

    const form = useForm<RecoveryFormValues>({
        resolver: zodResolver(recoverySchema),
        defaultValues: {
            email: '',
        }
    });

    const onSubmit = async (data: RecoveryFormValues) => {
        setIsLoading(true);
        setGlobalError('');

        try {
            await getCsrfCookie();
            await forgotPassword(data);
            setIsSent(true);
        } catch (error: any) {
            setGlobalError(
                error?.response?.data?.message || 'Ha ocurrido un error al enviar el enlace de recuperación.'
            );
        } finally {
            setIsLoading(false);
        }
    };

    const resetSentState = () => {
        setIsSent(false);
        form.reset();
    };

    return {
        form,
        isLoading,
        globalError,
        isSent,
        onSubmit: form.handleSubmit(onSubmit),
        resetSentState
    };
};
