'use client';
import Image, { type ImageLoaderProps, type ImageProps } from 'next/image';

/** All covers have pre-generated variants, shared by Next.js and Vinext without a remote optimizer. */
function localCoverLoader({ src, width }: ImageLoaderProps) {
  const size = width <= 480 ? 480 : width <= 800 ? 800 : 1200;
  return src.replace(/-1200\.webp$/, '-' + size + '.webp');
}
export function CoverImage({ alt, ...props }: Omit<ImageProps, 'loader'>) {
  return <Image {...props} alt={alt} loader={localCoverLoader} />;
}
