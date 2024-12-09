'use client';

import ChristmasButton from './ChristmasButton';

export default function ReplyToSantaButton({ onClick }) {
    return (
        <div className="pt-8 flex justify-center">
            <ChristmasButton
                onClick={onClick}
                variant="default"
            >
                Reply to Santa 📝
            </ChristmasButton>
        </div>
    );
} 