import Image, { type ImageLoaderProps, type ImageProps } from 'next/image';

/** CDN URLs are already sized by the adapter; the loader preserves fill geometry in Next and Vinext. */
const cdnLoader = ({ src }: ImageLoaderProps) => src;

export function MediaImage({ alt, ...props }: Omit<ImageProps, 'loader'>) {
  return <Image {...props} alt={alt} loader={cdnLoader} />;
}
