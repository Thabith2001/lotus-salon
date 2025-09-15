"use client";
import React, {useEffect, useState} from "react";
import {ArrowRight} from "lucide-react";
import Button from "@/components/dynamicComponents/button";

const Hero = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Trigger visibility after mount
    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    return (<>
        <div
            className={`relative z-50 max-w-6xl mx-auto text-center px-6 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
            {/* Premium badge */}
            <div
                className="inline-flex items-center px-6 py-2 mb-8 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full">
                <span className="w-2 h-2 bg-pink-400 rounded-full mr-3 animate-pulse"></span>
                <span className="text-sm font-medium text-white/90 tracking-wide">
          LUXURY NAIL EXPERIENCE
        </span>
            </div>

            {/* Main headline */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight mb-8">
        <span
            className="block bg-gradient-to-r from-white via-pink-200 to-purple-200 bg-clip-text text-transparent drop-shadow-2xl">
          Where Beauty
        </span>
                <span
                    className="block bg-gradient-to-r from-pink-300 via-rose-200 to-white bg-clip-text text-transparent drop-shadow-2xl">
          Meets Artistry
        </span>
            </h1>

            {/* Subtitle */}
            <div className="max-w-3xl mx-auto mb-12">
                <p className="text-xl md:text-2xl text-white/80 leading-relaxed font-light">
                    Immerse yourself in a world of
                    <span
                        className="font-semibold bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">
            {" "}
                        premium nail artistry{" "}
          </span>
                    where every detail is crafted to perfection
                </p>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
                <Button href="/booking" label="Book Your session"
                        theme="group relative px-10 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded-full
                         overflow-hidden shadow-2xl hover:shadow-pink-500/25 transition-all duration-300 hover:scale-105"/>

                <Button href="/gallery" label={<span className="flex items-center gap-2">
             View Gallery
             <ArrowRight className="w-5 h-5 "/>
             </span>}
                        theme="group px-10 py-4 bg-white/10 backdrop-blur-lg border border-white/30 text-white font-bold rounded-full hover:bg-white/20
                         transition-all duration-300 hover:scale-105 hover:border-pink-300/50"/>

            </div>

            {/* Social proof */}
            <div className="mt-16 flex flex-wrap justify-center items-center gap-8 opacity-70">
                <div className="text-center">
                    <div className="text-2xl font-bold text-white">500+</div>
                    <div className="text-sm text-white/70">Happy Clients</div>
                </div>
                <div className="w-px h-8 bg-white/30 hidden sm:block"></div>
                <div className="text-center">
                    <div className="text-2xl font-bold text-white">5★</div>
                    <div className="text-sm text-white/70">Average Rating</div>
                </div>
                <div className="w-px h-8 bg-white/30 hidden sm:block"></div>
                <div className="text-center">
                    <div className="text-2xl font-bold text-white">1+</div>
                    <div className="text-sm text-white/70">Years Experience</div>
                </div>
            </div>
        </div>

    </>);
};

export default Hero;