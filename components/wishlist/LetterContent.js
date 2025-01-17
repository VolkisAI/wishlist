/**
 * LetterContent Component
 * 
 * Displays a letter from Santa with proper formatting for the recipient's name
 * and the message content.
 */

'use client';

import ReplyToSantaButton from '../ReplyToSantaButton';

export default function LetterContent({ name, note }) {
    const handleReplyClick = () => {
        const replyForm = document.getElementById('replyForm');
        const envelopeContainer = document.getElementById('envelopeContainer');
        if (replyForm) {
            replyForm.classList.remove('hidden');
            envelopeContainer.classList.add('hidden');
            replyForm.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="w-full">
            <div className="space-y-6 text-left max-w-[80%] mx-auto">
                {/* Santa's Address */}
                <div className="text-center mb-8">
                    <p className="text-gray-900 text-lg font-medium leading-relaxed">Santa&apos;s Workshop &amp; Post Office</p>
                    <p className="text-gray-900 text-lg font-medium leading-relaxed">1 Candy Cane Lane</p>
                    <p className="text-gray-900 text-lg font-medium leading-relaxed">North Pole, Arctic Circle</p>
                </div>

                {/* Recipient's Name */}
                <p className="text-gray-900 text-lg font-medium leading-relaxed">
                    Dear {name},
                </p>
                
                {/* Letter Content */}
                <p className="text-gray-900 text-lg font-medium leading-relaxed whitespace-pre-wrap">
                    {note}
                </p>
                
                {/* Signature */}
                <div className="pt-6 space-y-2">
                    <p className="text-gray-900 text-lg font-medium leading-relaxed">With lots of love,</p>
                    <p className="text-gray-900 text-xl font-medium leading-relaxed">Santa Claus 🎅</p>
                </div>
                
                <ReplyToSantaButton onClick={handleReplyClick} />
            </div>
        </div>
    );
} 