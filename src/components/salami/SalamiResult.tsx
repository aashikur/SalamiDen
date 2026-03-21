import React from 'react';

interface SalamiResultProps {
    result: { amount: number; emoji: string; note: string };
    name: string;
    handleReset: () => void;
}

export default function SalamiResult({ result, name, handleReset }: SalamiResultProps) {
    return (
        <div className="text-center py-6 animate-fade-in">
            <div className="mb-4 text-7xl emoji-pop">
                {result.emoji}
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Hey <span className="text-pink-600">{name}</span>!</h2>
            <div className="bg-pink-50 rounded-2xl p-6 border-2 border-dashed border-pink-200 mb-6 relative">
                <p className="text-gray-600 mb-1">You got</p>
                <p className="text-6xl font-black text-pink-600 tracking-tighter">{result.amount} TK</p>
                <p className="text-gray-500 mt-2 font-medium">{result.note}</p>
            </div>
            <button onClick={handleReset} className="bg-gray-100 text-gray-600 px-6 py-2 rounded-full font-bold hover:bg-gray-200 transition-all">
                Try Another Spin?
            </button>
        </div>
    );
}
