/**
 * WishlistGrid Component
 * 
 * Displays a grid of wishlist cards styled as envelopes.
 * Includes functionality to create new wishlists via a popup.
 */

'use client';

import { useState, useEffect } from 'react';
import ChristmasButton from './ChristmasButton';
import CreateWishlistPopup from './CreateWishlistPopup';
import { useRouter } from 'next/navigation';
import ShareWishlistPopup from './ShareWishlistPopup';
import toast from 'react-hot-toast';

export default function WishlistGrid() {
    const router = useRouter();
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [wishlists, setWishlists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [shareUrl, setShareUrl] = useState('');
    const [isSharePopupOpen, setIsSharePopupOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        loadWishlists();
    }, []);

    async function loadWishlists() {
        try {
            setLoading(true);
            // First get user's wishlists
            const wishlistsResponse = await fetch('/api/wishlists');
            const wishlistsResult = await wishlistsResponse.json();

            if (!wishlistsResponse.ok) {
                throw new Error(wishlistsResult.error || 'Failed to load wishlists');
            }

            if (wishlistsResult.success) {
                setWishlists(wishlistsResult.data);
                setError(null);
            }
        } catch (err) {
            console.error('Error loading wishlists:', err);
            setError(err.message);
            toast.error('Failed to load wishlists. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    const handleCreateWishlist = async (formData) => {
        try {
            const response = await fetch('/api/wishlists', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            const result = await response.json();

            if (response.ok && result.success) {
                setWishlists([...wishlists, result.data]);
                setIsPopupOpen(false);
                setError(null);
                toast.success('Wishlist created successfully!');
            } else {
                throw new Error(result.error || 'Failed to create wishlist');
            }
        } catch (err) {
            console.error('Error creating wishlist:', err);
            setError(err.message);
            toast.error('Failed to create wishlist. Please try again.');
        }
    };

    const handleDelete = async (wishlistId) => {
        if (!window.confirm('Are you sure you want to delete this wishlist? This will also delete all responses. This action cannot be undone.')) {
            return;
        }

        try {
            setIsDeleting(true);
            const response = await fetch(`/api/wishlists/${wishlistId}`, {
                method: 'DELETE'
            });
            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Failed to delete wishlist');
            }

            if (result.success) {
                setWishlists(wishlists.filter(w => w.id !== wishlistId));
                toast.success('Wishlist deleted successfully');
            } else {
                throw new Error(result.error || 'Failed to delete wishlist');
            }
        } catch (err) {
            console.error('Error deleting wishlist:', err);
            toast.error(err.message || 'Failed to delete wishlist. Please try again.');
        } finally {
            setIsDeleting(false);
        }
    };

    const handleViewWishlist = (wishlistId) => {
        router.push(`/wishlist/${wishlistId}`);
    };

    const handleShare = (wishlistId) => {
        const url = `${window.location.origin}/wishlist/${wishlistId}`;
        setShareUrl(url);
        setIsSharePopupOpen(true);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center p-8">
                <div className="loading loading-spinner loading-lg text-primary"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Create New Wishlist Button - Always visible */}
            <div className="flex justify-end">
                <ChristmasButton 
                    variant="primary" 
                    onClick={() => setIsPopupOpen(true)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Create New Wishlist
                </ChristmasButton>
            </div>

            {/* Create Wishlist Popup */}
            <CreateWishlistPopup 
                isOpen={isPopupOpen}
                onClose={() => setIsPopupOpen(false)}
                onSubmit={handleCreateWishlist}
            />

            {error && (
                <div className="alert alert-error">
                    <span>Error: {error}</span>
                </div>
            )}

            {!wishlists.length ? (
                <div className="text-center p-8 space-y-6">
                    <p className="text-gray-400 text-lg">No wishlists yet. Here&apos;s how to get started:</p>
                    <div className="max-w-xl mx-auto text-left space-y-4">
                        <div className="flex items-start gap-3">
                            <span className="bg-gray-800 text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">1</span>
                            <p className="text-gray-400">Click the "Create New Wishlist" button above to create a wishlist group for your family</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="bg-gray-800 text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">2</span>
                            <p className="text-gray-400">Add your family name, children&apos;s names, and write a special message from Santa that they&apos;ll see in their letter</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="bg-gray-800 text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">3</span>
                            <p className="text-gray-400">Click the eye icon to view Santa&apos;s letter, and use the share button to send the magical letter link to your children</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="bg-gray-800 text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">4</span>
                            <p className="text-gray-400">Your children can read their personalized letter from Santa and write their Christmas wishes back to him</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="bg-gray-800 text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">5</span>
                            <p className="text-gray-400">View all your children&apos;s responses and manage their Christmas wishes right here in the dashboard</p>
                        </div>
                    </div>
                </div>
            ) : (
                /* Existing Wishlists Grid */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlists.map((wishlist) => (
                        <div key={wishlist.id} className="relative group">
                            {/* Envelope Flap (top triangle) */}
                            <div className="absolute inset-x-0 -top-4 h-12 bg-white transform origin-bottom transition-transform group-hover:rotate-x-180"
                                 style={{
                                     clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                                     transformStyle: 'preserve-3d',
                                     boxShadow: '0 -2px 5px rgba(0,0,0,0.1)'
                                 }}>
                            </div>
                            
                            {/* Main Envelope Body */}
                            <div className="card bg-white hover:shadow-xl transition-shadow duration-300 border border-gray-200"
                                 style={{
                                     background: 'repeating-linear-gradient(45deg, #f8f8f8, #f8f8f8 10px, #ffffff 10px, #ffffff 20px)'
                                 }}>
                                <div className="card-body">
                                    {/* Red Wax Seal Effect */}
                                    <div className="absolute -right-3 -top-3 w-16 h-16 bg-red-600 rounded-full flex items-center justify-center transform rotate-12 shadow-lg z-10"
                                        style={{
                                            background: 'radial-gradient(circle at 30% 30%, #dc2626, #991b1b)'
                                        }}>
                                        <div className="text-white text-sm font-bold">SANTA</div>
                                    </div>

                                    <h2 className="card-title font-extrabold text-2xl text-gray-900">{wishlist.family_name}&apos;s Wishlist</h2>
                                    <div className="space-y-2 mt-4">
                                        <p className="text-gray-600">Created: {new Date(wishlist.created_at).toLocaleDateString()}</p>
                                        <p className="text-gray-600">Responses: {wishlist.responses_count}</p>
                                        <p className="text-gray-600 text-sm">Created by: {wishlist.user_email}</p>
                                    </div>
                                    
                                    {/* Action Buttons */}
                                    <div className="card-actions justify-end mt-4 border-t pt-4 border-gray-200">
                                        <button 
                                            className="btn btn-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md px-3 py-2 transition-colors"
                                            onClick={() => handleShare(wishlist.id)}
                                            title="Share Wishlist"
                                            disabled={isDeleting}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
                                            </svg>
                                        </button>
                                        <button 
                                            className="btn btn-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md px-3 py-2 transition-colors"
                                            onClick={() => handleViewWishlist(wishlist.id)}
                                            title="View Wishlist"
                                            disabled={isDeleting}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </button>
                                        <button 
                                            className="btn btn-sm bg-red-100 hover:bg-red-200 text-red-700 rounded-md px-3 py-2 transition-colors"
                                            onClick={() => handleDelete(wishlist.id)}
                                            title="Delete Wishlist"
                                            disabled={isDeleting}
                                        >
                                            {isDeleting ? (
                                                <div className="w-5 h-5 border-t-2 border-red-700 rounded-full animate-spin" />
                                            ) : (
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                </svg>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Share Wishlist Popup */}
            <ShareWishlistPopup 
                isOpen={isSharePopupOpen}
                onClose={() => setIsSharePopupOpen(false)}
                wishlistUrl={shareUrl}
            />
        </div>
    );
} 