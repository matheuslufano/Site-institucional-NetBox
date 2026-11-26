'use client';
import Image, { type ImageLoaderProps, type ImageProps } from 'next/image';
import { useState } from 'react';

/** All covers have pre-generated variants, shared by Next.js and Vinext without a remote optimizer. */
function localCoverLoader({ src, width }: ImageLoaderProps) {
  const size = width <= 480 ? 480 : width <= 800 ? 800 : 1200;
  return src.replace(/-1200\.webp$/, '-' + size + '.webp');
}
export function CoverImage({ alt, src, onError, ...props }: Omit<ImageProps, 'loader'>) {
  const [failedSource, setFailedSource] = useState<ImageProps['src'] | null>(null);
  const fallback = failedSource === src;
  return <Image
    {...props}
    src={fallback ? '/og.jpg' : src}
    alt={fallback && alt ? 'Imagem indisponível: ' + alt : alt}
    loader={localCoverLoader}
    onError={(event) => {
      if (!fallback) setFailedSource(src);
      onError?.(event);
    }}
  />;
}
