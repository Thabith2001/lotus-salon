
import process from "process";
const stripe_key = require('stripe')(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
    try {
        const {amount} = await request.json();
        const paymentIntent = await stripe_key.paymentIntents.create({
            amount: amount,
            currency: 'usd',
            automatic_payment_methods: {enabled: true},
        });
        return new Response(JSON.stringify({clientSecret: paymentIntent.client_secret}), {
            status: 200,
        });
    } catch (error) {
        return new Response(JSON.stringify({error: error.message}), {
            status: 500,
        });
    }
}