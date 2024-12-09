import { createClient } from '@/libs/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
    try {
        const supabase = createClient();
        const wishlistId = params.id;

        // Get the current user
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        
        if (userError || !user) {
            return NextResponse.json({
                success: false,
                error: 'Unauthorized'
            }, { status: 401 });
        }

        // First verify the wishlist belongs to the user
        const { data: wishlist, error: wishlistError } = await supabase
            .from('wishlists')
            .select('id')
            .eq('id', wishlistId)
            .eq('user_id', user.id)
            .single();

        if (wishlistError || !wishlist) {
            return NextResponse.json({
                success: false,
                error: 'Wishlist not found or unauthorized'
            }, { status: 404 });
        }

        // Get responses for this wishlist
        const { data: responses, error: responsesError } = await supabase
            .from('responses')
            .select('*')
            .eq('wishlist_id', wishlistId)
            .order('created_at', { ascending: false });

        if (responsesError) {
            console.error('Error fetching responses:', responsesError);
            return NextResponse.json({
                success: false,
                error: responsesError.message
            }, { status: 500 });
        }

        return NextResponse.json({
            success: true,
            data: responses || []
        });

    } catch (error) {
        console.error('Error in responses GET route:', error);
        return NextResponse.json({
            success: false,
            error: 'Internal Server Error'
        }, { status: 500 });
    }
}

export async function POST(request, { params }) {
    try {
        const supabase = createClient();
        const wishlistId = params.id;
        const { child_name, message } = await request.json();

        // Validate required fields
        if (!child_name?.trim() || !message?.trim()) {
            return NextResponse.json({
                success: false,
                error: 'Name and message are required'
            }, { status: 400 });
        }

        // Verify wishlist exists
        const { data: wishlist, error: wishlistError } = await supabase
            .from('wishlists')
            .select('id')
            .eq('id', wishlistId)
            .single();

        if (wishlistError || !wishlist) {
            return NextResponse.json({
                success: false,
                error: 'Wishlist not found'
            }, { status: 404 });
        }

        // Save response to Supabase
        const { data: response, error: responseError } = await supabase
            .from('responses')
            .insert({
                wishlist_id: wishlistId,
                child_name: child_name.trim(),
                message: message.trim(),
                created_at: new Date().toISOString()
            })
            .select()
            .single();

        if (responseError) {
            console.error('Error saving response:', responseError);
            return NextResponse.json({
                success: false,
                error: 'Failed to save response'
            }, { status: 500 });
        }

        return NextResponse.json({ 
            success: true, 
            data: response 
        });

    } catch (error) {
        console.error('Error in responses POST route:', error);
        return NextResponse.json({
            success: false,
            error: 'Internal Server Error'
        }, { status: 500 });
    }
} 