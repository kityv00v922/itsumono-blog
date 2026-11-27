/**
 * サイト全体の設定ファイル
 * ------------------------------------------------------------
 * アソシエイトタグ・お問い合わせフォームURLなどは、すべてここで管理します。
 * 値を変えるときは、このファイルだけを編集してください。
 */

export const SITE = {
  /** サイト名 */
  title: 'いつものもの',
  /** サイトの説明（検索結果やSNSで表示されます） */
  description:
    '家族で毎日使う定番の日用品を、実際に使った体験からレビューするブログです。',
  /** 運営者名（ニックネームでOK） */
  author: '運営者',
  /** 言語 */
  lang: 'ja',
};

/**
 * Amazonアソシエイト設定
 * ★ アソシエイトタグは、ここ1か所だけで管理します。
 *   Amazonアソシエイトの審査に通ったら、自分のトラッキングID（例: yourname-22）に書き換えてください。
 */
export const AMAZON = {
  /** トラッキングID（今は仮の値） */
  associateTag: 'your-tag-22',
  /** Amazon.co.jp の商品ページURLのベース */
  baseUrl: 'https://www.amazon.co.jp/dp/',
  /** ボタンに表示する文言 */
  buttonLabel: 'Amazonで見る',
};

/** お問い合わせ用 Googleフォームの URL（今は仮の値） */
export const CONTACT_FORM_URL = 'https://forms.gle/XXXXXXXXXXXXXXXX';

/**
 * カテゴリ一覧
 * slug は URL に使われます（例: /category/daily/）。後から変えるとURLが変わるので注意。
 */
export const CATEGORIES = [
  { slug: 'food', name: '食材' },
  { slug: 'daily', name: '日用品' },
  { slug: 'bento-kitchen', name: 'お弁当・キッチン用品' },
  { slug: 'other', name: 'その他' },
] as const;

export type CategorySlug = (typeof CATEGORIES)[number]['slug'];

/** トップページに表示する新着記事の数 */
export const LATEST_POSTS_COUNT = 10;

/** アソシエイトの表記（フッターに常に表示。消さないでください） */
export const ASSOCIATE_DISCLOSURE =
  'Amazonのアソシエイトとして、当サイトは適格販売により収入を得ています。';

/** ASIN から、アソシエイトタグ付きの商品URLを作る */
export function amazonUrl(asin: string): string {
  const cleanAsin = asin.trim().toUpperCase();
  return `${AMAZON.baseUrl}${encodeURIComponent(cleanAsin)}?tag=${encodeURIComponent(AMAZON.associateTag)}`;
}
