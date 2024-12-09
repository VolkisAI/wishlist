import { NextResponse } from 'next/server';
import { createClient } from '@/libs/supabase/server';
import fs from 'fs/promises';
import path from 'path';

/**
 * @endpoint DELETE /api/wishlists/[id]
 * @desc Delete a specific wishlist and all its responses
 * @access Private - Requires authentication
 * @param {string} id - The wishlist ID
 * @returns {Object} { success: boolean }
 */
export async function DELETE(req, { params }) {
    try {
        const wishlistId = params.id;
        const supabase = createClient();
        const { data: { user }, error: userError } = await supabase.auth.getUser();

        if (userError || !user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Verify wishlist exists and belongs to user
        const wishlistPath = path.join(
            process.cwd(), 
            'public', 
            'wishlists', 
            `${wishlistId}.json`
        );
        
        let wishlistData;
        try {
            const content = await fs.readFile(wishlistPath, 'utf8');
            wishlistData = JSON.parse(content);
        } catch {
            return NextResponse.json(
                { error: 'Wishlist not found' },
                { status: 404 }
            );
        }

        // Verify ownership
        if (wishlistData.createdBy.id !== user.id) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 403 }
            );
        }

        // Delete wishlist file
        await fs.unlink(wishlistPath);

        // Delete responses directory if it exists
        const responsesDir = path.join(
            process.cwd(), 
            'public', 
            'responses', 
            wishlistId
        );
        try {
            await fs.rm(responsesDir, { recursive: true, force: true });
        } catch (error) {
            // Ignore error if directory doesn't exist
            console.log('No responses directory found:', error);
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting wishlist:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
} 