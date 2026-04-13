import { useState, useEffect, useCallback } from 'react';
import { getUsers, UserQueryParams } from '../services/user.service';
import { PaginatedResponse, UserItem } from '../types';
import { useDebounce } from './useDebounce';

export const useUsers = () => {
    const [usersResponse, setUsersResponse] = useState<PaginatedResponse<UserItem> | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // Pagination & Sorting state
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [sort, setSort] = useState<string>('');

    // Filter state
    const [filters, setFilters] = useState({
        name: '',
        last_name: '',
        email: '',
        role: ''
    });

    const debouncedFilters = useDebounce(filters, 500);

    const fetchUsersData = useCallback(async () => {
        setIsLoading(true);
        setError('');
        try {
            const params: UserQueryParams = {
                page,
                limit,
            };
            if (sort) params.sort = sort;
            
            // Only attach filters that have a value
            const activeFilters: Record<string, string> = {};
            if (debouncedFilters.name) activeFilters.name = debouncedFilters.name;
            if (debouncedFilters.last_name) activeFilters.last_name = debouncedFilters.last_name;
            if (debouncedFilters.email) activeFilters.email = debouncedFilters.email;
            if (debouncedFilters.role) activeFilters.role = debouncedFilters.role;
            
            if (Object.keys(activeFilters).length > 0) {
                params.filter = activeFilters;
            }

            const response = await getUsers(params);
            setUsersResponse(response);
        } catch (err: any) {
            console.error(err);
            if (err?.response?.status === 406 || err?.response?.status === 403) {
                 setError("No tienes los permisos suficientes para ver el listado de usuarios.");
            } else {
                 setError(err?.response?.data?.message || 'Ha ocurrido un error cargando los usuarios.');
            }
        } finally {
            setIsLoading(false);
        }
    }, [page, limit, sort, debouncedFilters]);

    useEffect(() => {
        fetchUsersData();
    }, [fetchUsersData]);

    const handleSort = (field: string) => {
        if (sort === field) {
            setSort(`-${field}`);
        } else if (sort === `-${field}`) {
            setSort('');
        } else {
            setSort(field);
        }
    };

    const handleFilterChange = (field: string, value: string) => {
        setFilters(prev => ({ ...prev, [field]: value }));
        // Reset page to 1 when filters change
        setPage(1);
    };

    return {
        usersResponse,
        isLoading,
        error,
        page,
        setPage,
        limit,
        setLimit,
        sort,
        handleSort,
        filters,
        handleFilterChange,
        fetchUsersData
    };
};
