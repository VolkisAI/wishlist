/**
 * AdminTabs Component
 * 
 * This component provides tab navigation for the admin dashboard,
 * allowing users to switch between viewing wishlists and submissions.
 * Uses custom Christmas-themed styling.
 */

'use client';

import { useState } from 'react';
import WishlistGrid from './WishlistGrid';
import WishlistTable from './WishlistTable';
import ChristmasButton from './ChristmasButton';

export default function AdminTabs() {
    const [activeTab, setActiveTab] = useState('wishlists');

    return (
        <div className="w-full">
            {/* Tab Navigation */}
            <div className="flex justify-center gap-4 mb-6">
                <ChristmasButton
                    variant={activeTab === 'wishlists' ? 'primary' : 'default'}
                    onClick={() => setActiveTab('wishlists')}
                    className="min-w-[150px]"
                >
                    My Wishlists
                </ChristmasButton>
                <ChristmasButton
                    variant={activeTab === 'submissions' ? 'primary' : 'default'}
                    onClick={() => setActiveTab('submissions')}
                    className="min-w-[150px]"
                >
                    Submissions
                </ChristmasButton>
            </div>

            {/* Tab Content */}
            <div className="mt-4">
                {activeTab === 'wishlists' && <WishlistGrid />}
                {activeTab === 'submissions' && <WishlistTable />}
            </div>
        </div>
    );
} 