import React from 'react';
import {Prism, SyntaxHighlighterProps} from 'react-syntax-highlighter';
import {useRouter} from 'next/router';

import {ArrowLeft, ArrowRight} from '@src/assets/icons';
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
            <div className="bg-grey rounded-2xl p-4">
              <div className="flex justify-between items-center mb-2 border-b-2 border-stroke-border pb-2">
                <p className="text-lg text-dark">{language.toUpperCase()}</p>
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
        <div className="flex gap-5">
          <button
            onClick={() => router.push(`/articles/${Number(id) - 1}`)}
            className="flex items-center gap-2">
            <ArrowLeft width={16} height={16} />
            Go to Article {Number(id) - 1}
          </button>
          <button
            onClick={() => router.push(`/articles/${Number(id) + 1}`)}
            className="flex items-center gap-2">
            Go to Article {Number(id) + 1}
            <ArrowRight width={16} height={16} />
          </button>
        </div>
      </div>
      <div
        className="text-dark leading-relaxed font-nunito text-body-medium
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
        {parse(currentArticle.Content, options)}
      </div>
    </div>
  );
}
