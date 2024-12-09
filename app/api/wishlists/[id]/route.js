import { createClient } from '@/libs/supabase/server'
import { NextResponse } from 'next/server'

/**
 * DELETE /api/wishlists/[id]
 * 
 * Deletes a wishlist and all its associated responses.
 * Protected by RLS policies - only the owner can delete their wishlists.
 * Responses are automatically deleted due to ON DELETE CASCADE.
 * 
 * @param {Object} request - The request object
 * @param {Object} context - The context object containing params
 * @returns {Object} Response object with success/error message
 */
export async function DELETE(request, context) {
  try {
    const { id } = context.params;
    const supabase = createClient();

    // First verify the wishlist exists and belongs to the user
    const { data: wishlist, error: fetchError } = await supabase
      .from('wishlists')
      .select('id')
      .eq('id', id)
      .single();

    if (fetchError) {
      console.error('Error fetching wishlist:', fetchError);
      return NextResponse.json(
        { success: false, error: 'Failed to fetch wishlist' },
        { status: 500 }
      );
    }

    if (!wishlist) {
      return NextResponse.json(
        { success: false, error: 'Wishlist not found' },
        { status: 404 }
      );
    }

    // Delete the wishlist (responses will be deleted automatically due to CASCADE)
    const { error: deleteError } = await supabase
      .from('wishlists')
      .delete()
      .eq('id', id);

    if (deleteError) {
      console.error('Error deleting wishlist:', deleteError);
      return NextResponse.json(
        { success: false, error: 'Failed to delete wishlist' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Unexpected error deleting wishlist:', error);
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
} 