/**
 * WishlistTable Component
 * 
 * Displays a table of wishlist submissions from children.
 * Includes filtering and sorting capabilities for better data management.
 */

'use client';

import { useState, useEffect } from 'react';
import ResponsePopup from './ResponsePopup';

export default function WishlistTable() {
    const [submissions, setSubmissions] = useState([]);
    const [userWishlists, setUserWishlists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedResponse, setSelectedResponse] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedWishlist, setSelectedWishlist] = useState('all');

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);
            // First get user's wishlists
            const wishlistsResponse = await fetch('/api/wishlists');
            const wishlistsResult = await wishlistsResponse.json();

            if (!wishlistsResponse.ok) {
                throw new Error(wishlistsResult.error || 'Failed to fetch wishlists');
            }

            if (wishlistsResult.success) {
                setUserWishlists(wishlistsResult.data);

                // Get all responses for each wishlist
                const allResponses = [];
                for (const wishlist of wishlistsResult.data) {
                    const responsesResponse = await fetch(`/api/wishlists/${wishlist.id}/responses`);
                    const responsesResult = await responsesResponse.json();
                    
                    if (responsesResponse.ok && responsesResult.success) {
                        // Add wishlist info to each response for better context
                        const responsesWithContext = responsesResult.data.map(response => ({
                            ...response,
                            wishlist_name: wishlist.family_name
                        }));
                        allResponses.push(...responsesWithContext);
                    }
                }

                setSubmissions(allResponses);
                setError(null);
            }
        } catch (err) {
            console.error('Error loading data:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const filteredSubmissions = submissions.filter(sub => {
        if (!sub || !sub.child_name || !sub.message) return false;
        
        const matchesSearch = (sub.child_name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                            (sub.message?.toLowerCase() || '').includes(searchTerm.toLowerCase());
        const matchesWishlist = selectedWishlist === 'all' || sub.wishlist_id === selectedWishlist;
        return matchesSearch && matchesWishlist;
    });

    if (loading) {
        return (
            <div className="flex justify-center items-center p-8">
                <div className="loading loading-spinner loading-lg text-primary"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="alert alert-error">
                <span>Error loading responses: {error}</span>
            </div>
        );
    }

    if (!submissions.length) {
        return (
            <div className="text-center p-8 text-gray-400">
                No responses yet
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* Search and Filter Section */}
            <div className="flex gap-4 mb-6">
                <input 
                    type="text" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search submissions..." 
                    className="input input-bordered bg-gray-800 border-gray-600 text-gray-100 placeholder-gray-400 w-full max-w-xs" 
                />
                <select 
                    value={selectedWishlist}
                    onChange={(e) => setSelectedWishlist(e.target.value)}
                    className="select select-bordered bg-gray-800 border-gray-600 text-gray-100 w-full max-w-xs"
                >
                    <option value="all">All Wishlists</option>
                    {userWishlists.map(wishlist => (
                        <option key={wishlist.id} value={wishlist.id}>
                            {wishlist.family_name}'s Wishlist
                        </option>
                    ))}
                </select>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-lg bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 border border-gray-600">
                <table className="table w-full">
                    <thead>
                        <tr className="bg-gray-900/50">
                            <th className="text-gray-300">Child's Name</th>
                            <th className="text-gray-300">Wishlist</th>
                            <th className="text-gray-300">Message Preview</th>
                            <th className="text-gray-300">Submitted</th>
                            <th className="text-gray-300">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredSubmissions.map((submission) => (
                            <tr key={submission.id} className="border-b border-gray-700 hover:bg-gray-700/50">
                                <td className="text-gray-200">{submission.child_name}</td>
                                <td className="text-gray-200">{submission.wishlist_name}</td>
                                <td className="max-w-md truncate text-gray-200">{submission.message}</td>
                                <td className="text-gray-200">{new Date(submission.created_at).toLocaleDateString()}</td>
                                <td>
                                    <div className="flex gap-2">
                                        <button 
                                            className="btn btn-ghost btn-sm text-gray-300 hover:text-gray-100"
                                            onClick={() => setSelectedResponse(submission)}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Response Popup */}
            <ResponsePopup
                response={selectedResponse}
                onClose={() => setSelectedResponse(null)}
            />
        </div>
    );
} 