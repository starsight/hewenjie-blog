export interface PostStats {
  words: number;
  minutes: number;
}

const CJK_RE = /[\u3400-\u9fff\uf900-\ufaff]/g;
const WORD_RE = /[A-Za-z0-9][A-Za-z0-9_+-]*/g;

export function getPostStats(content = ''): PostStats {
  const text = content
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-zA-Z0-9#]+;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const cjkCount = text.match(CJK_RE)?.length ?? 0;
  const latinWordCount = text
    .replace(CJK_RE, ' ')
    .match(WORD_RE)?.length ?? 0;
  const words = cjkCount + latinWordCount;

  return {
    words,
    minutes: Math.max(1, Math.ceil(words / 350))
  };
}

export function formatPostStats(stats: PostStats): string {
  return `约 ${stats.words.toLocaleString('zh-CN')} 字 · ${stats.minutes} 分钟阅读`;
}

export function formatPostDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}
