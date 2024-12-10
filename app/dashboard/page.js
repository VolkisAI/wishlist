/**
 * Admin Dashboard Page
 * 
 * Main administrative interface for parents to manage their children&apos;s wishlists
 * and view submissions. Protected by authentication in layout.js.
 */

'use client';

import ButtonAccount from "@/components/ButtonAccount";
import AdminTabs from "@/components/AdminTabs";
import MobileWarningPopup from '@/components/MobileWarningPopup';
import TutorialPopup from '@/components/TutorialPopup';
import { useState, useEffect } from 'react';

export const dynamic = "force-dynamic";

export default function Dashboard() {
  const [showTutorial, setShowTutorial] = useState(false);
  const [isMobileWarningVisible, setIsMobileWarningVisible] = useState(true);
  const [mobileCheckComplete, setMobileCheckComplete] = useState(false);

  // Check mobile warning first
  useEffect(() => {
    const hasSeenMobileWarning = localStorage.getItem('hasSeenMobileWarning');
    const isMobile = window.innerWidth < 800;
    const shouldShowMobile = isMobile && !hasSeenMobileWarning;
    setIsMobileWarningVisible(shouldShowMobile);
    setMobileCheckComplete(true);

    // Only check tutorial if we're not showing mobile warning
    if (!shouldShowMobile) {
      const hasSeenTutorial = localStorage.getItem('hasTutorialPopupClosed');
      if (!hasSeenTutorial) {
        setShowTutorial(true);
      }
    }
  }, []);

  // Handle mobile warning visibility
  const handleMobileWarningVisibility = (isVisible) => {
    setIsMobileWarningVisible(isVisible);
    if (!isVisible) {
      const hasSeenTutorial = localStorage.getItem('hasTutorialPopupClosed');
      if (!hasSeenTutorial) {
        setTimeout(() => {
          setShowTutorial(true);
        }, 500);
      }
    }
  };

  // Don't render anything until mobile check is complete
  if (!mobileCheckComplete) return null;

  return (
    <>
      {/* Show mobile warning with highest priority */}
      {isMobileWarningVisible && (
        <MobileWarningPopup onVisibilityChange={handleMobileWarningVisibility} />
      )}
      
      {/* Only show tutorial if mobile warning is not visible */}
      {!isMobileWarningVisible && showTutorial && (
        <TutorialPopup 
          forceOpen={true} 
          onClose={() => setShowTutorial(false)} 
        />
      )}

      <main className="min-h-screen p-8 pb-24 bg-[#121212] relative overflow-hidden">
        {/* Snow Effect Container */}
        <div className="snow-container fixed inset-0 pointer-events-none z-10">
          {[...Array(150)].map((_, i) => (
            <div 
              key={i} 
              className="snow"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * -20}s`
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto space-y-8 relative z-20">
          {/* Header Section */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-100">Santa&apos;s Admin Dashboard</h1>
              <p className="text-gray-400 mt-2">Manage your children&apos;s wishlists and view their messages to Santa</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => !isMobileWarningVisible && setShowTutorial(true)}
                className="btn btn-circle btn-ghost text-white hover:bg-white/10 transition-all duration-300"
                aria-label="Show Help"
                disabled={isMobileWarningVisible}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="currentColor" 
                  className="w-6 h-6"
                >
                  <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" />
                </svg>
              </button>
              <ButtonAccount />
            </div>
          </div>

          {/* Main Content */}
          <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-box p-6 shadow-lg">
            <AdminTabs />
          </div>
        </div>
      </main>
    </>
  );
}
