import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { CATEGORIES } from './site.config';

const categorySlugs = CATEGORIES.map((c) => c.slug) as [string, ...string[]];

const posts = defineCollection({
  // src/content/posts/ 以下の .md を記事として読み込む（_ で始まるファイルは無視）
  loader: glob({ pattern: ['**/*.md', '!**/_*.md'], base: './src/content/posts' }),
  schema: ({ image }) =>
    z.object({
      /** 記事タイトル */
      title: z.string(),
      /** 記事の説明（一覧や検索結果に表示） */
      description: z.string(),
      /** 公開日 */
      pubDate: z.coerce.date(),
      /** 更新日（任意） */
      updatedDate: z.coerce.date().optional(),
      /** カテゴリ: food / daily / bento-kitchen / other */
      category: z.enum(categorySlugs),
      /** 一覧に表示するサムネイル（自分で撮った写真・任意） */
      cover: image().optional(),
      coverAlt: z.string().optional(),
      /** true のあいだは公開されない（下書き） */
      draft: z.boolean().default(false),
    }),
});

export const collections = { posts };
