import React from 'react';
import { cn } from '../ui/utils';

interface IconContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'pink' | 'turquoise' | 'gold' | 'gradient';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  glow?: boolean;
  children: React.ReactNode;
}

export const IconContainer = React.forwardRef<HTMLDivElement, IconContainerProps>(
  ({ className, variant = 'pink', size = 'md', glow = true, children, ...props }, ref) => {
    const baseClasses = `
      relative inline-flex items-center justify-center
      rounded-full shrink-0
      transition-all duration-300 ease-out
      hover:scale-110
    `;

    const variants = {
      pink: `
        bg-gradient-radial from-[#FF3F87] to-[#A020F0]
        text-white
        ${glow ? 'shadow-[0_0_20px_rgba(255,63,135,0.4)] hover:shadow-[0_0_30px_rgba(255,63,135,0.6)]' : ''}
      `,
      turquoise: `
        bg-gradient-radial from-[#00D0C0] to-[#008B8B]
        text-white
        ${glow ? 'shadow-[0_0_20px_rgba(0,208,192,0.4)] hover:shadow-[0_0_30px_rgba(0,208,192,0.6)]' : ''}
      `,
      gold: `
        bg-gradient-radial from-[#FFD166] to-[#FF8C42]
        text-[#0E0F1A]
        ${glow ? 'shadow-[0_0_20px_rgba(255,209,102,0.4)] hover:shadow-[0_0_30px_rgba(255,209,102,0.6)]' : ''}
      `,
      gradient: `
        bg-gradient-radial from-[#FF3F87] via-[#A020F0] to-[#00D0C0]
        text-white
        ${glow ? 'shadow-[0_0_20px_rgba(255,63,135,0.3),0_0_20px_rgba(0,208,192,0.3)] hover:shadow-[0_0_30px_rgba(255,63,135,0.4),0_0_30px_rgba(0,208,192,0.4)]' : ''}
      `
    };

    const sizes = {
      sm: 'w-10 h-10 text-sm',
      md: 'w-12 h-12 text-base',
      lg: 'w-16 h-16 text-lg',
      xl: 'w-20 h-20 text-xl'
    };

    return (
      <div
        ref={ref}
        className={cn(
          baseClasses,
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        <span className="relative z-10">
          {children}
        </span>
        
        {/* Additional glow effect */}
        {glow && (
          <div className="absolute inset-0 rounded-full bg-gradient-radial from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
        )}
      </div>
    );
  }
);

IconContainer.displayName = 'IconContainer';

// Add the radial gradient utility to the component
const style = `
  .bg-gradient-radial {
    background: radial-gradient(circle, var(--tw-gradient-stops));
  }
`;

// Insert styles if not already present
if (typeof document !== 'undefined') {
  const existingStyle = document.getElementById('icon-container-styles');
  if (!existingStyle) {
    const styleElement = document.createElement('style');
    styleElement.id = 'icon-container-styles';
    styleElement.textContent = style;
    document.head.appendChild(styleElement);
  }
}