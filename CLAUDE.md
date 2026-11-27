# CLAUDE.md

このリポジトリは、家族で使う定番の日用品を実体験からレビューする Amazonアソシエイト用ブログ（Astro + GitHub Pages）です。

## 運用ルール（必ず守ること）

1. **記事は必ず本人の実体験をもとに書く。AIだけで記事を作らない。**
   - Claude は、本人が書いた体験・メモ・感想をもとにした「構成の整理」「誤字脱字の修正」「読みやすさの調整」までを手伝う。
   - 本人が提供していない使用感・感想・エピソード・効果・数値を作り出して記事に書かない。
   - 体験の情報が足りない場合は、文章を補わずに `（ここに〇〇を書く）` のような空欄を残し、本人に確認する。
2. **他サイトの文章を転載しない。**
   - 他サイト・商品ページ・レビューの文章をコピーしたり、言い換えただけの文章を書かない。
   - 商品の仕様など事実情報を書く場合も、自分の言葉で簡潔に書く。
3. **PR表記とアソシエイトの表記を消さない。**
   - `src/components/PrNotice.astro`（全記事冒頭の「PR」表記）と、記事ページでの読み込み部分を削除・非表示にしない。
   - フッターの「Amazonのアソシエイトとして、当サイトは適格販売により収入を得ています。」（`src/site.config.ts` の `ASSOCIATE_DISCLOSURE`、`src/components/Footer.astro`）を削除・変更しない。

## その他の決まり

- Amazon の商品画像は使わない。写真は本人が撮影したものだけを記事フォルダに入れて使う。
- 商品リンクは `::amazon[商品名]{asin="ASIN"}` で書く。アソシエイトタグをリンクに直接書かない（`src/site.config.ts` の1か所で管理）。
- 新しい記事は `draft: true` で作成し、本人が内容を確認してから `false` にする。
- 変更後は `npm run build` が通ることを確認する。

## 構成メモ

- 設定（サイト名・アソシエイトタグ・フォームURL・カテゴリ）: `src/site.config.ts`
- 記事: `src/content/posts/<記事名>/index.md`（テンプレートは `src/content/posts/_template.md`）
- 商品ボタンの変換処理: `src/plugins/remark-amazon.mjs`
- 公開: `main` に push → `.github/workflows/deploy.yml` が GitHub Pages に公開
