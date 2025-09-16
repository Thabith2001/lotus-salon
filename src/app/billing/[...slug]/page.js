
'use client';

import { useData } from '@/helper/dataProvider';

export default function PricingDetailsPage() {
    const { sharedData } = useData();

    if (!sharedData) {
        return <p>No data found. Please navigate from the pricing page.</p>;
    }

    return (
        <div className="w-full h-full flex flex-col items-center bg-gray-500 justify-center">
            <div className="bg-white/10 backdrop-blur-lg border  border-white/20 rounded-xl p-8 max-w-3xl w-full mx-4">
                <h2 className="text-2xl font-bold  mb-4">{sharedData.name}</h2>
                <pre className="bg-gray-100 p-4 rounded text-sm">
                {JSON.stringify(sharedData, null, 2)}
                    <p>{"$"+sharedData.price}</p>
            </pre>
            </div>
        </div>
    );
}