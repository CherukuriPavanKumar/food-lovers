'use client';

import NextImage, { ImageProps as NextImageProps } from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface ImageProps extends NextImageProps {
  containerClassName?: string;
}

export default function Image({ 
  className, 
  containerClassName,
  alt,
  ...props 
}: ImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <NextImage
      className={cn(
        'duration-700 ease-in-out',
        isLoading ? 'scale-110 blur-2xl grayscale' : 'scale-100 blur-0 grayscale-0',
        className
      )}
      onLoad={() => setIsLoading(false)}
      alt={alt}
      {...props}
    />
  );
}
