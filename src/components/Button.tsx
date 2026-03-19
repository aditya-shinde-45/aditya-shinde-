import React from 'react';

interface ButtonProps {
  variant: 'primary' | 'outline';
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
}

const baseClasses =
  'inline-flex items-center justify-center min-h-[44px] min-w-[44px] px-6 py-3 rounded-2xl font-semibold text-sm transition-all duration-200 ease-in-out cursor-pointer select-none ' +
  'hover:scale-[1.04] hover:shadow-soft-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2';

const variantClasses: Record<ButtonProps['variant'], string> = {
  primary:
    'bg-gradient-to-r from-accent-blue to-accent-cyan text-white shadow-soft-md hover:shadow-glow-blue',
  outline:
    'bg-transparent border-2 border-accent-blue text-accent-blue hover:shadow-soft-md',
};

const Button: React.FC<ButtonProps> = ({ variant, children, href, onClick, className = '' }) => {
  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`.trim();

  if (href) {
    return (
      <a href={href} className={classes} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={classes} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
