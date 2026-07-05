import fs from 'node:fs';
import path from 'node:path';

const sourceRoot = '/Users/wenjie/Documents/starsight.github.io';
const targetRoot = '/Users/wenjie/Documents/hewenjie-blog';
const searchXml = fs.readFileSync(path.join(sourceRoot, 'search.xml'), 'utf8');
const outDir = path.join(targetRoot, 'src/content/blog');

fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

const entries = [...searchXml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].map((match) => match[1]);

function cdata(block, tag) {
  const match = block.match(new RegExp(`<${tag}(?:\\s[^>]*)?>\\s*<!\\[CDATA\\[([\\s\\S]*?)\\]\\]>\\s*<\\/${tag}>`));
  return match?.[1]?.trim() ?? '';
}

function tagText(block, tag) {
  const match = block.match(new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`));
  return match?.[1]?.trim() ?? '';
}

function list(block, tag) {
  return [...block.matchAll(new RegExp(`<${tag}>\\s*([\\s\\S]*?)\\s*<\\/${tag}>`, 'g'))]
    .map((match) => match[1].replace(/<!\[CDATA\[|\]\]>/g, '').trim())
    .filter(Boolean);
}

function stripHtml(html) {
  return html
    .replace(/<figure[\s\S]*?<\/figure>/g, ' ')
    .replace(/<script[\s\S]*?<\/script>/g, ' ')
    .replace(/<style[\s\S]*?<\/style>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

function yamlString(value) {
  return `'${String(value).replace(/'/g, "''")}'`;
}

function yamlArray(values) {
  if (!values.length) return '[]';
  return `\n${values.map((value) => `  - ${yamlString(value)}`).join('\n')}`;
}

function fileSlug(permalink) {
  return permalink.replace(/^\/|\/$/g, '').replace(/[\/]/g, '__');
}

let migrated = 0;

for (const block of entries) {
  const title = cdata(block, 'title');
  const url = tagText(block, 'url');
  const content = cdata(block, 'content')
    .replace(/<a id="more"><\/a>/g, '')
    .replace(/rel="external"/g, 'rel="noopener noreferrer"');

  const urlObject = new URL(url);
  const permalink = urlObject.pathname.endsWith('/') ? urlObject.pathname : `${urlObject.pathname}/`;
  if (!/^\/\d{4}\/\d{2}\/\d{2}\//.test(permalink)) continue;

  const [, year, month, day] = permalink.match(/^\/(\d{4})\/(\d{2})\/(\d{2})\//) ?? [];
  const pubDate = `${year}-${month}-${day}`;
  const categories = list(block, 'category');
  const tags = list(block, 'tag');
  const description = stripHtml(content).slice(0, 160);
  const frontmatter = [
    '---',
    `title: ${yamlString(title)}`,
    `pubDate: ${yamlString(pubDate)}`,
    `description: ${yamlString(description)}`,
    `permalink: ${yamlString(permalink)}`,
    `categories: ${yamlArray(categories)}`,
    `tags: ${yamlArray(tags)}`,
    '---',
    ''
  ].join('\n');

  fs.writeFileSync(path.join(outDir, `${fileSlug(permalink)}.md`), `${frontmatter}${content}\n`);
  migrated += 1;
}

console.log(`Migrated ${migrated} posts.`);
