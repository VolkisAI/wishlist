'use client';

import ReplyToSantaButton from '../ReplyToSantaButton';

export default function LetterContent({ children, note }) {
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
        <div className="space-y-6 text-left">
            {/* Santa's Address */}
            <div className="text-center mb-8">
                <p className="text-gray-900 text-lg font-medium leading-relaxed">Santa&apos;s Workshop &amp; Post Office</p>
                <p className="text-gray-900 text-lg font-medium leading-relaxed">1 Candy Cane Lane</p>
                <p className="text-gray-900 text-lg font-medium leading-relaxed">North Pole, Arctic Circle</p>
            </div>

            <p className="text-gray-900 text-lg font-medium leading-relaxed">
                Dear {children},
            </p>
            
            <p className="text-gray-900 text-lg font-medium leading-relaxed whitespace-pre-wrap">
                {note}
            </p>
            
            <div className="pt-6 space-y-2">
                <p className="text-gray-900 text-lg font-medium leading-relaxed">From,</p>
                <p className="text-gray-900 text-xl font-medium leading-relaxed">Santa 🎅</p>
            </div>
            
            <ReplyToSantaButton onClick={handleReplyClick} />
        </div>
    );
} 