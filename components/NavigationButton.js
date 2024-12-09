'use client';

import ChristmasButton from './ChristmasButton';

export default function NavigationButton({ href, className, variant, children }) {
  return (
    <ChristmasButton 
      variant={variant}
      className={className}
      onClick={() => window.location.href = href}
    >
      {children}
    </ChristmasButton>
  );
} 