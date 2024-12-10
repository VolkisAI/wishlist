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
import { useEffect } from 'react';

export const dynamic = "force-dynamic";

export default function Dashboard() {
  return (
    <>
      <MobileWarningPopup />
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
            <ButtonAccount />
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
