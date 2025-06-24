import React from 'react';
import {Prism, SyntaxHighlighterProps} from 'react-syntax-highlighter';
import {useRouter} from 'next/router';

import {Copy} from '@src/assets/icons/Copy';
import {demoArticles} from '@src/constants/demoArticles';
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
  Prism as unknown as typeof React.Component<SyntaxHighlighterProps>;

export default function ArticlePage() {
  const router = useRouter();
  const {id} = router.query;

  const articles = demoArticles;

  const currentArticle = articles.find(article => article.ArticleId === id);

  if (!currentArticle) {
    return <div>Article not found</div>;
  }

  const options: HTMLReactParserOptions = {
    replace: domNode => {
      if (domNode instanceof Element && domNode.name === 'pre') {
        const language =
          domNode.attribs.lang?.replace('.', '').toLowerCase() || 'plaintext';
        const codeNode = domNode.children[0];

        if (codeNode && codeNode.type === 'text') {
          const codeString = codeNode.data;

          return (
            <div
              className="bg-custom-grey rounded-md p-4 border-radius-lg"
              style={{
                borderRadius: '16px',
              }}>
              <div className="flex justify-between items-center mb-2 border-b-2 border-custom-stroke-border pb-2">
                <p className="text-lg text-custom-dark ">
                  {language.toUpperCase()}
                </p>
                <button onClick={() => onCopyCode(codeString)}>
                  <Copy className="cursor-pointer" color="#7B7875" />
                </button>
              </div>
              <SyntaxHighlighter style={screenshotStyle} language={language}>
                {codeString}
              </SyntaxHighlighter>
            </div>
          );
        }

        return <pre>{domToReact(domNode.children as DOMNode[], options)}</pre>;
      }
    },
  };

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
           [&>img]:w-full [&>img]:h-auto [&>img]:my-4 [&>img]:block [&>img]:mx-auto [&>img]:rounded-md [&>img]:shadow-md">
        {parse(currentArticle.Content, options)}
      </div>
    </div>
  );
}
