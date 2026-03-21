import React from 'react';

interface SalamiWheelProps {
    amounts: number[];
    colors: string[];
    rotation: number;
    segmentAngle: number;
    isSpinning: boolean;
    spinWheel: () => void;
}

export default function SalamiWheel({ amounts, colors, rotation, segmentAngle, isSpinning, spinWheel }: SalamiWheelProps) {
    return (
        <div className="flex flex-col items-center animate-fade-in">
            <div className="relative mb-8">
                {/* Pointer */}
                <div className="pointer">
                    <svg viewBox="0 0 24 24" fill="#db2777">
                        <path d="M12 21l-12-18h24z" />
                    </svg>
                </div>
                {/* Wheel */}
                <div className="wheel-container" style={{ transform: `rotate(${rotation}deg)` }}>
                    {amounts.map((amt, i) => (
                        <div
                            key={i}
                            className="wheel-segment"
                            style={{
                                transform: `rotate(${i * segmentAngle}deg)`,
                                backgroundColor: colors[i % colors.length]
                            }}
                        >
                            <div
                                className="segment-label"
                                style={{ color: (i % colors.length) >= 4 ? '#fff' : '#be185d' }}
                            >
                                {amt}৳
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <p className="text-pink-600 font-bold mb-4 h-6">
                {isSpinning ? "Wait for it... 🎡" : "Who will get the big prize?"}
            </p>

            <button
                onClick={spinWheel}
                disabled={isSpinning}
                className={`w-full bg-linear-to-r from-pink-500 to-rose-400 text-white font-bold py-4 rounded-xl shadow-lg transition-all active:scale-95 ${isSpinning ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-pink-200/50'}`}
            >
                SPIN THE WHEEL! 🎉
            </button>
        </div>
    );
}
