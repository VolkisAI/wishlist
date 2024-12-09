'use client';

export default function ResponsePopup({ response, onClose }) {
    if (!response) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-4xl w-full animate-float-in">
                {/* Snow Cap Overlay - Adjusted position and z-index */}
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

                {/* Letter Paper */}
                <div className="relative bg-white rounded-lg shadow-xl overflow-hidden transform rotate-0.5"
                    style={{
                        background: 'repeating-linear-gradient(45deg, #f8f8f8, #f8f8f8 10px, #ffffff 10px, #ffffff 20px)',
                    }}>
                    {/* Letter Content */}
                    <div className="p-12 space-y-6">
                        {/* Close Button */}
                        <button 
                            onClick={onClose}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Letter Header */}
                        <div className="space-y-4 border-b border-gray-200 pb-6">
                            {/* North Pole Address */}
                            <div className="text-right space-y-1">
                                <div className="text-2xl font-medium text-gray-900 mb-2">Santa Claus</div>
                                <div className="text-gray-900 font-medium">
                                    Santa's Workshop & Post Office
                                </div>
                                <div className="text-gray-900 font-medium">
                                    1 Candy Cane Lane
                                </div>
                                <div className="text-gray-900 font-medium">
                                    North Pole, Arctic Circle
                                </div>
                                <div className="pt-3 text-gray-600">
                                    {new Date(response.created_at).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </div>
                            </div>
                            <div className="font-medium text-2xl text-gray-900 pt-4">
                                Dear Santa,
                            </div>
                        </div>

                        {/* Letter Body - Now with auto-height */}
                        <div className="space-y-6">
                            <div className="font-medium text-lg leading-relaxed text-gray-900"
                                style={{
                                    minHeight: 'fit-content',
                                    maxHeight: '400px',
                                    overflowY: 'auto'
                                }}>
                                {response.message}
                            </div>

                            {/* Letter Footer */}
                            <div className="pt-6 space-y-2 text-gray-900">
                                <div className="font-medium text-lg">Love,</div>
                                <div className="font-medium text-lg">{response.child_name}</div>
                            </div>
                        </div>

                        {/* Decorative Footer */}
                        <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-gray-100 to-transparent" />
                    </div>
                </div>

                {/* Wax Seal - Increased z-index */}
                <div className="absolute -left-6 -top-6 w-24 h-24 bg-red-600 rounded-full flex items-center justify-center transform -rotate-12 shadow-xl z-30"
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
            </div>
        </div>
    );
} 