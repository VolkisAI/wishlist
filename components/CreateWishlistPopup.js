/**
 * CreateWishlistPopup Component
 * 
 * An envelope-styled popup modal for creating new wishlists.
 * Designed to match the postal/envelope theme of the application.
 */

'use client';

import { useState } from 'react';
import ChristmasButton from './ChristmasButton';

export default function CreateWishlistPopup({ isOpen, onClose, onSubmit }) {
    const [formData, setFormData] = useState({
        familyName: '',
        children: [{ name: '' }],
        note: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            childName: formData.familyName, // Use family name as main title
            children: formData.children.map(child => child.name).filter(name => name.trim()),
            note: formData.note
        });
        setFormData({ familyName: '', children: [{ name: '' }], note: '' });
        onClose();
    };

    const addChild = () => {
        setFormData({
            ...formData,
            children: [...formData.children, { name: '' }]
        });
    };

    const removeChild = (index) => {
        setFormData({
            ...formData,
            children: formData.children.filter((_, i) => i !== index)
        });
    };

    const updateChildName = (index, name) => {
        const newChildren = [...formData.children];
        newChildren[index].name = name;
        setFormData({
            ...formData,
            children: newChildren
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-md w-full animate-float-in">
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

                {/* Santa Seal - Moved outside the popup container */}
                <div className="absolute -right-3 -top-3 w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center transform rotate-12 shadow-lg z-30"
                    style={{
                        background: 'radial-gradient(circle at 30% 30%, #1f2937, #111827)'
                    }}>
                    <div className="text-white text-sm font-extrabold">SANTA</div>
                </div>

                {/* Popup Content */}
                <div className="relative bg-white rounded-lg shadow-xl overflow-hidden"
                    style={{
                        background: 'repeating-linear-gradient(45deg, #f8f8f8, #f8f8f8 10px, #ffffff 10px, #ffffff 20px)',
                    }}>
                    <form onSubmit={handleSubmit} className="p-6 space-y-4">
                        <h2 className="text-2xl font-extrabold text-gray-900 mb-4">Create New Wishlist</h2>
                        
                        {/* Family Name Input */}
                        <div className="space-y-2">
                            <label className="block text-gray-900 font-extrabold">Family Name</label>
                            <input
                                type="text"
                                value={formData.familyName}
                                onChange={(e) => setFormData({...formData, familyName: e.target.value})}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-transparent font-extrabold"
                                required
                                placeholder="e.g., The Smith Family"
                            />
                        </div>

                        {/* Children Names Section */}
                        <div className="space-y-4">
                            <label className="block text-gray-900 font-extrabold">Children&apos;s Names</label>
                            {formData.children.map((child, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        value={child.name}
                                        onChange={(e) => updateChildName(index, e.target.value)}
                                        className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-transparent font-extrabold"
                                        placeholder={`Child ${index + 1}&apos;s name`}
                                    />
                                    {formData.children.length > 1 && (
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

                        <div className="space-y-2">
                            <label className="block text-gray-900 font-extrabold">Special Note From Santa</label>
                            <textarea
                                value={formData.note}
                                onChange={(e) => setFormData({...formData, note: e.target.value})}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-transparent font-extrabold"
                                rows="3"
                            />
                        </div>

                        <div className="flex justify-end space-x-3 pt-4 border-t">
                            <ChristmasButton 
                                onClick={onClose} 
                                className="bg-gradient-to-b from-[#121225] to-[#1c1c35] text-white font-extrabold"
                            >
                                Cancel
                            </ChristmasButton>
                            <ChristmasButton type="submit" className="font-extrabold">
                                Create Wishlist
                            </ChristmasButton>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
} 