# いつものもの

家族で毎日使う定番の日用品を、実際に使った体験からレビューするブログです。
[Astro](https://astro.build/) で作った静的サイトを、GitHub Actions で GitHub Pages に自動公開します（無料で運用できます）。

公開URL（予定）: https://kityv00v922.github.io/itsumono-blog/

---

## はじめに一度だけやること

### 1. パソコンで動かす準備

[Node.js](https://nodejs.org/ja) の 22 以上（22.23.4 以上）をインストールしてから、このフォルダで次を実行します。

```bash
npm install
```

### 2. 設定を自分用に書き換える

`src/site.config.ts` を開いて、次を書き換えます。

| 項目 | 内容 |
| --- | --- |
| `SITE.title` / `SITE.description` | サイト名・説明 |
| `AMAZON.associateTag` | AmazonアソシエイトのトラッキングID（例: `yourname-22`）。**今は仮の値です** |
| `CONTACT_FORM_URL` | お問い合わせ用 Googleフォームの URL。**今は仮の値です** |

アソシエイトタグは **このファイルの1か所だけ** で管理しています。ここを変えれば全記事のリンクに反映されます。

あわせて `src/pages/about.md`（運営者情報）と `src/pages/privacy.md`（プライバシーポリシー）の「〇〇」の部分も書き換えてください。

### 3. GitHub Pages を有効にする

1. GitHub のリポジトリ画面で **Settings → Pages** を開く
2. **Build and deployment → Source** を **GitHub Actions** にする

これで、`main` ブランチに変更が入るたびに自動で公開されます。

---

## 記事の追加方法

### 1. テンプレートをコピーする

`src/content/posts/` の中に、記事ごとにフォルダを作ります。フォルダ名がそのまま URL になります（半角英数字とハイフンがおすすめ）。

```
src/content/posts/
├── _template.md          ← テンプレート（公開されません）
├── sample-review/        ← サンプル記事（下書き）
│   └── index.md
└── softener-review/      ← 新しい記事
    ├── index.md          ← _template.md をコピーして名前を変える
    ├── cover.jpg         ← 自分で撮った写真
    └── photo-1.jpg
```

この例の記事は `https://kityv00v922.github.io/itsumono-blog/posts/softener-review/` で公開されます。

### 2. 冒頭の設定（フロントマター）を書く

```yaml
---
title: 記事タイトル
description: 一覧や検索結果に表示される短い説明
pubDate: 2026-12-01
category: daily        # food / daily / bento-kitchen / other
cover: ./cover.jpg     # サムネイル写真（なければ消してOK）
coverAlt: 写真の説明
draft: true            # true のあいだは公開されない
---
```

| category | 表示名 |
| --- | --- |
| `food` | 食材 |
| `daily` | 日用品 |
| `bento-kitchen` | お弁当・キッチン用品 |
| `other` | その他 |

### 3. 本文を書く（記事の型）

テンプレートには次の見出しが入っています。**自分の実体験** で埋めてください。

1. 使ったきっかけ
2. 実際の写真
3. 良かった点
4. 気になった点
5. こんな人におすすめ

「PR」表記は記事の冒頭に **自動で** 入るので、自分で書く必要はありません。

### 4. 写真を載せる

自分で撮った写真を記事フォルダに入れて、本文に次のように書きます。
写真は自動で軽く変換されるので、スマホで撮ったものをそのまま入れて大丈夫です。
（位置情報などが気になる場合は、入れる前に写真から取り除いてください）

```markdown
![お弁当箱に入れたところ](./photo-1.jpg)
```

※ Amazon の商品画像は使わないでください。

### 5. Amazon の商品ボタンを入れる

商品ページの URL に含まれる **ASIN**（`B0` などで始まる英数字10桁）を使って、1行書くだけです。

```markdown
::amazon[商品名]{asin="B0XXXXXXXX"}
```

アソシエイトタグ付きのリンクボタンに自動で変換されます。ASIN の桁数が間違っているとビルド時にエラーで教えてくれます。

### 6. 手元で確認する

```bash
npm run dev
```

表示された URL（通常は http://localhost:4321/itsumono-blog/ ）をブラウザで開きます。
`draft: true` の下書き記事も、この確認画面では「下書き」マーク付きで表示されます。

### 7. 公開する準備ができたら

`draft: true` を `draft: false` に変えます。

---

## 公開方法

`main` ブランチに変更を入れる（push する）と、GitHub Actions が自動でビルドして公開します。

```bash
git add .
```

```bash
git commit -m "記事を追加：〇〇のレビュー"
```

```bash
git push origin main
```

- 進み具合は GitHub の **Actions** タブで確認できます（数分で完了します）。
- 公開前にエラーがないか確かめたいときは、手元で `npm run build` を実行してください。
- GitHub の画面上でファイルを直接編集・アップロードしても、`main` に保存すれば同じように公開されます。

---

## ファイル構成

| パス | 内容 |
| --- | --- |
| `src/site.config.ts` | サイト名・アソシエイトタグ・フォームURL・カテゴリの設定 |
| `src/content/posts/` | 記事（Markdown） |
| `src/pages/about.md` / `privacy.md` / `contact.astro` | 運営者情報・プライバシーポリシー・お問い合わせ |
| `src/components/PrNotice.astro` | 記事冒頭の PR 表記 |
| `src/components/Footer.astro` | フッター（アソシエイトの表記） |
| `src/plugins/remark-amazon.mjs` | `::amazon` を商品ボタンに変換する処理 |
| `src/styles/global.css` | デザイン |
| `.github/workflows/deploy.yml` | GitHub Pages への自動公開 |

独自ドメインを使う場合は、`astro.config.mjs` の `site` をそのドメインに、`base` を `'/'` に変更してください。

## 運用ルール

- 記事は必ず本人の実体験をもとに書く。AIだけで記事を作らない
- 他サイトの文章を転載しない
- PR表記とアソシエイトの表記を消さない

詳しくは [CLAUDE.md](./CLAUDE.md) を参照してください。
