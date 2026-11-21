import React from 'react';

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className = '', ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`w-full bg-surface-2 border border-border text-txt rounded-btn px-3.5 py-2 text-xs font-sans placeholder:text-txt-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors ${className}`}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';
