export const site = {
  name: '贺文杰的博客',
  title: '贺文杰的博客',
  description: 'Android、工程实践、个人写作与旧文归档。',
  url: 'https://hewenjie-blog.vercel.app',
  author: '贺文杰',
  authorUrl: 'https://github.com/starsight',
  defaultImage: '/images/starsight.png',
  locale: 'zh_CN'
};

export function absoluteUrl(path = '/'): string {
  return new URL(path, site.url).toString();
}

export function normalizeCanonical(pathname: string): string {
  if (!pathname || pathname === '/') return '/';
  return pathname.endsWith('/') ? pathname : `${pathname}/`;
}
