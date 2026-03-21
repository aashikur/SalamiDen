<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Eid Salami - Digital Gift</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;600;700&family=Dancing+Script:wght@700&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Quicksand', sans-serif;
            background: linear-gradient(135deg, #fff5f7 0%, #ffeef2 100%);
            overflow-x: hidden;
        }
        .eid-font { font-family: 'Dancing Script', cursive; }
        
        /* Lantern Animation */
        .lantern {
            animation: swing 3s ease-in-out infinite alternate;
            transform-origin: top center;
        }
        @keyframes swing {
            from { transform: rotate(-5deg); }
            to { transform: rotate(5deg); }
        }

        /* Wheel Styles */
        #wheel-container {
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
            clip-path: polygon(50% 50%, 50% 0%, 100% 0%, 100% 50%);
            transform-origin: 50% 50%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .segment-label {
            position: absolute;
            top: 40px;
            transform: rotate(20deg);
            font-weight: 800;
            font-size: 1.1rem;
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

        .hidden-section { display: none; }
        
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
    </style>
</head>
<body class="min-h-screen flex items-center justify-center p-4">

    <!-- Decorative Elements -->
    <div class="fixed top-0 left-10 lantern">
        <svg width="40" height="100" viewBox="0 0 40 100">
            <line x1="20" y1="0" x2="20" y2="40" stroke="#db2777" stroke-width="2"/>
            <rect x="10" y="40" width="20" height="30" rx="5" fill="#fbcfe8" stroke="#db2777" stroke-width="2"/>
            <circle cx="20" y="55" r="5" fill="#f472b6"/>
        </svg>
    </div>
    <div class="fixed top-0 right-10 lantern" style="animation-delay: -1.5s">
        <svg width="40" height="120" viewBox="0 0 40 120">
            <line x1="20" y1="0" x2="20" y2="60" stroke="#db2777" stroke-width="2"/>
            <rect x="10" y="60" width="20" height="30" rx="5" fill="#fce7f3" stroke="#db2777" stroke-width="2"/>
            <circle cx="20" y="75" r="5" fill="#f472b6"/>
        </svg>
    </div>

    <!-- Main Card -->
    <div id="main-card" class="bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-2xl w-full max-w-md border border-white relative overflow-hidden">
        
        <!-- Header -->
        <div class="text-center mb-8">
            <h1 class="eid-font text-5xl text-pink-600 mb-2">Eid Mubarak</h1>
            <p class="text-pink-400 font-semibold uppercase tracking-widest text-sm">Digital Salami Wheel</p>
        </div>

        <!-- Section 1: Entry Form -->
        <div id="form-section" class="space-y-6">
            <div class="text-center">
                <img src="https://img.icons8.com/bubbles/200/girl.png" alt="Cute Avatar" class="w-32 h-32 mx-auto mb-4">
                <p class="text-gray-600 italic">"Eid is here! Enter your name and phone to see how much salami you get!"</p>
            </div>
            <div>
                <label class="block text-pink-700 text-sm font-bold mb-2">Your Name</label>
                <input type="text" id="userName" placeholder="Type your name..." 
                       class="w-full px-4 py-3 rounded-xl border-2 border-pink-100 focus:border-pink-400 outline-none transition-all">
            </div>
            <div>
                <label class="block text-pink-700 text-sm font-bold mb-2">Phone Number</label>
                <input type="tel" id="userPhone" placeholder="01XXX-XXXXXX" 
                       class="w-full px-4 py-3 rounded-xl border-2 border-pink-100 focus:border-pink-400 outline-none transition-all">
            </div>
            <button onclick="startApp()" class="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 rounded-xl shadow-lg transform active:scale-95 transition-all">
                Let's Play! ➜
            </button>
        </div>

        <!-- Section 2: Spinner -->
        <div id="spin-section" class="hidden-section flex flex-col items-center">
            <div class="relative mb-8">
                <!-- Pointer -->
                <div class="pointer">
                    <svg viewBox="0 0 24 24" fill="#db2777">
                        <path d="M12 21l-12-18h24z"/>
                    </svg>
                </div>
                <!-- Wheel -->
                <div id="wheel-container"></div>
            </div>
            
            <p id="spin-status" class="text-pink-600 font-bold mb-4 h-6">Who will get the big prize?</p>
            
            <button id="spinBtn" onclick="spinWheel()" class="w-full bg-gradient-to-r from-pink-500 to-rose-400 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-pink-200/50 transition-all active:scale-95">
                SPIN (5 SECONDS)
            </button>
        </div>

        <!-- Section 3: Result -->
        <div id="result-section" class="hidden-section text-center py-6">
            <div id="result-emoji" class="mb-4 text-7xl emoji-pop">
                😶
            </div>
            <h2 class="text-2xl font-bold text-gray-800 mb-2">Hey <span id="display-name" class="text-pink-600"></span>!</h2>
            <div class="bg-pink-50 rounded-2xl p-6 border-2 border-dashed border-pink-200 mb-6 relative">
                <p class="text-gray-600 mb-1">You got</p>
                <p class="text-6xl font-black text-pink-600 tracking-tighter"><span id="amount-won">0</span> TK</p>
                <p id="emoji-text" class="text-gray-500 mt-2 font-medium">Eid Salami 😶</p>
            </div>
            <button onclick="location.reload()" class="bg-gray-100 text-gray-600 px-6 py-2 rounded-full font-bold hover:bg-gray-200 transition-all">
                Try Another Spin?
            </button>
        </div>
    </div>

    <!-- Background Sparkles Container -->
    <div id="sparkle-container"></div>

    <script>
        const amounts = [2, 5, 20, 10, 2, 15, 5, 18, 2, 7, 20, 5];
        const colors = ['#fff1f2', '#fce7f3', '#fbcfe8', '#f9a8d4', '#f472b6', '#db2777'];
        let isSpinning = false;
        let currentRotation = 0;

        function initWheel() {
            const container = document.getElementById('wheel-container');
            const segmentAngle = 360 / amounts.length;
            
            amounts.forEach((amt, i) => {
                const seg = document.createElement('div');
                seg.className = 'wheel-segment';
                seg.style.transform = rotate(${i * segmentAngle}deg);
                seg.style.backgroundColor = colors[i % colors.length];
                
                const label = document.createElement('div');
                label.className = 'segment-label';
                label.innerText = amt + '৳';
                label.style.color = i > amounts.length/2 ? '#fff' : '#be185d';
                
                seg.appendChild(label);
                container.appendChild(seg);
            });
        }

        function startApp() {
            const name = document.getElementById('userName').value.trim();
            const phone = document.getElementById('userPhone').value.trim();
            
            if (!name || !phone) {
                showToast("Please enter your name and phone! 🌸");
                return;
            }
            
            document.getElementById('form-section').classList.add('hidden-section');
            document.getElementById('spin-section').classList.remove('hidden-section');
            initWheel();
        }

        function spinWheel() {
            if (isSpinning) return;
            isSpinning = true;
            
            const btn = document.getElementById('spinBtn');
            const status = document.getElementById('spin-status');
            const wheel = document.getElementById('wheel-container');
            
            btn.disabled = true;
            btn.classList.add('opacity-50', 'cursor-not-allowed');
            status.innerText = "Wait for it... 🎡";
            
            const randomIndex = Math.floor(Math.random() * amounts.length);
            const selectedAmount = amounts[randomIndex];
            
            const segmentAngle = 360 / amounts.length;
            // Calculate rotation to land on the chosen index
            // We rotate several times (10 full turns = 3600deg) then subtract the segment position
            const extraRotation = 3600; 
            const stopAt = (360 - (randomIndex * segmentAngle)) - (segmentAngle/2);
            currentRotation += extraRotation + stopAt;
            
            wheel.style.transform = rotate(${currentRotation}deg);
            
            setTimeout(() => {
                showResult(selectedAmount);
            }, 5000);
        }

        function showResult(amount) {
            const name = document.getElementById('userName').value;
            const emojiDiv = document.getElementById('result-emoji');
            const emojiText = document.getElementById('emoji-text');
            
            document.getElementById('display-name').innerText = name;
            document.getElementById('amount-won').innerText = amount;
            
            // DYNAMIC EMOTIONAL EMOJI LOGIC
            let emoji = '😶';
            let note = 'Eid Salami 😶';

            if (amount <= 5) {
                const choices = [
                    {e: '😒', n: 'So stingy! 😒'},
                    {e: '🥲', n: 'Better than nothing... 🥲'},
                    {e: '💀', n: 'Kanjoos level 100 💀'},
                    {e: '🤏', n: 'Just a little bit 🤏'}
                ];
                const res = choices[Math.floor(Math.random()*choices.length)];
                emoji = res.e; note = res.n;
            } else if (amount > 5 && amount <= 14) {
                const choices = [
                    {e: '🙂', n: 'It is okay! 🙂'},
                    {e: '👌', n: 'Not bad at all! 👌'},
                    {e: '🍫', n: 'Can buy chocolate now! 🍫'},
                    {e: '✨', n: 'A nice gift! ✨'}
                ];
                const res = choices[Math.floor(Math.random()*choices.length)];
                emoji = res.e; note = res.n;
            } else {
                const choices = [
                    {e: '🥳', n: 'JACKPOT! PARTY TIME! 🥳'},
                    {e: '😍', n: 'Wow! Best Eid ever! 😍'},
                    {e: '🤑', n: 'Richie Rich vibes! 🤑'},
                    {e: '💎', n: 'You are lucky! 💎'}
                ];
                const res = choices[Math.floor(Math.random()*choices.length)];
                emoji = res.e; note = res.n;
            }

            emojiDiv.innerText = emoji;
            emojiText.innerText = note;
            
            document.getElementById('spin-section').classList.add('hidden-section');
            document.getElementById('result-section').classList.remove('hidden-section');
            
            createConfetti();
        }

        function showToast(msg) {
            const toast = document.createElement('div');
            toast.className = 'fixed bottom-10 left-1/2 -translate-x-1/2 bg-pink-600 text-white px-6 py-3 rounded-full shadow-2xl font-bold z-50 animate-bounce';
            toast.innerText = msg;
            document.body.appendChild(toast);
            setTimeout(() => toast.remove(), 3000);
        }

        function createConfetti() {
            const container = document.getElementById('sparkle-container');
            for (let i = 0; i < 40; i++) {
                const s = document.createElement('div');
                s.className = 'sparkle text-2xl';
                s.innerText = ['🌸', '✨', '💖', '💸', '⭐', '🎈'][Math.floor(Math.random()*6)];
                s.style.left = Math.random() * 100 + 'vw';
                s.style.top = Math.random() * 100 + 'vh';
                s.style.animationDuration = (Math.random() * 2 + 1) + 's';
                container.appendChild(s);
            }
        }
    </script>
</body>
</html>