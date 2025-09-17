'use client';

import {useData} from '@/helper/dataProvider';
import {
    Brush,
    Check,
    Clock,
    Crown,
    Gift,
    ArrowLeft,
    Star,
    Shield,
    Heart,
    Sparkles,
    Award,
    Calendar,
    User,
    Phone,
    Mail,
    CreditCard,
    Lock,
    CheckCircle,
    Palette,
    Gem
} from "lucide-react";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import convertToSubCurrency from "/lib/convertToSubCurrency.js";
import CheckOut from "@/components/dynamicComponents/checkOut";
import {benefits, testimonials} from "@/data/data";

if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
    throw new Error("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined");
}

export const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function PricingDetailsPage() {
    const router = useRouter();
    const {sharedData} = useData();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (!sharedData) router.back();
        setIsVisible(true);
    }, [sharedData, router]);

    if (!sharedData) return null;

    const getIcon = () => {
        switch (sharedData.subscription) {
            case 'individual':
                return <Brush className="w-12 h-12 text-white"/>;
            case 'membership':
                return <Crown className="w-12 h-12 text-white"/>;
            case 'package':
                return <Gift className="w-12 h-12 text-white"/>;
            default:
                return <Brush className="w-12 h-12 text-white"/>;
        }
    };

    const getCategoryColor = () => {
        switch (sharedData.subscription) {
            case 'individual':
                return 'from-blue-400 to-cyan-500';
            case 'membership':
                return 'from-yellow-400 to-orange-500';
            case 'package':
                return 'from-pink-500 to-purple-600';
            default:
                return 'from-pink-400 to-purple-500';
        }
    };

    const getCategoryBadge = () => {
        switch (sharedData.subscription) {
            case 'individual':
                return 'Individual Service';
            case 'membership':
                return 'Membership Plan';
            case 'package':
                return 'Service Package';
            default:
                return 'Premium Service';
        }
    };

    return (
        <div
            className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-purple-900 to-pink-900 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Animated sparkles */}
                {[...Array(30)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-pink-300 rounded-full opacity-30 animate-twinkle"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${2 + Math.random() * 2}s`
                        }}
                    />
                ))}

                {/* Floating gradient orbs */}
                <div
                    className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-pink-400/15 to-purple-400/15 rounded-full blur-3xl animate-pulse"></div>
                <div
                    className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-purple-400/15 to-pink-400/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            {/* Header */}
            <div className="relative z-10 p-6">
                <div className="max-w-6xl mx-auto">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors duration-300 mb-8 group"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300"/>
                        <span>Back to Pricing</span>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 px-6 pb-12">
                <div className={`max-w-7xl mx-auto transition-all duration-1000 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}>

                    {/* Service Header */}
                    <div className="text-center mb-12">
                        <div
                            className="inline-flex items-center px-4 py-2 mb-6 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full">
                            <Sparkles className="w-4 h-4 text-pink-400 mr-2"/>
                            <span
                                className="text-sm font-medium text-white/90 tracking-wide">{getCategoryBadge()}</span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-black leading-tight mb-4">
                            <span
                                className="bg-gradient-to-r from-white via-pink-200 to-purple-200 bg-clip-text text-transparent drop-shadow-2xl">
                                Complete Your
                            </span>
                            <br/>
                            <span
                                className="bg-gradient-to-r from-pink-300 via-rose-200 to-white bg-clip-text text-transparent drop-shadow-2xl">
                                Booking
                            </span>
                        </h1>

                        <p className="text-xl text-white/70 max-w-2xl mx-auto">
                            You're just one step away from your luxury nail experience
                        </p>
                    </div>

                    {/* Main Grid */}
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

                        {/* Left: Service Details */}
                        <div className="xl:col-span-1">
                            <div
                                className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden sticky top-8">

                                {/* Service Header */}
                                <div className="p-8 text-center border-b border-white/10">
                                    <div
                                        className={`w-20 h-20 bg-gradient-to-br ${getCategoryColor()} rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                                        {getIcon()}
                                    </div>

                                    <h3 className="text-2xl font-bold text-white mb-2">{sharedData.name}</h3>
                                    <p className="text-white/70 text-sm mb-4">{sharedData.description}</p>

                                    {/* Duration */}
                                    {sharedData.duration && (
                                        <div
                                            className="flex items-center justify-center space-x-2 text-white/60 text-sm mb-4">
                                            <Clock className="w-4 h-4"/>
                                            <span>{sharedData.duration} minutes</span>
                                        </div>
                                    )}

                                    {/* Price */}
                                    <div className="text-center">
                                        <span
                                            className="text-4xl font-black bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent drop-shadow-lg">
                                            ${sharedData.price ?? 0}
                                        </span>
                                        {sharedData.subscription === 'membership' && (
                                            <span className="text-white/60 text-sm block">per month</span>
                                        )}
                                    </div>
                                </div>

                                {/* Features */}
                                <div className="p-8">
                                    <h4 className="text-white font-semibold mb-4 flex items-center">
                                        <CheckCircle className="w-5 h-5 text-green-400 mr-2"/>
                                        What's Included
                                    </h4>
                                    <div className="space-y-3 mb-6">
                                        {sharedData.features?.map((feature, idx) => (
                                            <div key={idx} className="flex items-start space-x-3">
                                                <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5"/>
                                                <span className="text-white/80 text-sm">{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Benefits */}
                                    <h4 className="text-white font-semibold mb-4 flex items-center">
                                        <Star className="w-5 h-5 text-yellow-400 mr-2"/>
                                        Why Choose Us
                                    </h4>
                                    <div className="space-y-3">
                                        {benefits.map((benefit, idx) => (
                                            <div key={idx} className="flex items-start space-x-3">
                                                <benefit.icon className="w-4 h-4 text-pink-400 flex-shrink-0 mt-0.5"/>
                                                <span className="text-white/80 text-sm">{benefit.text}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right: Checkout & Testimonials */}
                        <div className="xl:col-span-2 space-y-8">

                            {/* Checkout Section */}
                            <div
                                className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
                                <div className="p-8">
                                    <div className="flex items-center space-x-3 mb-6">
                                        <div
                                            className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
                                            <CreditCard className="w-5 h-5 text-white"/>
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-white">Secure Checkout</h3>
                                            <p className="text-white/60 text-sm">Your payment information is encrypted
                                                and secure</p>
                                        </div>
                                    </div>

                                    {/* Security Indicators */}
                                    <div
                                        className="flex items-center space-x-6 mb-8 p-4 bg-white/5 rounded-xl border border-white/10">
                                        <div className="flex items-center space-x-2 text-green-400">
                                            <Lock className="w-4 h-4"/>
                                            <span className="text-sm">SSL Encrypted</span>
                                        </div>
                                        <div className="flex items-center space-x-2 text-blue-400">
                                            <Shield className="w-4 h-4"/>
                                            <span className="text-sm">Stripe Secure</span>
                                        </div>
                                        <div className="flex items-center space-x-2 text-purple-400">
                                            <Award className="w-4 h-4"/>
                                            <span className="text-sm">PCI Compliant</span>
                                        </div>
                                    </div>

                                    {/* Stripe Checkout */}
                                    <div
                                        className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl border border-pink-300/20 p-6">
                                        <Elements
                                            stripe={stripePromise}
                                            options={{
                                                mode: "payment",
                                                amount: convertToSubCurrency(sharedData.price ?? 0),
                                                currency: "usd",
                                                appearance: {
                                                    theme: 'night',
                                                    variables: {
                                                        colorPrimary: '#ec4899',
                                                        colorBackground: 'rgba(255, 255, 255, 0.05)',
                                                        colorText: '#ffffff',
                                                        colorDanger: '#ef4444',
                                                        fontFamily: 'Inter, system-ui, sans-serif',
                                                        spacingUnit: '4px',
                                                        borderRadius: '12px',
                                                    }
                                                }
                                            }}
                                        >
                                            <CheckOut amount={sharedData.price ?? 0}/>
                                        </Elements>
                                    </div>

                                    {/* Payment Methods */}
                                    <div className="mt-6 text-center">
                                        <p className="text-white/60 text-sm mb-3">We accept</p>
                                        <div className="flex justify-center space-x-4">
                                            <div
                                                className="w-12 h-8 bg-white/10 rounded-lg flex items-center justify-center text-white text-xs font-bold">VISA
                                            </div>
                                            <div
                                                className="w-12 h-8 bg-white/10 rounded-lg flex items-center justify-center text-white text-xs font-bold">MC
                                            </div>
                                            <div
                                                className="w-12 h-8 bg-white/10 rounded-lg flex items-center justify-center text-white text-xs font-bold">AMEX
                                            </div>
                                            <div
                                                className="w-12 h-8 bg-white/10 rounded-lg flex items-center justify-center text-white text-xs font-bold">GPay
                                            </div>
                                            <div
                                                className="w-12 h-8 bg-white/10 rounded-lg flex items-center justify-center text-white text-xs font-bold">APay
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Testimonials */}
                            <div
                                className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl p-8">
                                <div className="flex items-center space-x-3 mb-6">
                                    <div
                                        className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
                                        <Star className="w-5 h-5 text-white"/>
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-white">What Our Clients Say</h3>
                                        <p className="text-white/60 text-sm">Real reviews from satisfied customers</p>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    {testimonials.map((testimonial, idx) => (
                                        <div key={idx}
                                             className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                                            <div className="flex items-center space-x-1 mb-3">
                                                {[...Array(testimonial.rating)].map((_, i) => (
                                                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current"/>
                                                ))}
                                            </div>

                                            <p className="text-white/80 text-sm mb-4 italic">"{testimonial.text}"</p>

                                            <div className="flex items-center space-x-3">
                                                <div
                                                    className="w-8 h-8 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
                                                    <User className="w-4 h-4 text-white"/>
                                                </div>
                                                <div>
                                                    <p className="text-white font-medium text-sm">{testimonial.name}</p>
                                                    <p className="text-white/60 text-xs">{testimonial.service}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Contact Support */}
                            <div
                                className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl p-8">
                                <div className="text-center">
                                    <Heart className="w-12 h-12 text-pink-400 mx-auto mb-4"/>
                                    <h3 className="text-xl font-bold text-white mb-2">Need Help?</h3>
                                    <p className="text-white/70 text-sm mb-6">Our team is here to assist you with your
                                        booking</p>

                                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                        <a
                                            href="tel:(555)123-4567"
                                            className="flex items-center space-x-2 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full hover:bg-white/20 transition-colors duration-300"
                                        >
                                            <Phone className="w-4 h-4"/>
                                            <span>(555) 123-4567</span>
                                        </a>

                                        <a
                                            href="mailto:support@lotusspa.com"
                                            className="flex items-center space-x-2 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full hover:bg-white/20 transition-colors duration-300"
                                        >
                                            <Mail className="w-4 h-4"/>
                                            <span>support@lotusspa.com</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}