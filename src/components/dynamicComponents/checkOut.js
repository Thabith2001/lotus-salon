"use client";
import React, { useEffect, useState } from "react";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import axios from "axios";

const CheckOut = ({ amount }) => {
    const stripe = useStripe();
    const elements = useElements();

    const [errorMessages, setErrorMessages] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        const fetchClientSecret = async () => {
            try {
                const { data } = await axios.post("/api/create-payment-intent", { amount });
                setClientSecret(data.clientSecret);
            } catch (err) {
                console.error("Error fetching clientSecret:", err);
                setErrorMessages("Failed to initialize payment.");
            }
        };
        fetchClientSecret();
    }, [amount]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements || !clientSecret) return;

        setLoading(true);
        setErrorMessages("");

        const { error: submitError } = await elements.submit();
        if (submitError) {
            setErrorMessages(submitError.message);
            setLoading(false);
            return;
        }

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            clientSecret,
            confirmParams: {
                return_url: `http://localhost:3000/payment-success?amount=${amount}`,
            },
            redirect: "if_required",
        });

        if (error) {
            setErrorMessages(error.message);
        } else if (paymentIntent && paymentIntent.status === "succeeded") {
            setSuccess(true);
        }

        setLoading(false);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col w-full h-full justify-center items-center p-4 "
        >
            {clientSecret && <PaymentElement className="w-full h-full" />}

            {errorMessages && <p className="text-red-500 mt-2 p-2">{errorMessages}</p>}
            {success && <p className="text-green-500 mt-2 p-2">Payment successful</p>}

            <button
                disabled={!stripe || !clientSecret || loading}
                className="flex items-center justify-center bg-black w-full font-bold text-xl  text-white px-8 py-3  rounded disabled:opacity-50"
            >
                {loading ? (
                    <>
                        <svg
                            className="animate-spin h-5 w-5 mr-2 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                            ></path>
                        </svg>
                        Processing...
                    </>
                ) : (
                    `Pay $${amount}`
                )}
            </button>
        </form>
    );
};

export default CheckOut;