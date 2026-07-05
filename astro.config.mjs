import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://hewenjie-blog.vercel.app',
  markdown: {
    shikiConfig: {
      theme: 'github-light'
    }
  }
});
