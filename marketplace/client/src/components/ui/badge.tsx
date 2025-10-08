import React from 'react';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outline' | 'secondary'; // Added 'secondary'
}

const getVariantClasses = (variant: string) => {
  switch (variant) {
    case 'outline':
      return 'border border-gray-400 text-gray-700';
    case 'secondary':
      return 'bg-gray-200 text-gray-800'; // Customize as needed
    case 'default':
    default:
      return 'bg-primary text-white'; // Customize primary colors as per your theme
  }
};

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className = '', variant = 'default', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${getVariantClasses(variant)} ${className}`}
        {...props}
      />
    );
  }
);

Badge.displayName = "Badge";

export { Badge };
