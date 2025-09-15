"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export function useActiveSection(links, closeMenu = () => {}) {
    const [activeSection, setActiveSection] = useState("");
    const pathname = usePathname();
    const router = useRouter();
    const [scrolled, setScrolled] = useState(false);

    // Track scroll position (optional, you had this earlier)
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Track in-page sections
    useEffect(() => {
        const options = { threshold: 0.5 };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        }, options);

        links.forEach((link) => {
            if (link.href.startsWith("#")) {
                const section = document.getElementById(link.href.replace("#", ""));
                if (section) observer.observe(section);
            }
        });

        return () => observer.disconnect();
    }, [links]);

    // Track route changes
    useEffect(() => {
        if (!pathname.startsWith("/#")) {
            setActiveSection(pathname);
        }
    }, [pathname]);

    // Smooth scroll + navigation
    const handleSmoothScroll = (to) => {
        if (to.startsWith("#")) {
            const element = document.getElementById(to.replace("#", ""));
            if (element) {
                element.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        } else {
            router.push(to);
        }
        closeMenu();
    };

    // Active link checker
    const isLinkActive = (link) => {
        if (link.href.startsWith("#")) {
            return activeSection === link.href.replace("#", "");
        }
        return pathname === link.href;
    };

    return { activeSection, handleSmoothScroll, isLinkActive, scrolled };
}