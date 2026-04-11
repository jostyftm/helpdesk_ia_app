"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { checkSession } from "@/app/login/services/auth.service";

export function SessionGuard({ children }: { children: React.ReactNode }) {
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const pathname = usePathname();

    // 15 minutes inactive threshold
    const INACTIVITY_LIMIT_MS = 20000;

    const resetTimer = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            // Trigger session verification
            // The global axios interceptor will handle the logout if the endpoint returns 401
            checkSession().catch(() => { });
        }, INACTIVITY_LIMIT_MS);
    };

    // React to route changes and initial load
    useEffect(() => {
        // Immediately validate session on route access
        checkSession().catch(() => { });
        resetTimer();
    }, [pathname]);

    useEffect(() => {
        // Listen for standard UX interactivity
        const events = ['mousemove', 'mousedown', 'keypress', 'DOMMouseScroll', 'mousewheel', 'touchmove', 'MSPointerMove'];

        const handleActivity = () => {
            resetTimer();
        };

        events.forEach(eventName => {
            window.addEventListener(eventName, handleActivity, { passive: true });
        });

        // Cleanup
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            events.forEach(eventName => {
                window.removeEventListener(eventName, handleActivity);
            });
        };
    }, []);

    return <>{children}</>;
}
