/**
 * MobileWarningPopup Component
 * 
 * A festive popup warning for mobile users that the site is best viewed on desktop.
 * Uses localStorage to remember if the user has dismissed the popup.
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import ChristmasButton from './ChristmasButton';

export default function MobileWarningPopup({ onVisibilityChange }) {
    const [mounted, setMounted] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    
    const handleDismiss = useCallback(() => {
        // Set the localStorage flag
        localStorage.setItem('hasSeenMobileWarning', 'true');
        // Hide the popup locally
        setIsVisible(false);
        // Notify parent component
        if (onVisibilityChange) {
            onVisibilityChange(false);
        }
    }, [onVisibilityChange]);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Don't render anything on server side or if dismissed
    if (!mounted || !isVisible) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[9999] flex items-center justify-center p-4">
            <div className="relative max-w-sm w-full animate-float-in">
                {/* Snow Cap Overlay */}
                <div 
                    className="absolute -top-[6px] left-0 w-full h-7 z-10"
                    style={{
                        borderImageSource: 'url("/blog/introducing-supabase/effects/snow-cap.webp")',
                        borderImageSlice: 'calc(6 * 56 / 20) fill',
                        borderImageWidth: 'calc(28px / 3)',
                        borderImageRepeat: 'round',
                        filter: 'drop-shadow(0 2px 1px rgba(0,0,0,0.25))',
                    }}
                />

                {/* Santa Seal */}
                <div className="absolute -right-3 -top-3 w-16 h-16 bg-red-600 rounded-full flex items-center justify-center transform rotate-12 shadow-lg z-30"
                    style={{
                        background: 'radial-gradient(circle at 30% 30%, #dc2626, #991b1b)'
                    }}>
                    <span className="text-3xl">🎅</span>
                </div>

                {/* Popup Content */}
                <div className="relative bg-white rounded-lg shadow-xl overflow-hidden"
                    style={{
                        background: 'repeating-linear-gradient(45deg, #f8f8f8, #f8f8f8 10px, #ffffff 10px, #ffffff 20px)',
                    }}>
                    <div className="p-6 space-y-4">
                        <h2 className="text-2xl font-extrabold text-gray-900 mb-4">Ho Ho Ho! 🎄</h2>
                        
                        <p className="text-gray-700 font-medium">
                            I see you&apos;re visiting on a mobile device! My elves are still 
                            working hard to make the magic perfect for smaller screens.
                        </p>
                        
                        <p className="text-gray-700 font-medium">
                            For the best Christmas experience, please visit from a computer!
                        </p>

                        <div className="flex justify-end space-x-3 pt-4 border-t">
                            <ChristmasButton 
                                onClick={handleDismiss}
                                className="font-extrabold"
                            >
                                Continue Anyway 🎁
                            </ChristmasButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 