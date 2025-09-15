"use client";
import { useState } from "react";

export function useAnimatedCounters(initial = { clients: 0, specialists: 0, experience: 0 }) {
    const [counters, setCounters] = useState(initial);

    const animateCounters = () => {
        const targets = { clients: 500, specialists: 35, experience: 1 };
        const duration = 2000;
        const steps = 60;
        const increment = duration / steps;

        let step = 0;
        const timer = setInterval(() => {
            step++;
            const progress = step / steps;

            setCounters({
                clients: Math.floor(targets.clients * progress),
                specialists: Math.floor(targets.specialists * progress),
                experience: Math.floor(targets.experience * progress),
            });

            if (step >= steps) {
                clearInterval(timer);
                setCounters(targets); // ensure final state
            }
        }, increment);
    };

    return { counters, animateCounters  };
}
