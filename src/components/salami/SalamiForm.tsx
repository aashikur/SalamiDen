import React from 'react';

interface SalamiFormProps {
    name: string;
    setName: (name: string) => void;
    phone: string;
    setPhone: (phone: string) => void;
    handleStart: () => void;
}

export default function SalamiForm({ name, setName, phone, setPhone, handleStart }: SalamiFormProps) {
    return (
        <div className="space-y-6">
            <div className="text-center ">
                <img src="https://t4.ftcdn.net/jpg/15/14/55/71/360_F_1514557111_dROWtWfWw71RixKY6dPQrDzOhMAoseTf.jpg" alt="Cute Avatar" className="w-32 h-32 mx-auto mb-4 rounded-full" />
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
                <label className="block text-pink-700 text-sm font-bold mb-2">Bkash Number</label>
                <input
                    type="tel"
                    value={phone}
                    maxLength={11}
                    minLength={11}
                    onChange={(e) => {
                        const onlyNumber = e.target.value.replace(/[^0-9]/g, '');
                        setPhone(onlyNumber);
                    }}
                    placeholder="01XXX-XXXXXX"
                    className="w-full px-4 py-3 rounded-xl border-2 border-pink-100 focus:border-pink-400 outline-none transition-all text-black/80"
                />
            </div>
            <button onClick={handleStart} className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 rounded-xl shadow-lg transform active:scale-95 transition-all">
                Let&apos;s Salami! ➜
            </button>
        </div>
    );
}
