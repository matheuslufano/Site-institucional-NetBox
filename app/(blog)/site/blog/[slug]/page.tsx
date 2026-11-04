import ArticlePage, {
  articleStaticParams,
  generateArticleMetadata,
  type ArticlePageProps,
} from "@/components/blog/articles/ArticlePage";

export function generateStaticParams() {
  return articleStaticParams();
}
export async function generateMetadata(props: ArticlePageProps) {
  return generateArticleMetadata(props);
}
export default function Page(props: ArticlePageProps) {
  return <ArticlePage {...props} />;
}
