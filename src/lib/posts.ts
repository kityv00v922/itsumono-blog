import { getCollection, type CollectionEntry } from 'astro:content';
import { CATEGORIES } from '../site.config';

export type Post = CollectionEntry<'posts'>;

/**
 * 公開する記事を新しい順で取得する。
 * draft: true の記事は、本番ビルド（npm run build）では除外される。
 * 開発サーバー（npm run dev）では確認用に表示される。
 */
export async function getPublishedPosts(): Promise<Post[]> {
  const posts = await getCollection('posts', ({ data }) =>
    import.meta.env.PROD ? !data.draft : true,
  );
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export function categoryName(slug: string): string {
  return CATEGORIES.find((c) => c.slug === slug)?.name ?? slug;
}

/** base（/itsumono-blog/）を考慮したサイト内URLを作る */
export function url(path = ''): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const clean = path.replace(/^\//, '');
  return `${base}/${clean}`;
}

export function postUrl(post: Post): string {
  return url(`posts/${post.id}/`);
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone: 'Asia/Tokyo',
  });
}
