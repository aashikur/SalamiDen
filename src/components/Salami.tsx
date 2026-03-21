'use client';

import React, { useState, useEffect } from 'react';
import SalamiForm from './salami/SalamiForm';
import SalamiWheel from './salami/SalamiWheel';
import SalamiResult from './salami/SalamiResult';
import Lanterns from './salami/Lanterns';
import Sparkles from './salami/Sparkles';
import Toast from './salami/Toast';

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
            <Lanterns />

            {/* Main Card */}
            <div className="bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-2xl w-full max-w-md border border-white relative overflow-hidden z-10">
                
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="eid-font text-5xl text-pink-600 mb-2">Eid Mubarak</h1>
                    <p className="text-pink-400 font-semibold uppercase tracking-widest text-sm">Digital Salami Wheel</p>
                </div>

                {step === 'form' && (
                    <SalamiForm 
                        name={name} 
                        setName={setName} 
                        phone={phone} 
                        setPhone={setPhone} 
                        handleStart={handleStart} 
                    />
                )}

                {step === 'spin' && (
                    <SalamiWheel 
                        amounts={amounts} 
                        colors={colors} 
                        rotation={rotation} 
                        segmentAngle={segmentAngle} 
                        isSpinning={isSpinning} 
                        spinWheel={spinWheel} 
                    />
                )}

                {step === 'result' && result && (
                    <SalamiResult 
                        result={result} 
                        name={name} 
                        handleReset={handleReset} 
                    />
                )}
            </div>

            <Toast message={toast} />
            <Sparkles sparkles={sparkles} />
        </div>
    );
}
