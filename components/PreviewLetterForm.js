'use client';

import { useState } from 'react';
import NavigationButton from './NavigationButton';

export default function PreviewLetterForm() {
    // This is just for preview, so we'll use placeholder text
    const [message, setMessage] = useState('');
    const [name, setName] = useState('');

    return (
        <div className="relative w-full max-w-2xl mx-auto">
            {/* Paper Background with Snow Effect */}
            <div
                className="relative bg-white rounded-lg shadow-2xl overflow-visible transform -rotate-6"
                style={{
                    backgroundImage: 'repeating-linear-gradient(45deg, #f8f8f8, #f8f8f8 10px, #ffffff 10px, #ffffff 20px)',
                    width: '100%',
                    maxWidth: '500px',
                    margin: '0 auto',
                    transform: 'scale(0.85) rotate(-6deg)',
                }}
            >
                {/* Envelope Flap (Open) */}
                <div className="absolute inset-x-0 -top-16 h-20 origin-bottom"
                    style={{
                        clipPath: 'polygon(0 100%, 50% 0, 100% 100%)',
                        background: 'repeating-linear-gradient(45deg, #f0f0f0, #f0f0f0 10px, #f8f8f8 10px, #f8f8f8 20px)',
                        transform: 'rotate(0deg) translateY(-11px)'
                    }}>
                </div>

                {/* Red Wax Seal */}
                <div className="absolute -right-4 -top-4 w-20 h-20 bg-red-600 rounded-full flex items-center justify-center transform rotate-12 shadow-xl z-20"
                    style={{
                        background: 'radial-gradient(circle at 30% 30%, #dc2626, #991b1b)'
                    }}>
                    <div className="text-white text-center leading-relaxed relative font-medium"
                        style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>
                        <div className="text-base tracking-wide">NORTH</div>
                        <div className="text-base tracking-wide">POLE</div>
                        <div className="absolute inset-0 border-4 border-white/20 rounded-full transform -rotate-45"></div>
                    </div>
                </div>

                {/* Form Content */}
                <div className="relative bg-white mx-2 mb-6 p-4 rounded shadow-lg transform translate-y-6">
                    {/* Letter Header */}
                    <div className="text-right mb-4 text-gray-700 border-b border-gray-200 pb-2">
                        <h2 className="text-lg font-medium mb-1">North Pole Post</h2>
                        <p className="text-base font-medium">Santa&apos;s Workshop</p>
                        <p className="text-base font-medium">North Pole, Arctic Circle</p>
                    </div>

                    <div className="space-y-4">
                        {/* Letter Start */}
                        <p className="text-lg font-medium text-gray-900 mb-2">Dear Santa,</p>

                        {/* Message Area */}
                        <div className="relative">
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Write your Christmas wishes here..."
                                className="w-full h-32 bg-transparent text-gray-900 text-base font-medium p-3 border-none focus:ring-0 resize-none placeholder-gray-400 leading-7"
                                style={{
                                    backgroundImage: 'repeating-linear-gradient(transparent, transparent 27px, #e5e7eb 27px, #e5e7eb 28px)',
                                    backgroundAttachment: 'local',
                                    lineHeight: '28px',
                                    paddingTop: '7px'
                                }}
                            />
                        </div>

                        {/* Letter Signature */}
                        <div className="space-y-1 pt-2">
                            <p className="text-lg font-medium text-gray-900">From,</p>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Your name here..."
                                className="w-full bg-transparent text-gray-900 text-base font-medium p-3 border-b-2 border-gray-200 focus:border-gray-300 focus:ring-0 placeholder-gray-400 leading-7"
                            />
                        </div>

                        <div className="mt-4 flex justify-end">
                            <NavigationButton href="/signin">
                                ✨ Write to Santa ✨
                            </NavigationButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 