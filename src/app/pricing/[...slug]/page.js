
'use client';

import { useData } from '@/helper/dataProvider';

export default function PricingDetailsPage() {
    const { sharedData } = useData();

    if (!sharedData) {
        return <p>No data found. Please navigate from the pricing page.</p>;
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Selected Pricing Plan</h1>
            <pre className="bg-gray-100 p-4 rounded text-sm">
                {JSON.stringify(sharedData, null, 2)}
            </pre>
        </div>
    );
}
