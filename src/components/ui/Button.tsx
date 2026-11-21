import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) => {
  const base = "inline-flex items-center justify-center font-medium rounded-btn transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-accent/40 disabled:opacity-50 disabled:pointer-events-none select-none";

  const sizeClasses = {
    sm: "text-xs px-2.5 py-1.5 gap-1.5",
    md: "text-xs px-3.5 py-2 gap-2",
    lg: "text-sm px-4 py-2.5 gap-2",
  };

  const variantClasses = {
    primary: "bg-accent text-white hover:bg-accent-hover shadow-sm",
    secondary: "bg-surface-2 text-txt hover:bg-border border border-border",
    outline: "border border-border bg-transparent text-txt hover:bg-surface-2",
    ghost: "bg-transparent text-txt-muted hover:text-txt hover:bg-surface-2",
    danger: "bg-danger text-white hover:bg-red-700 shadow-sm",
  };

  return (
    <button
      className={`${base} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
