'use client';

import Image, { ImageProps } from 'next/image';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends Omit<ImageProps, 'placeholder' | 'blurDataURL'> {
  fallbackSrc?: string;
  showPlaceholder?: boolean;
  className?: string;
  containerClassName?: string;
  lazy?: boolean;
}

export function OptimizedImage({
  src,
  alt,
  fallbackSrc = '/images/agents/SOPHIE.png',
  showPlaceholder = true,
  className,
  containerClassName,
  lazy = true,
  ...props
}: OptimizedImageProps) {
  const [imageSrc, setImageSrc] = useState<string>(src as string);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(!lazy);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!lazy) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px',
        threshold: 0.1,
      }
    );

    const element = document.querySelector(`[data-image-src="${src}"]`);
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [lazy, src]);

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    if (fallbackSrc && imageSrc !== fallbackSrc) {
      setImageSrc(fallbackSrc);
    }
  };

  // Generate blur data URL
  const generateBlurDataURL = (width: number, height: number) => {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#f3f4f6';
      ctx.fillRect(0, 0, width, height);
    }
    return canvas.toDataURL();
  };

  // Placeholder component
  const Placeholder = () => (
    <div 
      className={cn(
        'animate-pulse bg-gray-200 dark:bg-gray-700 rounded',
        className
      )}
      style={{
        width: props.width || '100%',
        height: props.height || '100%',
        minHeight: typeof props.height === 'number' ? props.height : '200px',
      }}
    />
  );

  // Don't render anything if lazy loading and not in view
  if (lazy && !isInView) {
    return (
      <div 
        data-image-src={src}
        className={cn(containerClassName, 'relative overflow-hidden')}
        style={{
          width: props.width || '100%',
          height: props.height || '100%',
        }}
      >
        {showPlaceholder && <Placeholder />}
      </div>
    );
  }

  return (
    <div className={cn('relative overflow-hidden', containerClassName)}>
      {/* Loading placeholder */}
      {isLoading && showPlaceholder && <Placeholder />}
      
      {/* Optimized Image */}
      <Image
        src={imageSrc}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          'transition-opacity duration-300',
          isLoading ? 'opacity-0' : 'opacity-100',
          hasError ? 'opacity-50' : '',
          className
        )}
        placeholder="blur"
        blurDataURL={generateBlurDataURL(20, 20)}
        quality={75}
        loading={lazy ? 'lazy' : 'eager'}
        {...props}
      />
      
      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <div className="text-center text-gray-500 dark:text-gray-400">
            <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-sm">Image failed to load</span>
          </div>
        </div>
      )}
    </div>
  );
}

// Specialized optimized image components
export function OptimizedArticleImage(props: OptimizedImageProps) {
  return (
    <OptimizedImage
      {...props}
      className={cn('w-full h-48 object-cover rounded-lg', props.className)}
      width={800}
      height={600}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  );
}

export function OptimizedAvatarImage(props: OptimizedImageProps) {
  return (
    <OptimizedImage
      {...props}
      className={cn('w-10 h-10 rounded-full object-cover', props.className)}
      width={40}
      height={40}
      sizes="40px"
    />
  );
}

export function OptimizedHeroImage(props: OptimizedImageProps) {
  return (
    <OptimizedImage
      {...props}
      className={cn('w-full h-auto object-cover', props.className)}
      width={1200}
      height={630}
      sizes="100vw"
      priority={true}
      lazy={false}
    />
  );
}