'use client';

import React, { useState, useEffect } from 'react';

// const amounts = [2, 5, 20, 10, 2, 15, 5, 18, 2, 7, 20, 5];
const amounts: number[] = [];

for (let i = 0; i <= 20; i = i + 1) {
    amounts.push(i);
}

const colors = ['#fff1f2', '#fce7f3', '#fbcfe8', '#f9a8d4', '#f472b6', '#db2777'];

export default function Salami() {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [step, setStep] = useState<'form' | 'spin' | 'result'>('form');
    const [isSpinning, setIsSpinning] = useState(false);
    const [rotation, setRotation] = useState(0);
    const [result, setResult] = useState<{ amount: number; emoji: string; note: string } | null>(null);
    const [toast, setToast] = useState<string | null>(null);
    const [sparkles, setSparkles] = useState<{ id: number; char: string; left: string; top: string; duration: string }[]>([]);

    useEffect(() => {
        if (toast) {
            const timer = setTimeout(() => setToast(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [toast]);

    const handleStart = () => {
        if (!name.trim() || !phone.trim()) {
            setToast("Please enter your name and phone! 🌸");
            return;
        }
        setStep('spin');
    };

    const spinWheel = () => {
        if (isSpinning) return;
        setIsSpinning(true);

        const randomIndex = Math.floor(Math.random() * amounts.length);
        const selectedAmount = amounts[randomIndex];

        const segmentAngle = 360 / amounts.length;
        // Calculate rotation to land on the chosen index
        // We rotate several times (10 full turns = 3600deg) then subtract the segment position
        const extraRotation = 3600;
        const stopAt = (360 - (randomIndex * segmentAngle)) - (segmentAngle / 2);
        const newRotation = rotation + extraRotation + stopAt;

        setRotation(newRotation);

        setTimeout(() => {
            showResult(selectedAmount);
            setIsSpinning(false);
        }, 5000);
    };

    const showResult = (amount: number) => {
        let emoji = '😶';
        let note = 'Eid Salami 😶';

        if (amount <= 5) {
            const choices = [
                { e: '😒', n: 'So stingy! 😒' },
                { e: '🥲', n: 'Better than nothing... 🥲' },
                { e: '💀', n: 'Kanjoos level 100 💀' },
                { e: '🤏', n: 'Just a little bit 🤏' }
            ];
            const res = choices[Math.floor(Math.random() * choices.length)];
            emoji = res.e; note = res.n;
        } else if (amount > 5 && amount <= 14) {
            const choices = [
                { e: '🙂', n: 'It is okay! 🙂' },
                { e: '👌', n: 'Not bad at all! 👌' },
                { e: '🍫', n: 'Can buy chocolate now! 🍫' },
                { e: '✨', n: 'A nice gift! ✨' }
            ];
            const res = choices[Math.floor(Math.random() * choices.length)];
            emoji = res.e; note = res.n;
        } else {
            const choices = [
                { e: '🥳', n: 'JACKPOT! PARTY TIME! 🥳' },
                { e: '😍', n: 'Wow! Best Eid ever! 😍' },
                { e: '🤑', n: 'Richie Rich vibes! 🤑' },
                { e: '💎', n: 'You are lucky! 💎' }
            ];
            const res = choices[Math.floor(Math.random() * choices.length)];
            emoji = res.e; note = res.n;
        }

        setResult({ amount, emoji, note });
        setStep('result');
        createConfetti();
    };

    const createConfetti = () => {
        const newSparkles = [];
        for (let i = 0; i < 40; i++) {
            newSparkles.push({
                id: i,
                char: ['🌸', '✨', '💖', '💸', '⭐', '🎈'][Math.floor(Math.random() * 6)],
                left: Math.random() * 100 + 'vw',
                top: Math.random() * 100 + 'vh',
                duration: (Math.random() * 2 + 1) + 's'
            });
        }
        setSparkles(newSparkles);
    };

    const handleReset = () => {
        setStep('form');
        setResult(null);
        setSparkles([]);
        setRotation(0);
        setName('');
        setPhone('');
    };

    const segmentAngle = 360 / amounts.length;

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@400;600;700&family=Dancing+Script:wght@700&display=swap');
                
                body {
                    font-family: 'Quicksand', sans-serif;
                    background: linear-gradient(135deg, #fff5f7 0%, #ffeef2 100%);
                }
                .eid-font { font-family: 'Dancing Script', cursive; }
                
                .lantern {
                    animation: swing 3s ease-in-out infinite alternate;
                    transform-origin: top center;
                }
                @keyframes swing {
                    from { transform: rotate(-5deg); }
                    to { transform: rotate(5deg); }
                }

                .wheel-container {
                    position: relative;
                    width: 300px;
                    height: 300px;
                    border-radius: 50%;
                    border: 8px solid #fbcfe8;
                    box-shadow: 0 10px 25px rgba(219, 39, 119, 0.2);
                    overflow: hidden;
                    transition: transform 5s cubic-bezier(0.15, 0, 0.15, 1);
                }
                .wheel-segment {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    clip-path: polygon(50% 50%, 50% 0%, 80% 0%);
                    transform-origin: 50% 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .segment-label {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%) rotate(7deg) translate(0, -130px);
                    font-weight: 800;
                    font-size: 0.715rem;
                    text-align: center;
                }
                .pointer {
                    position: absolute;
                    top: -20px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 40px;
                    height: 40px;
                    z-index: 10;
                    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
                }
                
                .sparkle {
                    position: absolute;
                    pointer-events: none;
                    animation: float 2s infinite;
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0) scale(1); opacity: 1; }
                    50% { transform: translateY(-20px) scale(1.2); opacity: 0.5; }
                }
                
                .emoji-pop {
                    animation: pop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }
                @keyframes pop {
                    0% { transform: scale(0); }
                    100% { transform: scale(1.5); }
                }

                /* Hidden helper for visibility control if needed, usually handled by React conditional rendering */
                .hidden-section { display: none; }
            `}</style>

            {/* Decorative Elements */}
            <div className="fixed top-0 left-10 lantern">
                <svg width="40" height="100" viewBox="0 0 40 100">
                    <line x1="20" y1="0" x2="20" y2="40" stroke="#db2777" strokeWidth="2" />
                    <rect x="10" y="40" width="20" height="30" rx="5" fill="#fbcfe8" stroke="#db2777" strokeWidth="2" />
                    <circle cx="20" y="55" r="5" fill="#f472b6" />
                </svg>
            </div>
            <div className="fixed top-0 right-10 lantern" style={{ animationDelay: '-1.5s' }}>
                <svg width="40" height="120" viewBox="0 0 40 120">
                    <line x1="20" y1="0" x2="20" y2="60" stroke="#db2777" strokeWidth="2" />
                    <rect x="10" y="60" width="20" height="30" rx="5" fill="#fce7f3" stroke="#db2777" strokeWidth="2" />
                    <circle cx="20" y="75" r="5" fill="#f472b6" />
                </svg>
            </div>

            {/* Main Card */}
            <div className="bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-2xl w-full max-w-md border border-white relative overflow-hidden z-10">

                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="eid-font text-5xl text-pink-600 mb-2">Eid Mubarak</h1>
                    <p className="text-pink-400 font-semibold uppercase tracking-widest text-sm">Digital Salami Wheel</p>
                </div>

                {/* Section 1: Entry Form */}
                {step === 'form' && (
                    <div className="space-y-6">
                        <div className="text-center">
                            <img src="https://img.icons8.com/bubbles/200/girl.png" alt="Cute Avatar" className="w-32 h-32 mx-auto mb-4" />
                            <p className="text-gray-600 italic">&quot;Eid is here! Enter your name and phone to see how much salami you get!&quot;</p>
                        </div>
                        <div>
                            <label className="block text-pink-700 text-sm font-bold mb-2">Your Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Type your name..."
                                className="w-full px-4 py-3 rounded-xl border-2 border-pink-100 focus:border-pink-400 outline-none transition-all text-black/80"
                            />
                        </div>
                        <div>
                            <label className="block text-pink-700 text-sm font-bold mb-2">Phone Number</label>
                            <input
                                type="tel"
                                value={phone}
                                maxLength={11}
                                onChange={(e) => {
                                    const onlyNumber = e.target.value.replace(/[^0-9]/g, '');
                                    setPhone(onlyNumber);
                                }
                                }
                                placeholder="01XXX-XXXXXX"
                                className="w-full px-4 py-3 rounded-xl border-2 border-pink-100 focus:border-pink-400 outline-none transition-all 
                                text-black/80"
                            />
                        </div>
                        <button onClick={handleStart} className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 rounded-xl shadow-lg transform active:scale-95 transition-all">
                            Let&apos;s Salami! ➜
                        </button>
                    </div>
                )}

                {/* Section 2: Spinner */}
                {step === 'spin' && (
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
                )}

                {/* Section 3: Result */}
                {step === 'result' && result && (
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
                )}
            </div>

            {/* Toast */}
            {toast && (
                <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-pink-600 text-white px-6 py-3 rounded-full shadow-2xl font-bold z-50 animate-bounce whitespace-nowrap">
                    {toast}
                </div>
            )}

            {/* Background Sparkles */}
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
        </div>
    );
}
