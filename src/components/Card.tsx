import React from 'react';
import { cn } from '@/utils';       

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'elevated' | 'outline';
  glow?: 'none' | 'pink' | 'turquoise' | 'auto';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', glow = 'auto', padding = 'md', children, ...props }, ref) => {
    const baseClasses = `
      relative rounded-2xl
      transition-all duration-300 ease-out
      hover:scale-[1.02]
    `;

    const variants = {
      default: `
        bg-gradient-to-br from-[#1A0E23]/60 to-[#0E0F1A]/80
        border border-[#D8D8D8]/10
        backdrop-blur-sm
      `,
      glass: `
        bg-[#1A0E23]/30
        backdrop-blur-xl
        border border-[#D8D8D8]/10
      `,
      elevated: `
        bg-gradient-to-br from-[#1A0E23] to-[#0E0F1A]
        border border-[#D8D8D8]/20
        shadow-[0_8px_32px_rgba(0,0,0,0.3)]
      `,
      outline: `
        bg-transparent
        border-2 border-[#D8D8D8]/20
        backdrop-blur-sm
      `
    };

    const glowEffects = {
      none: '',
      pink: 'shadow-[0_0_20px_rgba(255,63,135,0.2)] hover:shadow-[0_0_30px_rgba(255,63,135,0.3)]',
      turquoise: 'shadow-[0_0_20px_rgba(0,208,192,0.2)] hover:shadow-[0_0_30px_rgba(0,208,192,0.3)]',
      auto: 'shadow-[0_0_20px_rgba(255,63,135,0.1),0_0_20px_rgba(0,208,192,0.1)] hover:shadow-[0_0_30px_rgba(255,63,135,0.2),0_0_30px_rgba(0,208,192,0.2)]'
    };

    // Responsive padding: 24px desktop, 16px tablet, 12px mobile
    const paddings = {
      none: 'p-0',
      sm: 'p-3 md:p-4 lg:p-4', // 12px mobile, 16px tablet, 16px desktop
      md: 'p-3 md:p-4 lg:p-6', // 12px mobile, 16px tablet, 24px desktop
      lg: 'p-4 md:p-6 lg:p-8', // 16px mobile, 24px tablet, 32px desktop
      xl: 'p-6 md:p-8 lg:p-12' // 24px mobile, 32px tablet, 48px desktop
    };

    return (
      <div
        ref={ref}
        className={cn(
          baseClasses,
          variants[variant],
          glowEffects[glow],
          paddings[padding],
          className
        )}
        {...props}
      >
        {children}
        
        {/* Subtle inner glow */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-[#FF3F87]/5 via-transparent to-[#00D0C0]/5 pointer-events-none" />
      </div>
    );
  }
);

Card.displayName = 'Card';

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col space-y-2 pb-3 md:pb-4 border-b border-[#D8D8D8]/10',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardHeader.displayName = 'CardHeader';

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('pt-3 md:pt-4', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardContent.displayName = 'CardContent';

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center justify-center pt-3 md:pt-4 border-t border-[#D8D8D8]/10 gap-3 md:gap-4',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardFooter.displayName = 'CardFooter';