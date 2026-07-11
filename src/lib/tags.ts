type TaggablePost = {
  data: {
    tags: string[];
  };
};

const tagAliases: Record<string, string> = {
  android: 'Android'
};

export function normalizeTag(tag: string): string {
  return tagAliases[tag.trim().toLocaleLowerCase('en-US')] ?? tag.trim();
}

export function tagPath(tag: string): string {
  return `/tags/${encodeURIComponent(normalizeTag(tag))}/`;
}

export function getVisibleTags(tags: string[]): string[] {
  return [...new Set(tags.map(normalizeTag))].filter((tag) => tag !== '');
}

export function getCoreTags(posts: TaggablePost[]): Array<{ name: string; count: number }> {
  const counts = new Map<string, number>();

  for (const post of posts) {
    for (const tag of getVisibleTags(post.data.tags)) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }

  return [...counts]
    .filter(([, count]) => count >= 2)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, 'zh-CN'));
}
