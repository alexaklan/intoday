'use client';

import { Manrope } from 'next/font/google';
import { cn } from '@/lib/utils';

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-manrope',
});

type LogoProps = {
  size?: number; // height of the toggle in px, default 28
  showWordmark?: boolean; // show/hide "intoday" text
  color?: string; // CSS color, defaults to black
  className?: string;
};

export function Logo({ 
  size = 28, 
  showWordmark = true, 
  color = '#000000', 
  className 
}: LogoProps) {
  // Calculate dimensions based on size
  const toggleWidth = Math.round(size * 1.2); // Shorter pill shape ratio
  const toggleHeight = size;
  const slotSize = Math.round(size * 0.4); // Circular slot size
  const slotOffset = Math.round(size * 0.3); // Distance from left edge
  
  // Calculate font size based on toggle height
  const fontSize = Math.round(size * 0.75);
  const spacing = 8; // 8px spacing between icon and text

  return (
    <div 
      className={cn('flex items-center', className)}
      style={{ gap: showWordmark ? spacing : 0 }}
    >
      {/* Toggle Icon */}
      <div
        className="relative flex-shrink-0"
        style={{
          width: toggleWidth,
          height: toggleHeight,
        }}
      >
        {/* Main pill shape */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            backgroundColor: color,
          }}
        />
        
        {/* White circular slot on the left */}
        <div
          className="absolute rounded-full bg-white"
          style={{
            width: slotSize,
            height: slotSize,
            left: slotOffset,
            top: '50%',
            transform: 'translateY(-50%)',
          }}
        />
      </div>

      {/* Wordmark */}
      {showWordmark && (
        <span
          className={cn(manrope.className, 'font-medium')}
          style={{
            fontSize: `${fontSize}px`,
            color: color,
            letterSpacing: '-0.01em', // Slightly tighter letter spacing
          }}
        >
          intoday
        </span>
      )}
    </div>
  );
}
