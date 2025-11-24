'use client';

import { ReactNode } from 'react';
import { m } from 'framer-motion';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className = '', hover = true }: CardProps) {
  const Component = hover ? m.div : 'div';
  const hoverProps = hover ? {
    whileHover: { y: -8, scale: 1.02 },
    transition: { duration: 0.3 }
  } : {};

  return (
    <Component
      className={`bg-white rounded-xl shadow-md overflow-hidden ${className}`}
      {...hoverProps}
    >
      {children}
    </Component>
  );
}
