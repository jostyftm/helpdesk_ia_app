import { useState, useEffect, useCallback } from 'react';
import { getRoles, RoleItem } from '../services/role.service';

export const useRoles = () => {
    const [roles, setRoles] = useState<RoleItem[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isForbidden, setIsForbidden] = useState<boolean>(false);

    const fetchRoles = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        setIsForbidden(false);
        try {
            const response = await getRoles();
            setRoles(response.data);
        } catch (err: any) {
            const status = err?.response?.status;
            if (status === 406 || status === 403) {
                setIsForbidden(true);
                setError("No tienes los permisos necesarios para visualizar esta página (Requiere roles.read).");
            } else {
                setError(err?.response?.data?.message || err.message || "Error al cargar los roles.");
            }
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchRoles();
    }, [fetchRoles]);

    return {
        roles,
        isLoading,
        error,
        isForbidden,
        fetchRoles
    };
};
