import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'inset';
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  className = '',
  ...props
}) => {
  const bgClass = variant === 'inset' ? 'bg-surface-2' : 'bg-surface';
  return (
    <div
      className={`rounded-card border border-border ${bgClass} p-5 transition-colors ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
