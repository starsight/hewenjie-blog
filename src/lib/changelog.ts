export type ChangelogEntry = {
  date: string;
  title: string;
  changes: string[];
};

export const changelog: ChangelogEntry[] = [
  {
    date: '2026-07-11',
    title: '移动端阅读体验优化',
    changes: ['扩大导航与标签的触控区域。', '正文图片延迟加载，减少移动网络下的首屏请求。', '搜索结果数量收敛，避免被手机键盘遮挡。']
  },
  {
    date: '2026-07-11',
    title: '全文搜索与标签整理',
    changes: ['新增站内静态全文搜索。', '将标签导航收敛为可浏览的核心主题，并统一 Android 标签。']
  },
  {
    date: '2026-07-05',
    title: '博客迁移至 Astro',
    changes: ['保留旧文章永久链接。', '补充站点地图、RSS、规范链接和结构化数据。']
  }
];
