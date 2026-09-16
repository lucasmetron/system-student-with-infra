import React from 'react';

export default function Button({ children, variant = 'primary', icon, onClick, type = 'button', className = '' }) {
  const baseClasses = "flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-label-md shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary";

  const variants = {
    primary: "bg-primary text-on-primary hover:bg-primary/90 active:scale-[0.99]",
    secondary: "bg-surface-container-lowest text-on-surface border border-outline-variant hover:bg-surface-container-low",
    ghost: "bg-transparent text-primary hover:bg-surface-container-low shadow-none"
  };

  return (
    <button type={type} onClick={onClick} className={`${baseClasses} ${variants[variant]} ${className}`}>
      {icon && <span className="material-symbols-outlined text-[18px]">{icon}</span>}
      <span>{children}</span>
    </button>
  );
}
