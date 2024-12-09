import { NextResponse } from 'next/server';
import { createClient } from '@/libs/supabase/server';

/**
 * @endpoint POST /api/wishlists
 * @desc Creates a new wishlist in the Supabase database
 * @access Private - Requires authentication
 * @body {
 *   childName: string,
 *   children: string[],
 *   note: string
 * }
 */
export async function POST(req) {
    try {
        const formData = await req.json();
        const supabase = createClient();
        
        // Verify user authentication
        const { data: { user }, error: userError } = await supabase.auth.getUser();

        if (userError || !user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const timestamp = Date.now();
        const wishlistId = `wishlist_${user.id.slice(0, 8)}_${timestamp}`;

        // Create wishlist in Supabase database
        const { data: wishlist, error: insertError } = await supabase
            .from('wishlists')
            .insert({
                id: wishlistId,
                family_name: formData.childName,
                children: formData.children || [],
                note: formData.note,
                created_at: new Date().toISOString(),
                responses_count: 0,
                user_id: user.id,
                user_email: user.email
            })
            .select()
            .single();

        if (insertError) {
            console.error('Error inserting wishlist:', insertError);
            return NextResponse.json(
                { error: 'Failed to create wishlist' },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true, data: wishlist });
    } catch (error) {
        console.error('Error creating wishlist:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

/**
 * @endpoint GET /api/wishlists
 * @desc Get all wishlists for authenticated user from Supabase database
 * @access Private - Requires authentication
 */
export async function GET() {
    try {
        const supabase = createClient();

        // Get the current user
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        
        if (userError || !user) {
            return NextResponse.json({
                success: false,
                error: 'Unauthorized'
            }, { status: 401 });
        }

        // Get all wishlists for the current user
        const { data: wishlists, error: wishlistError } = await supabase
            .from('wishlists')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });

        if (wishlistError) {
            console.error('Error fetching wishlists:', wishlistError);
            return NextResponse.json({
                success: false,
                error: wishlistError.message
            }, { status: 500 });
        }

        return NextResponse.json({
            success: true,
            data: wishlists || []
        });

    } catch (error) {
        console.error('Error in wishlists GET route:', error);
        return NextResponse.json({
            success: false,
            error: 'Internal Server Error'
        }, { status: 500 });
    }
} 