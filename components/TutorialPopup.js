/**
 * TutorialPopup Component
 * 
 * A festive popup showing a tutorial video for new users.
 * Uses localStorage to remember if the user has seen the tutorial.
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import ChristmasButton from './ChristmasButton';

export default function TutorialPopup({ forceOpen, onClose }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const handleDismiss = useCallback(() => {
    localStorage.setItem('hasTutorialPopupClosed', 'true');
    setIsOpen(false);
    if (onClose) onClose();
  }, [onClose]);

  useEffect(() => {
    setMounted(true);
    const hasSeen = localStorage.getItem('hasTutorialPopupClosed');
    if (!hasSeen || forceOpen) {
      setIsOpen(true);
    }
  }, [forceOpen]);

  // Don't render anything on server side
  if (!mounted) return null;
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[9999] flex items-center justify-center p-4">
      <div className="relative max-w-2xl w-full animate-float-in">
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
        <div 
          className="absolute -right-3 -top-3 w-16 h-16 bg-red-600 rounded-full flex items-center justify-center transform rotate-12 shadow-lg z-30"
          style={{
            background: 'radial-gradient(circle at 30% 30%, #dc2626, #991b1b)'
          }}
        >
          <span className="text-3xl">🎅</span>
        </div>

        {/* Popup Content */}
        <div 
          className="relative bg-white rounded-lg shadow-xl overflow-hidden"
          style={{
            background: 'repeating-linear-gradient(45deg, #f8f8f8, #f8f8f8 10px, #ffffff 10px, #ffffff 20px)',
          }}
        >
          <div className="p-6 space-y-4">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-4">Ho Ho Ho! Let me show you around! 🎄</h2>

            <div className="aspect-video rounded-lg overflow-hidden bg-gray-100 shadow-inner">
              <video
                className="w-full h-full object-cover"
                controls
                playsInline
                preload="metadata"
                autoPlay
              >
                <source src="/videos/Demo_shrunk.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            <div className="text-gray-700 font-medium space-y-2">
              <p>The elves have prepared a quick tutorial to help you get started:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Create personalized letters from Santa</li>
                <li>Share the magic link with your children</li>
                <li>Track all their Christmas wishes in one place</li>
                <li>Spread Christmas joy with ease!</li>
              </ul>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t">
              <ChristmasButton 
                onClick={handleDismiss}
                className="font-extrabold"
              >
                Got it! 🎁
              </ChristmasButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 