'use client';

import { useState } from 'react';
import ChristmasButton from '../ChristmasButton';

const isFormValid = (data) => {
    return data.childName?.trim().length > 0 && 
           data.message?.trim().length > 0 && 
           data.message.trim().split(/\s+/).length <= 400;
};

const getWordCount = (text) => {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
};

export default function WishlistReplyForm({ wishlistId }) {
    const [formData, setFormData] = useState({
        childName: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [error, setError] = useState('');
    const [showWordLimitAlert, setShowWordLimitAlert] = useState(false);
    const [validationMessage, setValidationMessage] = useState('');

    const handleInitialClick = (e) => {
        e.preventDefault();
        
        if (!formData.childName?.trim()) {
            setValidationMessage("Ho ho ho! How will Santa know who to send the presents to if you don&apos;t tell him your name?");
            return;
        }
        
        if (!formData.message?.trim()) {
            setValidationMessage("Don&apos;t forget to write your message to Santa! He loves hearing from you!");
            return;
        }
        
        setValidationMessage('');
        setShowConfirmation(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent any default action
        if (!isFormValid(formData)) {
            return; // Don't proceed if form is invalid
        }
        
        try {
            setIsSubmitting(true);
            setError('');

            // Validate the form data
            if (!formData.childName?.trim()) {
                throw new Error('Please enter your name');
            }

            if (!formData.message?.trim()) {
                throw new Error('Please write a message to Santa');
            }

            const response = await fetch(`/api/wishlists/${wishlistId}/responses`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    child_name: formData.childName.trim(),
                    message: formData.message.trim()
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to send your message to Santa');
            }

            setIsSent(true);
        } catch (err) {
            console.error('Error submitting form:', err);
            setError(err.message);
            setShowConfirmation(false);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleMessageChange = (e) => {
        const newMessage = e.target.value;
        const wordCount = getWordCount(newMessage);
        
        if (wordCount > 400) {
            setShowWordLimitAlert(true);
            return;
        }
        
        setFormData({ ...formData, message: newMessage });
    };

    if (error) {
        return (
            <div className="alert alert-error shadow-lg">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{error}</span>
                </div>
            </div>
        );
    }

    if (isSent) {
        return (
            <div className="relative w-full max-w-3xl mx-auto px-4">
                <div className="relative bg-white rounded-lg shadow-2xl overflow-visible animate-float-in"
                    style={{
                        background: 'repeating-linear-gradient(45deg, #f8f8f8, #f8f8f8 10px, #ffffff 10px, #ffffff 20px)',
                    }}>
                    {/* Snow Cap */}
                    <div 
                        className="absolute -top-[6px] left-0 w-full h-7 z-10"
                        style={{
                            borderImageSource: 'url("/blog/introducing-supabase/effects/snow-cap.webp")',
                            borderImageSlice: 'calc(6 * 56 / 20) fill',
                            borderImageWidth: 'calc(28px / 3)',
                            borderImageRepeat: 'round',
                            filter: 'drop-shadow(0 2px 1px rgba(0,0,0,0.25))',
                        }}
                    />

                    {/* Wax Seal */}
                    <div className="absolute -right-6 -top-6 w-24 h-24 bg-red-600 rounded-full flex items-center justify-center transform rotate-12 shadow-xl z-30"
                        style={{
                            background: 'radial-gradient(circle at 30% 30%, #dc2626, #991b1b)',
                            boxShadow: '2px 4px 12px rgba(0,0,0,0.3)'
                        }}>
                        <div className="text-white text-center leading-relaxed relative font-medium"
                            style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>
                            <div className="text-lg tracking-wide">NORTH</div>
                            <div className="text-lg tracking-wide">POLE</div>
                            <div className="absolute inset-0 border-4 border-white/20 rounded-full transform -rotate-45"></div>
                        </div>
                    </div>

                    {/* Success Message Content */}
                    <div className="p-8 text-center space-y-6">
                        <h2 className="text-3xl font-medium text-gray-900 animate-fade-in">
                            Message Sent Successfully!
                        </h2>
                        <div className="animate-fade-in-up">
                            <p className="text-xl font-medium text-gray-700 leading-relaxed">
                                Thank you {formData.childName}! <br/>
                                Your message is flying to the North Pole right now. <br/>
                                The elves will make sure Santa reads it as soon as it arrives!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="relative w-full max-w-3xl mx-auto px-4">
            {/* Validation Alert */}
            {validationMessage && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-xl p-6 max-w-md text-center space-y-4 animate-float-in">
                        <h3 className="text-xl font-medium text-gray-900">Message from the Elves!</h3>
                        <p className="text-gray-700">
                            {validationMessage}
                        </p>
                        <button 
                            onClick={() => setValidationMessage('')}
                            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                        >
                            Ok, I&apos;ll Fix It
                        </button>
                    </div>
                </div>
            )}

            {/* Word Limit Alert */}
            {showWordLimitAlert && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-xl p-6 max-w-md text-center space-y-4 animate-float-in">
                        <h3 className="text-xl font-medium text-gray-900">Ho Ho Hold On!</h3>
                        <p className="text-gray-700">
                            The elves are very busy making toys and can only read messages up to 400 words. 
                            Could you make your message a bit shorter? 
                        </p>
                        <button 
                            onClick={() => setShowWordLimitAlert(false)}
                            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                        >
                            Ok, I&apos;ll Make It Shorter
                        </button>
                    </div>
                </div>
            )}

            {/* Paper Background with Snow Effect */}
            <div
                className="relative bg-white rounded-lg shadow-2xl overflow-visible transform hover:rotate-1 transition-transform duration-300"
                style={{
                    backgroundImage: 'repeating-linear-gradient(45deg, #f8f8f8, #f8f8f8 10px, #ffffff 10px, #ffffff 20px)',
                    width: '100%',
                    maxWidth: '640px',
                    margin: '0 auto',
                    transform: 'scale(0.9)',
                    transformOrigin: 'center top'
                }}
            >
                {/* Envelope Flap (Open) */}
                <div className="absolute inset-x-0 -top-20 h-24 origin-bottom"
                    style={{
                        clipPath: 'polygon(0 100%, 50% 0, 100% 100%)',
                        background: 'repeating-linear-gradient(45deg, #f0f0f0, #f0f0f0 10px, #f8f8f8 10px, #f8f8f8 20px)',
                        transform: 'rotate(0deg) translateY(-11px)'
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

                {/* Form Content */}
                <div className="relative bg-white mx-2 mb-8 p-6 rounded shadow-lg transform translate-y-8">
                    {/* Letter Header - Simplified without images */}
                    <div className="text-right mb-8 text-gray-700 border-b border-gray-200 pb-4">
                        <h2 className="text-xl font-medium mb-2">North Pole Post</h2>
                        <p className="text-lg font-medium">Santa&apos;s Workshop &amp; Post Office</p>
                        <p className="text-lg font-medium">1 Candy Cane Lane</p>
                        <p className="text-lg font-medium">North Pole, Arctic Circle</p>
                    </div>

                    <div className="space-y-6">
                        {/* Letter Start */}
                        <p className="text-xl font-medium text-gray-900 mb-4">Dear Santa,</p>

                        {/* Message Area */}
                        <div className="relative">
                            <textarea
                                value={formData.message}
                                onChange={handleMessageChange}
                                placeholder="Write your message to Santa here..."
                                className="w-full h-56 bg-transparent text-gray-900 text-lg font-medium p-4 border-none focus:ring-0 resize-none placeholder-gray-400 leading-8"
                                style={{
                                    backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, #e5e7eb 31px, #e5e7eb 32px)',
                                    backgroundAttachment: 'local',
                                    lineHeight: '32px',
                                    paddingTop: '8px'
                                }}
                                disabled={isSubmitting}
                                required
                            />
                            <div className="absolute bottom-3 right-3 text-sm text-gray-400">
                                {getWordCount(formData.message)} / 400 words
                            </div>
                        </div>

                        {/* Letter Signature */}
                        <div className="space-y-2 pt-4">
                            <p className="text-xl font-medium text-gray-900">From,</p>
                            <input
                                type="text"
                                value={formData.childName}
                                onChange={(e) => setFormData({...formData, childName: e.target.value})}
                                placeholder="Your name here..."
                                className="w-full bg-transparent text-gray-900 text-lg font-medium p-4 border-b-2 border-gray-200 focus:border-gray-300 focus:ring-0 placeholder-gray-400 leading-8"
                                style={{
                                    height: '48px'
                                }}
                                disabled={isSubmitting}
                                required
                            />
                        </div>

                        <div className="mt-6 flex justify-end space-x-4">
                            {!showConfirmation ? (
                                <ChristmasButton
                                    onClick={handleInitialClick}
                                    disabled={!isFormValid(formData) || isSubmitting}
                                    className={!isFormValid(formData) ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}
                                >
                                    ✨ Send to Santa ✨
                                </ChristmasButton>
                            ) : (
                                <div className="space-y-4 text-right">
                                    <p className="text-gray-900 text-lg font-medium">
                                        Are you sure your message is ready for Santa?
                                    </p>
                                    <div className="flex justify-end space-x-4">
                                        <ChristmasButton
                                            variant="ghost"
                                            onClick={() => setShowConfirmation(false)}
                                        >
                                            Make Changes
                                        </ChristmasButton>
                                        <ChristmasButton
                                            onClick={handleSubmit}
                                            disabled={!isFormValid(formData) || isSubmitting}
                                            className={!isFormValid(formData) ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}
                                        >
                                            {isSubmitting ? (
                                                <div className="flex items-center gap-2">
                                                    <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin" />
                                                    <span>Sending...</span>
                                                </div>
                                            ) : (
                                                "Yes, Send to Santa!"
                                            )}
                                        </ChristmasButton>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 