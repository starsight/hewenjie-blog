import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';
import { fileURLToPath } from 'node:url';
import remarkArticleImages from './src/plugins/remark-article-images.mjs';

const publicDir = fileURLToPath(new URL('./public', import.meta.url));

export default defineConfig({
  site: 'https://hewenjie.top',
  integrations: [sitemap()],
  markdown: {
    processor: unified({ remarkPlugins: [[remarkArticleImages, { publicDir }]] }),
    shikiConfig: {
      theme: 'github-light'
    }
  }
});
