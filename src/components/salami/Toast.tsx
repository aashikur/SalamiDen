import React from 'react';

export default function Toast({ message }: { message: string | null }) {
    if (!message) return null;
    return (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-pink-600 text-white px-6 py-3 rounded-full shadow-2xl font-bold z-50 animate-bounce whitespace-nowrap">
            {message}
        </div>
    );
}
