import { useState, useEffect } from "react";
import { 
    getTicketCategories, 
    getTicketPriorities, 
    getTicketSources, 
    getTicketStates, 
    getTicketAgents 
} from "../services/ticket.service";
import { TicketCategory, TicketPriority, TicketSource, TicketState, TicketAgent } from "../types";

export const useTicketAttributes = () => {
    const [categories, setCategories] = useState<TicketCategory[]>([]);
    const [priorities, setPriorities] = useState<TicketPriority[]>([]);
    const [states, setStates] = useState<TicketState[]>([]);
    const [sources, setSources] = useState<TicketSource[]>([]);
    const [agents, setAgents] = useState<TicketAgent[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAll = async () => {
            setIsLoading(true);
            try {
                // Execute sequentially or Promise.all. Promise.all is faster.
                const [cats, priors, stts, srcs, agts] = await Promise.all([
                    getTicketCategories().catch(() => ({ data: [] })),
                    getTicketPriorities().catch(() => ({ data: [] })),
                    getTicketStates().catch(() => ({ data: [] })),
                    getTicketSources().catch(() => ({ data: [] })),
                    getTicketAgents().catch(() => ({ data: [] }))
                ]);
                
                setCategories(cats?.data || []);
                setPriorities(priors?.data || []);
                setStates(stts?.data || []);
                setSources(srcs?.data || []);
                setAgents(agts?.data || []);
            } catch (error) {
                console.error("Failed to fetch ticket dictionaries", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAll();
    }, []);

    return {
        categories,
        priorities,
        states,
        sources,
        agents,
        isLoading
    };
};
