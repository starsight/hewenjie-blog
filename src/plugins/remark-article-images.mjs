import fs from 'node:fs';
import path from 'node:path';

function imageAlt(src) {
  const filename = decodeURIComponent(src).split('/').pop()?.replace(/\.[^.]+$/, '') ?? '';

  if (!filename || /^\d+$/.test(filename)) return '文章配图';

  return filename
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[-_]+/g, ' ')
    .replace(/\bstructure\b/gi, '结构图')
    .replace(/\barchitecture\b/gi, '架构图');
}

function jpegDimensions(buffer) {
  let offset = 2;

  while (offset < buffer.length) {
    while (buffer[offset] === 0xff) offset += 1;
    const marker = buffer[offset++];

    if (marker === 0xd8 || marker === 0xd9) continue;
    const length = buffer.readUInt16BE(offset);
    const isStartOfFrame = marker >= 0xc0 && marker <= 0xc3 || marker >= 0xc5 && marker <= 0xc7 || marker >= 0xc9 && marker <= 0xcb || marker >= 0xcd && marker <= 0xcf;

    if (isStartOfFrame) {
      return {
        width: buffer.readUInt16BE(offset + 5),
        height: buffer.readUInt16BE(offset + 3)
      };
    }

    offset += length;
  }
}

function imageDimensions(src, publicDir) {
  const pathname = decodeURIComponent(src).split(/[?#]/, 1)[0];
  if (!pathname.startsWith('/images/')) return;

  const file = path.join(publicDir, pathname);
  if (!fs.existsSync(file)) return;

  const buffer = fs.readFileSync(file);
  if (buffer.subarray(1, 4).toString() === 'PNG') {
    return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
  }
  if (buffer.subarray(0, 3).toString() === 'GIF') {
    return { width: buffer.readUInt16LE(6), height: buffer.readUInt16LE(8) };
  }
  if (buffer[0] === 0xff && buffer[1] === 0xd8) return jpegDimensions(buffer);
}

function enhanceImageTag(tag, publicDir) {
  const src = tag.match(/\bsrc\s*=\s*["']([^"']+)["']/i)?.[1] ?? '';
  const additions = [];
  const dimensions = imageDimensions(src, publicDir);

  if (!/\balt\s*=/i.test(tag)) additions.push(`alt="${imageAlt(src)}"`);
  if (dimensions && !/\bwidth\s*=/i.test(tag)) additions.push(`width="${dimensions.width}"`);
  if (dimensions && !/\bheight\s*=/i.test(tag)) additions.push(`height="${dimensions.height}"`);
  if (!/\bloading\s*=/i.test(tag)) additions.push('loading="lazy"');
  if (!/\bdecoding\s*=/i.test(tag)) additions.push('decoding="async"');
  if (additions.length === 0) return tag;

  return tag.replace(/\s*\/?>(?=\s*$)/, ` ${additions.join(' ')}>`);
}

function walk(node, publicDir) {
  if (node.type === 'html') {
    node.value = node.value.replace(/<img\b[^>]*>/gi, (tag) => enhanceImageTag(tag, publicDir));
  }

  for (const child of node.children ?? []) walk(child, publicDir);
}

export default function remarkArticleImages({ publicDir = path.join(process.cwd(), 'public') } = {}) {
  return (tree) => walk(tree, publicDir);
}
