import React from 'react';

export default function Lanterns() {
    return (
        <>
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
        </>
    );
}
