/**
 * Wishlist Page for Kids
 * 
 * A magical interface where children can write and send their wishlist to Santa.
 * Uses URL parameter to load the specific wishlist from Supabase database.
 */

import { createClient } from "@/libs/supabase/server";
import { notFound } from "next/navigation";
import WishlistReplyForm from '@/components/wishlist/WishlistReplyForm';
import LetterContent from '@/components/wishlist/LetterContent';

export const dynamic = "force-dynamic";

async function getWishlistData(id) {
    try {
        const supabase = createClient();
        
        // Fetch the wishlist from Supabase
        const { data, error } = await supabase
            .from('wishlists')
            .select('*')
            .eq('id', id)
            .maybeSingle();

        if (error) {
            console.error('Error fetching wishlist:', error);
            return null;
        }

        // If no wishlist found, return null
        if (!data) {
            console.log('No wishlist found with id:', id);
            return null;
        }

        return data;
    } catch (error) {
        console.error('Error in getWishlistData:', error);
        return null;
    }
}

export default async function WishlistPage({ params }) {
    const wishlistData = await getWishlistData(params.id);

    if (!wishlistData) {
        notFound();
    }

    // Format children's names with proper grammar
    const formatChildrenNames = (children) => {
        if (!children || children.length === 0) return '';
        if (children.length === 1) return children[0];
        if (children.length === 2) return `${children[0]} and ${children[1]}`;
        return children.slice(0, -1).join(', ') + ', and ' + children[children.length - 1];
    };

    return (
        <main className="min-h-screen bg-[#121212] relative overflow-hidden">
            {/* Background Image with Fade Effect */}
            <div 
                className="absolute inset-0 opacity-50"
                style={{
                    backgroundImage: 'url("/blog/introducing-supabase/effects/christmas_villiage.png")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    opacity: 0.2,
                    maskImage: 'linear-gradient(to right, transparent, black 100px, black calc(100% - 100px), transparent), linear-gradient(to bottom, transparent, black 100px, black calc(100% - 100px), transparent)',
                    WebkitMaskImage: 'linear-gradient(to right, transparent, black 100px, black calc(100% - 100px), transparent), linear-gradient(to bottom, transparent, black 100px, black calc(100% - 100px), transparent)',
                }}
            />

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

            <div className="w-full min-h-screen px-4 relative z-20 grid place-items-center">
                {/* Envelope Container */}
                <div id="envelopeContainer" className="relative w-full max-w-3xl mx-auto">
                    {/* Envelope Back */}
                    <div className="bg-white rounded-lg shadow-2xl overflow-visible transform hover:rotate-1 transition-transform duration-300"
                        style={{
                            background: 'repeating-linear-gradient(45deg, #f8f8f8, #f8f8f8 10px, #ffffff 10px, #ffffff 20px)',
                            width: '100%',
                            maxWidth: '600px',
                            margin: '0 auto'
                        }}>
                        {/* Envelope Flap (Open) */}
                        <div className="absolute inset-x-0 -top-20 h-24 origin-bottom"
                            style={{
                                clipPath: 'polygon(0 100%, 50% 0, 100% 100%)',
                                background: 'repeating-linear-gradient(45deg, #f0f0f0, #f0f0f0 10px, #f8f8f8 10px, #f8f8f8 20px)',
                                transform: 'rotate(0deg) translateY(-13px)'
                            }}>
                        </div>

                        {/* Red Wax Seal */}
                        <div className="absolute -right-6 -top-6 w-24 h-24 bg-red-600 rounded-full flex items-center justify-center transform rotate-12 shadow-xl z-20"
                            style={{
                                background: 'radial-gradient(circle at 30% 30%, #dc2626, #991b1b)'
                            }}>
                            <div className="text-white text-center leading-relaxed relative font-medium"
                                style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>
                                <div className="text-lg tracking-wide">NORTH</div>
                                <div className="text-lg tracking-wide">POLE</div>
                                <div className="absolute inset-0 border-4 border-white/20 rounded-full transform -rotate-45"></div>
                            </div>
                        </div>

                        {/* Letter Content */}
                        <div className="relative bg-white mx-2 mb-8 p-8 rounded shadow-lg transform translate-y-8 w-full"
                            style={{
                                background: 'linear-gradient(0deg, #ffffff 0%, #f8f8f8 100%)'
                            }}>
                            <LetterContent 
                                name={formatChildrenNames(wishlistData.children)}
                                note={wishlistData.note}
                            />
                        </div>
                    </div>
                </div>

                <div className="absolute inset-0 grid place-items-center wishlist-reply-form hidden" id="replyForm">
                    <WishlistReplyForm wishlistId={params.id} />
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/5 to-transparent" />
        </main>
    );
} 