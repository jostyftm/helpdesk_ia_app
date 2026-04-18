import { useState, useEffect } from "react";
import { getModulePermissions, ModulePermission } from "@/services/navigation.service";

export const useNavigation = () => {
    const [modules, setModules] = useState<ModulePermission[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;
        const fetchModules = async () => {
            try {
                setIsLoading(true);
                const response = await getModulePermissions();
                if (isMounted) {
                    setModules(response.data);
                }
            } catch (err: any) {
                console.error("Error fetching navigation modules:", err);
                if (isMounted) {
                    setError("No se pudieron cargar los módulos.");
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        fetchModules();

        return () => {
            isMounted = false;
        };
    }, []);

    return { modules, isLoading, error };
};
