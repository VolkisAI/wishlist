import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

/**
 * @endpoint POST /api/wishlists/responses
 * @desc Submit a response to a wishlist
 * @access Public
 * @body {
 *   wishlistId: string,
 *   childName: string,
 *   message: string
 * }
 */
export async function POST(req) {
    try {
        const data = await req.json();
        const cookieStore = cookies();
        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
            {
                cookies: {
                    get(name) {
                        return cookieStore.get(name)?.value;
                    },
                    set(name, value, options) {
                        cookieStore.set(name, value, options);
                    },
                    remove(name, options) {
                        cookieStore.set(name, '', options);
                    },
                },
            }
        );

        if (!data.wishlistId) {
            return NextResponse.json(
                { error: 'Wishlist ID is required' },
                { status: 400 }
            );
        }

        // Verify wishlist exists
        const { data: wishlist, error: wishlistError } = await supabase
            .from('wishlists')
            .select('id')
            .eq('id', data.wishlistId)
            .single();

        if (wishlistError || !wishlist) {
            console.error('Error finding wishlist:', wishlistError);
            return NextResponse.json(
                { error: 'Wishlist not found' },
                { status: 404 }
            );
        }

        // Save response to Supabase
        const { data: response, error: responseError } = await supabase
            .from('responses')
            .insert({
                wishlist_id: data.wishlistId,
                child_name: data.childName,
                message: data.message,
                created_at: new Date().toISOString()
            })
            .select()
            .single();

        if (responseError) {
            console.error('Error saving response:', responseError);
            return NextResponse.json(
                { error: 'Failed to save response' },
                { status: 500 }
            );
        }

        return NextResponse.json({ 
            success: true, 
            data: response
        });
    } catch (error) {
        console.error('Error submitting response:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
} 