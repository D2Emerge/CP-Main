import {useRouter} from 'next/router';

import {demoArticles} from '@src/constants/demoArticles';

export default function ArticlePage() {
  const router = useRouter();
  const {id} = router.query;

  const articles = demoArticles;

  const currentArticle = articles.find(article => article.ArticleId === id);

  if (!currentArticle) {
    return <div>Article not found</div>;
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(currentArticle.Content, 'text/html');
  const cleanedHtml = doc.body.innerHTML;

  return (
    <div>
      <div>
        <p>
          ArticlePage {id}/{articles.length}
        </p>
        <div className="flex gap-2">
          <button onClick={() => router.push(`/articles/${Number(id) - 1}`)}>
            Go to Article {Number(id) - 1}
          </button>
          <button onClick={() => router.push(`/articles/${Number(id) + 1}`)}>
            Go to Article {Number(id) + 1}
          </button>
        </div>
      </div>
      <div
        className="text-gray-800 leading-relaxed
           [&>h1]:text-3xl [&>h1]:font-bold [&>h1]:mb-4
           [&>h2]:text-2xl [&>h2]:font-semibold [&>h2]:mb-3 [&>h2]:mt-6
           [&>p]:my-4 [&>p]:text-justify
           [&>a]:text-blue-600 [&>a]:underline
           [&>img]:w-full [&>img]:h-auto [&>img]:my-4 [&>img]:block [&>img]:mx-auto [&>img]:rounded-md [&>img]:shadow-md
           [&>pre]:rounded-md [&>pre]:bg-custom-light-grey [&>pre]:p-4 [&>pre]:text-custom-dark"
        dangerouslySetInnerHTML={{__html: cleanedHtml}}
      />
    </div>
  );
}
