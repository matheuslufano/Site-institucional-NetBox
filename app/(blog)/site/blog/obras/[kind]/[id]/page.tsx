import { MediaDetail, mediaMetadata, type MediaDetailProps } from '@/components/blog/media/MediaDetail';

export const generateMetadata = mediaMetadata;
export default function Page(props: MediaDetailProps) { return <MediaDetail {...props} />; }
