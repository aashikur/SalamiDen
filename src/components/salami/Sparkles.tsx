import React from 'react';

interface Sparkle {
    id: number;
    char: string;
    left: string;
    top: string;
    duration: string;
}

export default function Sparkles({ sparkles }: { sparkles: Sparkle[] }) {
    if (sparkles.length === 0) return null;
    return (
        <>
            {sparkles.map((s) => (
                <div
                    key={s.id}
                    className="sparkle text-2xl"
                    style={{
                        left: s.left,
                        top: s.top,
                        animationDuration: s.duration
                    }}
                >
                    {s.char}
                </div>
            ))}
        </>
    );
}
