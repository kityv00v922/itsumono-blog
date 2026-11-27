/**
 * Markdown に次のように書くと、Amazon の商品ボタンに変換する remark プラグイン。
 *
 *   ::amazon[商品名]{asin="B0XXXXXXXX"}
 *
 * - リンク先には site.config.ts のアソシエイトタグが自動で付きます。
 * - Amazon の商品画像は使いません（ボタンと商品名のみ）。
 */
import { visit } from 'unist-util-visit';
import { amazonUrl, AMAZON } from '../site.config.ts';

const ASIN_PATTERN = /^[A-Z0-9]{10}$/;

function toText(node) {
  // remark-directive が「例:abc」のような普通の文章を
  // ディレクティブと誤認したときに、元の文字に戻すための処理
  const prefix = node.type === 'textDirective' ? ':' : node.type === 'leafDirective' ? '::' : ':::';
  return { type: 'text', value: prefix + node.name };
}

export default function remarkAmazon() {
  return (tree, file) => {
    visit(tree, (node, index, parent) => {
      if (
        node.type !== 'textDirective' &&
        node.type !== 'leafDirective' &&
        node.type !== 'containerDirective'
      ) {
        return;
      }

      if (node.name !== 'amazon') {
        // amazon 以外は普通の文字として扱う
        if (parent && typeof index === 'number') {
          const restored = [toText(node), ...(node.children ?? [])];
          parent.children.splice(index, 1, ...restored);
          return index + restored.length;
        }
        return;
      }

      const asin = String(node.attributes?.asin ?? '').trim().toUpperCase();
      if (!ASIN_PATTERN.test(asin)) {
        const where = file.path ? `（${file.path}）` : '';
        throw new Error(
          `::amazon の asin が正しくありません${where}: "${asin}"。ASIN は英数字10桁です。例: ::amazon[商品名]{asin="B0XXXXXXXX"}`,
        );
      }

      const label = node.children?.length
        ? node.children
        : [{ type: 'text', value: 'Amazonで商品を見る' }];

      const data = node.data || (node.data = {});
      data.hName = node.type === 'textDirective' ? 'span' : 'div';
      data.hProperties = { className: ['amazon-box'] };

      node.children = [
        {
          type: 'paragraph',
          data: { hName: 'span', hProperties: { className: ['amazon-box__name'] } },
          children: label,
        },
        {
          type: 'link',
          url: amazonUrl(asin),
          data: {
            hProperties: {
              className: ['amazon-box__button'],
              rel: ['nofollow', 'sponsored', 'noopener'],
              target: '_blank',
            },
          },
          children: [{ type: 'text', value: AMAZON.buttonLabel }],
        },
      ];
    });
  };
}
