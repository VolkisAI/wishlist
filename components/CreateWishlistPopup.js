/**
 * CreateWishlistPopup Component
 * 
 * An envelope-styled popup modal for creating new wishlists.
 * Designed to match the postal/envelope theme of the application.
 */

'use client';

import { useState } from 'react';
import { Tooltip } from 'react-tooltip';
import ChristmasButton from './ChristmasButton';

export default function CreateWishlistPopup({ isOpen, onClose, onSubmit }) {
    const [familyName, setFamilyName] = useState('');
    const [children, setChildren] = useState(['']);
    const [note, setNote] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        // Validation
        if (!familyName.trim()) {
            setError('Please enter your family name');
            return;
        }

        // Check if at least one child name is provided
        const validChildren = children.filter(child => child.trim() !== '');
        if (validChildren.length === 0) {
            setError('Please add at least one child name');
            return;
        }

        if (!note.trim()) {
            setError('Please write a special message from Santa');
            return;
        }

        // NEW VALIDATION: Limit to 60 words
        const wordCount = note.trim().split(/\s+/).length;
        if (wordCount > 60) {
            setError('Special message must be 60 words or fewer');
            return;
        }

        // Submit the form
        onSubmit({
            family_name: familyName.trim(),
            children: validChildren,
            note: note.trim()
        });
    };

    const addChild = () => {
        setChildren([...children, '']);
    };

    const removeChild = (index) => {
        const newChildren = children.filter((_, i) => i !== index);
        setChildren(newChildren);
    };

    const updateChild = (index, value) => {
        const newChildren = [...children];
        newChildren[index] = value;
        setChildren(newChildren);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-3xl w-full animate-float-in">
                {/* Snow Cap Overlay */}
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

                {/* Santa Seal */}
                <div className="absolute -right-3 -top-3 w-16 h-16 bg-red-600 rounded-full flex items-center justify-center transform rotate-12 shadow-lg z-30"
                    style={{
                        background: 'radial-gradient(circle at 30% 30%, #dc2626, #991b1b)'
                    }}>
                    <div className="text-white text-sm font-extrabold">SANTA</div>
                </div>

                {/* Popup Content */}
                <div className="relative bg-white rounded-lg shadow-xl overflow-hidden"
                    style={{
                        background: 'repeating-linear-gradient(45deg, #f8f8f8, #f8f8f8 10px, #ffffff 10px, #ffffff 20px)',
                    }}>
                    <form onSubmit={handleSubmit} className="p-6 space-y-4">
                        <h2 className="text-2xl font-extrabold text-gray-900 mb-4">Create Letter from Santa</h2>

                        {/* Family Name */}
                        <div>
                            <label className="block text-gray-900 font-extrabold mb-1">
                                Family Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={familyName}
                                onChange={(e) => setFamilyName(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-transparent font-normal"
                                placeholder="e.g., The Smith Family"
                                required
                            />
                        </div>

                        {/* Children Names */}
                        <div>
                            <label className="block text-gray-900 font-extrabold mb-1">
                                Children&apos;s Names <span className="text-red-500">*</span>
                            </label>
                            {children.map((child, index) => (
                                <div key={index} className="flex gap-2 mb-2">
                                    <input
                                        type="text"
                                        value={child}
                                        onChange={(e) => updateChild(index, e.target.value)}
                                        className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-transparent font-normal"
                                        placeholder="Child&apos;s name"
                                        required={index === 0}
                                    />
                                    {children.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeChild(index)}
                                            className="p-2 text-gray-500 hover:text-gray-700"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={addChild}
                                className="text-gray-700 hover:text-gray-900 flex items-center gap-1 font-extrabold"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                                </svg>
                                Add Another Child
                            </button>
                        </div>

                        {/* Special Note From Santa */}
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <label className="block text-gray-900 font-extrabold">
                                    Special Note From Santa <span className="text-red-500">*</span>
                                </label>
                                <div 
                                    className="cursor-help text-gray-400 hover:text-gray-600"
                                    data-tooltip-id="santa-note-tooltip"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <Tooltip 
                                    id="santa-note-tooltip"
                                    place="top"
                                    className="max-w-xs bg-gray-900 text-white p-2 rounded text-sm"
                                >
                                    This message will appear in the magical letter from Santa that your children will read. Make it personal and special!
                                </Tooltip>
                            </div>

                            {/* Letter Format */}
                            <div className="text-gray-700 font-extrabold mb-2">
                                Dear {children.filter(child => child.trim() !== '').join(', ')},
                            </div>

                            <div className="relative mb-2">
                                <textarea
                                    value={note}
                                    onChange={(e) => {
                                        const words = e.target.value.trim().split(/\s+/);
                                        if (words.length <= 60) {
                                            setNote(e.target.value);
                                            setError('');
                                        } else {
                                            setError('You have exceeded the 60-word limit.');
                                        }
                                    }}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-transparent font-normal"
                                    rows="4"
                                    placeholder="Write a magical message from Santa without including Dear or From Santa..."
                                    required
                                />
                                <div className="absolute right-2 bottom-2 text-sm text-gray-500">
                                    {60 - (note.trim().split(/\s+/).length || 0)} words remaining
                                </div>
                            </div>

                            <div className="text-gray-700 font-extrabold">
                                With lots of love,<br/>
                                Santa Claus 🎅
                            </div>
                        </div>

                        {error && (
                            <div className="text-red-500 text-sm font-medium mt-6">{error}</div>
                        )}

                        <div className="flex justify-end space-x-3 pt-4 border-t">
                            <ChristmasButton 
                                onClick={onClose}
                                className="bg-gradient-to-b from-[#121225] to-[#1c1c35] text-white font-extrabold"
                            >
                                Cancel
                            </ChristmasButton>
                            <ChristmasButton type="submit" className="font-extrabold">
                                Create Letter from Santa
                            </ChristmasButton>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
} 