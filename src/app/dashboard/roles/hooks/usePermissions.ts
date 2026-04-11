import { useState, useCallback, useEffect } from 'react';
import { getModulePermissions, getRolePermissions, syncRolePermissions, ModulePermissionItem, RoleItem } from '../services/role.service';

export const usePermissions = (activeRole: RoleItem | null, onSuccessCallback: () => void) => {
    const [modules, setModules] = useState<ModulePermissionItem[]>([]);
    const [selectedPermissions, setSelectedPermissions] = useState<number[]>([]);
    const [isLoadingModules, setIsLoadingModules] = useState(false);
    const [isSyncing, setIsSyncing] = useState(false);
    const [globalError, setGlobalError] = useState('');
    const [validationError, setValidationError] = useState('');

    const fetchModules = useCallback(async () => {
        setIsLoadingModules(true);
        try {
            const res = await getModulePermissions();
            setModules(res.data);
        } catch (err: any) {
            console.error('Failed to load modules:', err);
        } finally {
            setIsLoadingModules(false);
        }
    }, []);

    const loadRolePermissions = useCallback(async (roleId: number) => {
        try {
            const res = await getRolePermissions(roleId);
            setSelectedPermissions(res.data.map(p => p.id));
        } catch(err: any) {
             console.error('Failed to load role permissions:', err);
        }
    }, []);

    useEffect(() => {
        fetchModules();
    }, [fetchModules]);

    useEffect(() => {
        if (activeRole) {
            loadRolePermissions(activeRole.id);
        } else {
            setSelectedPermissions([]);
        }
        setGlobalError('');
        setValidationError('');
    }, [activeRole, loadRolePermissions]);

    const togglePermission = (permId: number) => {
        setSelectedPermissions(prev => 
            prev.includes(permId) ? prev.filter(id => id !== permId) : [...prev, permId]
        );
    };

    const syncPermissions = async () => {
        if (!activeRole) return;
        setIsSyncing(true);
        setGlobalError('');
        setValidationError('');

        try {
            await syncRolePermissions(activeRole.id, {
                permissions: selectedPermissions.map(id => ({ id }))
            });
            onSuccessCallback();
        } catch (error: any) {
            const response = error?.response;
            if (response?.status === 422 && response?.data?.errors) {
                // Laravel typically formats nested arrays: "permissions.0.id"
                const keys = Object.keys(response.data.errors);
                if (keys.length > 0) {
                    setValidationError(response.data.errors[keys[0]][0]);
                } else {
                    setValidationError('Error de validación al sincronizar los permisos.');
                }
            } else {
                setGlobalError(response?.data?.message || 'Ha ocurrido un error inesperado al guardar los permisos.');
            }
        } finally {
            setIsSyncing(false);
        }
    };

    return {
        modules,
        selectedPermissions,
        togglePermission,
        syncPermissions,
        isLoadingModules,
        isSyncing,
        globalError,
        validationError
    };
};
