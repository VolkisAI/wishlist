'use client';

import { useState } from 'react';
import WishlistForm from './WishlistForm';
import WishlistReplyForm from './WishlistReplyForm';
import ReplyToSantaButton from '../ReplyToSantaButton';

export default function WishlistContainer({ wishlistId }) {
    const [showReplyForm, setShowReplyForm] = useState(false);

    return (
        <div className="animate-fade-in max-w-8xl mx-auto">
            {!showReplyForm && (
                <ReplyToSantaButton onClick={() => setShowReplyForm(true)} />
            )}
            {showReplyForm && (
                <WishlistReplyForm wishlistId={wishlistId} />
            )}
        </div>
    );
} 