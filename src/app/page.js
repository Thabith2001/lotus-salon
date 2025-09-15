"use client";

import React, { useState, useEffect } from "react";
import { Tag } from "lucide-react";

import { pricing_categories } from "@/data/data";
import { useSparkles } from "@/hooks/useSparkles";

import renderIndividualServices from "@/components/dynamicComponents/pricingRendering/renderIndividualServices";
import renderPackages from "@/components/dynamicComponents/pricingRendering/renderMembership";
import renderMemberships from "@/components/dynamicComponents/pricingRendering/renderPackages";
import Button from "@/components/dynamicComponents/button";

const Pricing = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [activeCategory, setActiveCategory] = useState("individual");
    const [selectedService, setSelectedService] = useState(null);
    const sparkles = useSparkles(15);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setIsVisible(true);
            },
            { threshold: 0.2 }
        );

        const section = document.getElementById("pricing");
        if (section) observer.observe(section);

        return () => observer.disconnect();
    }, []);

    return (
        <section
            id="pricing"
            className="w-screen min-h-screen overflow-hidden relative py-20"
        >
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-pink-900">
                {/* Sparkles */}
                <div className="absolute inset-0 overflow-hidden">
                    {sparkles.map((s, i) => (
                        <div
                            key={i}
                            className="absolute w-1 h-1 bg-pink-300 rounded-full opacity-20 animate-twinkle"
                            style={{
                                left: s.left,
                                top: s.top,
                                animationDelay: s.delay,
                                animationDuration: s.duration,
                            }}
                        />
                    ))}
                </div>

                {/* Gradient orbs */}
                <div className="absolute top-1/4 right-1/5 w-96 h-96 bg-gradient-to-br from-pink-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 left-1/5 w-80 h-80 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                {/* Header */}
                <div
                    className={`text-center mb-16 transition-all duration-1000 ${
                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    }`}
                >
                    {/* Badge */}
                    <div className="inline-flex items-center px-6 py-2 mb-8 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full">
                        <Tag className="w-4 h-4 text-pink-400 mr-3" />
                        <span className="text-sm font-medium text-white/90 tracking-wide">
              TRANSPARENT PRICING
            </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-5xl md:text-7xl font-black leading-tight mb-8">
            <span className="block bg-gradient-to-r from-white via-pink-200 to-purple-200 bg-clip-text text-transparent drop-shadow-2xl">
              Luxury That&apos;s
            </span>
                        <span className="block bg-gradient-to-r from-pink-300 via-rose-200 to-white bg-clip-text text-transparent drop-shadow-2xl">
              Worth Every Penny
            </span>
                    </h2>

                    <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
                        Discover our range of premium nail services designed to fit every
                        budget and preference
                    </p>
                </div>

                {/* Category Tabs */}
                <div
                    className={`flex flex-wrap justify-center gap-4 mb-16 transition-all duration-1000 delay-200 ${
                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    }`}
                >
                    {pricing_categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setActiveCategory(category.id)}
                            className={`flex items-center space-x-3 px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 ${
                                activeCategory === category.id
                                    ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg shadow-pink-500/25"
                                    : "bg-white/10 backdrop-blur-lg border border-white/20 text-white/80 hover:bg-white/20"
                            }`}
                        >
                            <category.icon className="w-5 h-5" />
                            <span>{category.name}</span>
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div
                    className={`transition-all duration-1000 delay-400 ${
                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    }`}
                >
                    {activeCategory === "individual" &&
                        renderIndividualServices((service) => setSelectedService(service))}
                    {activeCategory === "packages" && renderPackages()}
                    {activeCategory === "membership" && renderMemberships()}
                </div>
            </div>

            {/* Payment Modal */}
            {selectedService && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg relative">
                        <h3 className="text-2xl font-bold mb-4">Checkout</h3>
                        <p className="text-gray-700 mb-6">
                            You selected:{" "}
                            <span className="font-semibold">{selectedService.name}</span>
                        </p>
                        <p className="text-lg font-bold mb-6">
                            Price: ${selectedService.price}
                        </p>

                        <Button
                            onClick={() => alert("Payment successful! (demo)")}
                            label="Pay Now"
                            theme="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-full"
                        />

                        <button
                            onClick={() => setSelectedService(null)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-black"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Pricing;