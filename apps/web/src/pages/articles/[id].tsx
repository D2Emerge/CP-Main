import {Component} from 'react';
import {Prism, SyntaxHighlighterProps} from 'react-syntax-highlighter';
import {GetStaticPaths, GetStaticProps} from 'next';
import {useRouter} from 'next/router';

import {ArrowLeft, ArrowRight} from '@src/assets/icons';
import {Copy} from '@src/assets/icons/Copy';
import {Article} from '@src/constants/demoArticles';
import {screenshotStyle} from '@src/styles/screenshotSyntaxStyle';
import parse, {
  DOMNode,
  domToReact,
  Element,
  HTMLReactParserOptions,
} from 'html-react-parser';

const onCopyCode = (code: string) => {
  navigator.clipboard.writeText(code);
};

const SyntaxHighlighter =
  Prism as unknown as typeof Component<SyntaxHighlighterProps>;

interface ArticlePageProps {
  article: Article;
  totalArticles: number;
  prevArticleId: string | null;
  nextArticleId: string | null;
}
// NOTE: this is ISR right now, in the future we can remake it to SSR for better SEO because of the components
export default function ArticlePage({
  article,
  totalArticles,
  prevArticleId,
  nextArticleId,
}: ArticlePageProps) {
  const router = useRouter();
  const {id} = router.query;

  if (!article) {
    return <div>Article not found</div>;
  }

  const options: HTMLReactParserOptions = {
    replace: domNode => {
      if (domNode instanceof Element && domNode.name === 'pre') {
        const language =
          domNode.attribs.lang?.replace('.', '').toLowerCase() || 'plaintext';
        const codeNode = domNode.children[0];

        if (codeNode && codeNode.type === 'text') {
          const codeString = codeNode.data.trim();

          return (
            <div className="bg-grey rounded-2xl p-4 overflow-hidden">
              <div className="flex justify-between items-center mb-2 border-b-2 border-stroke-border pb-2">
                <p className="text-lg text-dark">{language.toUpperCase()}</p>
                <button onClick={() => onCopyCode(codeString)}>
                  <Copy className="cursor-pointer" color="#7B7875" />
                </button>
              </div>
              <div className="overflow-x-auto" suppressHydrationWarning>
                <SyntaxHighlighter
                  style={screenshotStyle}
                  language={language}
                  wrapLongLines={true}
                  suppressHydrationWarning>
                  {codeString}
                </SyntaxHighlighter>
              </div>
            </div>
          );
        }

        return (
          <pre suppressHydrationWarning>
            {domToReact(domNode.children as DOMNode[], options)}
          </pre>
        );
      }
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
      <div>
        <p>
          ArticlePage {article.ArticleId}/{totalArticles}
        </p>
        <div className="flex gap-5">
          <button
            onClick={() => router.push(`/articles/${Number(id) - 1}`)}
            className="flex items-center gap-2">
            <ArrowLeft width={16} height={16} />
            Go to Article {prevArticleId}
          </button>
          <button
            onClick={() => router.push(`/articles/${Number(id) + 1}`)}
            className="flex items-center gap-2">
            Go to Article {nextArticleId}
            <ArrowRight width={16} height={16} />
          </button>
        </div>
      </div>
      <div
        className="text-dark leading-relaxed font-nunito text-body-medium overflow-x-auto
     [&_h1]:text-h1
     [&_h2]:text-h2
     [&_h3]:text-h3
     [&_h4]:text-subtitle-semibold
     [&_h5]:text-body-bold
     [&_h6]:text-body-semibold
     [&_p]:text-body [&_p]:my-4 [&_p]:text-justify
     [&_a]:text-info [&_a]:underline
     [&_ul]:my-4 [&_ul]:pl-6
     [&_ol]:my-4 [&_ol]:pl-6
     [&_li]:mb-2 [&_li]:text-body
     [&_blockquote]:border-l-4 [&_blockquote]:border-grey [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:my-4 [&_blockquote]:text-body
     [&_table]:w-full [&_table]:border-collapse [&_table]:my-4
     [&_th]:border [&_th]:border-grey [&_th]:p-2 [&_th]:bg-light-grey [&_th]:text-body-semibold
     [&_td]:border [&_td]:border-grey [&_td]:p-2 [&_td]:text-body
     [&_strong]:font-bold
     [&_em]:italic
     [&_mark]:bg-light-orange
     [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-footnote [&_code]:font-mono
     [&_hr]:my-6 [&_hr]:border-grey
     [&_img]:w-full [&_img]:h-auto [&_img]:my-4 [&_img]:block [&_img]:mx-auto [&_img]:rounded-md [&_img]:shadow-md">
        {parse(article.Content, options)}
      </div>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const {demoArticles} = await import('@src/constants/demoArticles');
  const articles = demoArticles;

  const paths = articles.map((article: Article) => ({
    params: {id: article.ArticleId},
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({params}) => {
  const id = params?.id as string;
  const [{default: createDOMPurify}, {JSDOM}] = await Promise.all([
    import('dompurify'),
    import('jsdom'),
  ]);

  type WindowLike = import('dompurify').WindowLike;

  try {
    const {demoArticles} = await import('@src/constants/demoArticles');
    const articles = demoArticles;

    const currentArticle = articles.find(
      (article: Article) => article.ArticleId === id
    );

    if (!currentArticle) {
      return {
        notFound: true,
      };
    }

    const window = new JSDOM('').window;
    const DOMPurify = createDOMPurify(window as unknown as WindowLike);
    const sanitizedContent = DOMPurify.sanitize(currentArticle.Content);

    const currentIndex = articles.findIndex(
      (article: Article) => article.ArticleId === id
    );
    const prevArticleId =
      currentIndex > 0 ? articles[currentIndex - 1].ArticleId : null;
    const nextArticleId =
      currentIndex < articles.length - 1
        ? articles[currentIndex + 1].ArticleId
        : null;

    return {
      props: {
        article: {
          ...currentArticle,
          Content: sanitizedContent,
        },
        totalArticles: articles.length,
        prevArticleId,
        nextArticleId,
      },
      revalidate: 600,
    };
  } catch (error) {
    console.error('Error loading article:', error);
    return {
      notFound: true,
    };
  }
};
