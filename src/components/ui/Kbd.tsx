import React from 'react';

export const Kbd: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => {
  return (
    <kbd className={`inline-flex items-center justify-center font-mono text-[11px] font-semibold px-1.5 py-0.5 rounded-key bg-surface-2 border border-border text-txt-muted shadow-sm ${className}`}>
      {children}
    </kbd>
  );
};
