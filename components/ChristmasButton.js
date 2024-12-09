/**
 * ChristmasButton Component
 * 
 * A festive button component with a permanent snow cap effect using border-image
 * and custom gradient styling.
 */

'use client';

export default function ChristmasButton({ children, className = '', onClick, variant = 'default', type = 'button' }) {
    const baseStyles = `
        relative 
        font-medium 
        border 
        border-transparent 
        rounded-md 
        px-6 
        py-2 
        min-w-[10em] 
        text-center
        transition-all 
        duration-200
        will-change-transform
        flex
        items-center
        justify-center
        gap-2
    `;

    // Update the variants object
    const variants = {
        default: `
            bg-clip-padding 
            bg-gradient-to-b from-[#f12828] via-[#a00332] to-[#9f0f31]
            shadow-[inset_0_1px_rgba(255,255,255,0.25),inset_0_-1px_rgba(0,0,0,0.1),0_2px_4px_rgba(0,0,0,0.25)]
            active:scale-[0.92] 
            active:brightness-[0.8]
            text-white
        `,
        primary: "bg-gradient-to-b from-red-500 to-red-700 hover:from-red-400 hover:to-red-600 text-white",
        ghost: `
            bg-white 
            text-red-500 
            border-2 
            border-red-500 
            hover:bg-red-50 
            hover:text-red-600 
            hover:border-red-600
        `
    };

    return (
        <div className="button-resizer p-3 min-w-fit overflow-hidden">
            <button
                type={type}
                onClick={onClick}
                className={`
                    ${baseStyles}
                    ${variants[variant]}
                    ${className}
                    group
                    w-full
                    relative
                `}
                style={{
                    '--overflow-x': '4px',
                    backgroundClip: 'padding-box, border-box',
                    backgroundOrigin: 'padding-box, border-box',
                }}
            >
                {/* Snow Cap Overlay - Only show for default and primary variants */}
                {variant !== 'ghost' && (
                    <div 
                        className="absolute -top-[6px] left-[calc(var(--overflow-x)*-1)] w-[calc(100%+calc(var(--overflow-x)*2))] h-7 opacity-100"
                        style={{
                            borderImageSource: 'url("/blog/introducing-supabase/effects/snow-cap.webp")',
                            borderImageSlice: 'calc(6 * 56 / 20) fill',
                            borderImageWidth: 'calc(28px / 3)',
                            borderImageRepeat: 'round',
                            filter: 'drop-shadow(0 2px 1px rgba(0,0,0,0.25))',
                        }}
                    />
                )}

                {/* Button Content */}
                <span className="relative z-10 inline-flex items-center gap-2">
                    {children}
                </span>
            </button>
        </div>
    );
} 