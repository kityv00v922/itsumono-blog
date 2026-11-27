// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';
import remarkDirective from 'remark-directive';
import remarkAmazon from './src/plugins/remark-amazon.mjs';

// GitHub Pages の公開URL
//   https://<ユーザー名>.github.io/<リポジトリ名>/
// 独自ドメインを使う場合は site をそのドメインに、base を '/' に変更してください。
export default defineConfig({
  site: 'https://kityv00v922.github.io',
  base: '/itsumono-blog',
  trailingSlash: 'always',
  integrations: [sitemap()],
  markdown: {
    // ::amazon[商品名]{asin="..."} を商品ボタンに変換するプラグインを使うため、unified（remark）で処理する
    processor: unified({
      remarkPlugins: [remarkDirective, remarkAmazon],
    }),
  },
  build: {
    // 小さいCSSはHTMLに埋め込み、リクエスト数を減らして表示を速くする
    inlineStylesheets: 'auto',
  },
});
