'use client';

import { useData } from '@/helper/dataProvider';
import { Brush, Check, Clock, Crown, Gift } from "lucide-react";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import convertToSubCurrency from "/lib/convertToSubCurrency.js";
import CheckOut from "@/components/dynamicComponents/checkOut";

if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
    throw new Error("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined");
}

export const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function PricingDetailsPage() {
    const router = useRouter();
    const { sharedData } = useData();

    useEffect(() => {
        if (!sharedData) router.back();
    }, [sharedData, router]);

    if (!sharedData) return null;

    const getIcon = () => {
        switch (sharedData.subscription) {
            case 'individual': return <Brush className="w-10 h-10 text-white" />;
            case 'membership': return <Crown className="w-10 h-10 text-white" />;
            case 'package': return <Gift className="w-10 h-10 text-white" />;
            default: return <Brush className="w-10 h-10 text-white" />;
        }
    };

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-black via-gray-900 to-black p-6 flex items-center justify-center">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-full max-w-6xl">

                {/* Left: Service Details */}
                <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl flex flex-col overflow-y-auto max-h-[80vh]">

                    {/* Icon & Header */}
                    <div className="flex flex-col items-center mb-8">
                        <div className="w-24 h-24 bg-gradient-to-br from-pink-400 to-purple-500 rounded-3xl flex items-center justify-center shadow-lg">
                            {getIcon()}
                        </div>

                        <h3 className="text-3xl font-bold text-white mt-4">{sharedData.name}</h3>
                        <p className="text-white/70 text-center mt-2">{sharedData.description}</p>
                    </div>

                    {/* Price + Duration */}
                    <div className="text-center mb-8">
                        <div className="flex items-center justify-center space-x-2 text-white/60 text-sm mb-4">
                            <Clock className="w-5 h-5" />
                            <span>{sharedData.duration ?? 0} min</span>
                        </div>
                        <span className="text-5xl font-extrabold bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent drop-shadow-lg">
                            ${sharedData.price ?? 0}
                        </span>
                    </div>

                    {/* Features */}
                    <div className="space-y-4 mb-10">
                        {sharedData.features?.map((feature, idx) => (
                            <div key={idx} className="flex items-center space-x-3">
                                <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                                <span className="text-white/80">{feature}</span>
                            </div>
                        ))}
                    </div>

                </div>

                {/* Right: Checkout */}
                <div className="flex items-center justify-center">
                    <div className="w-full h-auto min-h-[480px] rounded-3xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-white/10 flex items-center justify-center p-6">
                        <Elements
                            stripe={stripePromise}
                            options={{
                                mode: "payment",
                                amount: convertToSubCurrency(sharedData.price ?? 0),
                                currency: "usd",
                            }}
                        >
                            <CheckOut amount={sharedData.price ?? 0} />
                        </Elements>
                    </div>
                </div>

            </div>
        </div>
    );
}