import BlogPage, {
  generateBlogMetadata,
  type BlogPageProps,
} from "@/components/blog/home/HomePage";

export async function generateMetadata(props: BlogPageProps) {
  return generateBlogMetadata(props);
}
export default function Page(props: BlogPageProps) {
  return <BlogPage {...props} />;
}
