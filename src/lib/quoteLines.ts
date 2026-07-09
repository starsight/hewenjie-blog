export type QuoteScene = 'site' | 'home' | 'post' | 'about' | 'archive' | 'taxonomy';

export interface QuoteLine {
  id: string;
  text: string;
  source?: string;
  scenes: QuoteScene[];
}

export const quoteLines: QuoteLine[] = [
  {
    id: 'flowers-to-self',
    text: '至此鲜花赠自己，纵马踏花向自由。',
    source: 'flomo 摘录',
    scenes: ['site', 'home', 'about']
  },
  {
    id: 'typos-human-writing',
    text: '错别字是AI时代的人类撰写声明。',
    source: 'flomo #博客',
    scenes: ['post', 'about']
  },
  {
    id: 'online-offline-trust',
    text: '对于网上的事，先质疑再相信；对于现实的生活，先相信再质疑。',
    source: 'flomo #片刻',
    scenes: ['home', 'post', 'about']
  },
  {
    id: 'always-leave',
    text: '谁也不会在出生的地方呆一辈子，我们总要离开。',
    source: 'flomo #生活',
    scenes: ['about', 'archive']
  },
  {
    id: 'east-wind-moon',
    text: '便邀东风揽明月，春不许，再回头。',
    source: 'flomo #诗词',
    scenes: ['home', 'about']
  },
  {
    id: 'cloud-shadow-rain',
    text: '平将云影弄风月，妄得烟雨换波澜。',
    source: '#文杰',
    scenes: ['home', 'about', 'archive']
  },
  {
    id: 'truth-not-all',
    text: '不说假话，真话不全说。',
    source: '#文杰',
    scenes: ['post', 'about', 'taxonomy']
  },
  {
    id: 'distant-river-homes',
    text: '隔浦望人家，遥遥不相识。',
    source: '#诗人十四个',
    scenes: ['post', 'archive']
  },
  {
    id: 'south-north-roads',
    text: '人生南北多歧路，君向潇湘我向秦。',
    source: 'flomo #诗词',
    scenes: ['site', 'archive']
  },
  {
    id: 'lotus-boat-meeting',
    text: '相逢畏相失，并着采莲舟。',
    source: 'flomo #诗词',
    scenes: ['home', 'about', 'archive']
  },
  {
    id: 'young-worry-old-calm',
    text: '少年忧世成狂疾，老至无能始达观。',
    source: 'flomo #诗词',
    scenes: ['post', 'archive']
  },
  {
    id: 'silk-not-silkworm',
    text: '遍身罗绮者，不是养蚕人。',
    source: 'flomo #诗词',
    scenes: ['post', 'taxonomy']
  },
  {
    id: 'rain-spring-summer',
    text: '连雨不知春早去，一晴方觉夏已深。',
    source: 'flomo #诗词',
    scenes: ['home', 'about', 'archive']
  },
  {
    id: 'time-fate-hero',
    text: '时来天地皆同力，运去英雄不自由。',
    source: 'flomo #诗词',
    scenes: ['post', 'archive', 'taxonomy']
  },
  {
    id: 'snow-ridge-sad-geese',
    text: '雪岭日色死，霜鸿有馀哀。',
    source: 'flomo #诗词',
    scenes: ['post', 'archive']
  },
  {
    id: 'limited-years',
    text: '一向年光有限身，等闲离别易销魂。',
    source: 'flomo #诗词',
    scenes: ['post', 'archive']
  },
  {
    id: 'osmanthus-wine-youth',
    text: '欲买桂花同载酒，终不似，少年游。',
    source: 'flomo #诗词',
    scenes: ['home', 'about', 'archive']
  },
  {
    id: 'snow-white-head',
    text: '君埋泉下泥销骨，我寄人间雪满头。',
    source: 'flomo #诗词',
    scenes: ['post', 'archive']
  },
  {
    id: 'orange-winter-heart',
    text: '江南有丹橘，经冬犹绿林。岂伊地气暖，自有岁寒心。',
    source: 'flomo #诗人十四个',
    scenes: ['home', 'about', 'archive']
  },
  {
    id: 'choice-from-travel',
    text: '当你想过这些，然后打算回到目前的生活中，那其实你把一个被迫的过程，变成了你的一种选择。',
    source: 'flomo #诗人十四个',
    scenes: ['home', 'about']
  },
  {
    id: 'social-media-concept',
    text: '当你在滑社交媒体，你以为你得到了它，其实你失去了它。',
    source: 'flomo #诗人十四个',
    scenes: ['post', 'taxonomy']
  },
  {
    id: 'happiness-plain',
    text: '我们可能也过得很好，但如果是通过很多谋划、努力和取舍得来的，幸福就显得平淡。',
    source: 'flomo #诗人十四个',
    scenes: ['post', 'about', 'archive']
  },
  {
    id: 'live-well',
    text: '好好活就是做有意义的事，有意义的事就是好好活。',
    source: 'flomo #生活',
    scenes: ['site', 'about', 'post']
  },
  {
    id: 'coax-yourself',
    text: '生活就是哄自己，把自己劝明白了，就什么都解决了。',
    source: 'flomo 摘录',
    scenes: ['about', 'archive']
  },
  {
    id: 'one-road',
    text: '当你选择了一条路，就不要去打听另一条路的风景。',
    source: 'flomo 摘录',
    scenes: ['about', 'post']
  },
  {
    id: 'change-world',
    text: '如果我改变，世界也会改变。我之外的任何人都不会为我改变世界。',
    source: '《被讨厌的勇气》摘录',
    scenes: ['about', 'post']
  },
  {
    id: 'meaning-made',
    text: '人生意义是自己赋予自己的。',
    source: '《被讨厌的勇气》摘录',
    scenes: ['about', 'post']
  },
  {
    id: 'freedom-disliked',
    text: '自由是不怕被人讨厌。',
    source: '《被讨厌的勇气》摘录',
    scenes: ['about', 'post']
  },
  {
    id: 'complex-not-random',
    text: '世界是复杂的，但又不是随机的，知识也应当如此。',
    source: 'flomo #比较政治学',
    scenes: ['post', 'taxonomy']
  },
  {
    id: 'study-fatigue-surprise',
    text: '求知的道路，意味着永恒的疲倦以及偶尔的惊喜。',
    source: 'flomo #比较政治学',
    scenes: ['post', 'taxonomy']
  },
  {
    id: 'caution-optimism',
    text: '对于可控的事，我们保持谨慎。对于不可控的事，我们保持乐观。',
    source: 'flomo #罗翔',
    scenes: ['post', 'about']
  },
  {
    id: 'new-tea',
    text: '且将新火试新茶，诗酒趁年华。',
    source: '苏轼',
    scenes: ['home', 'archive', 'about']
  },
  {
    id: 'snow-mud',
    text: '人生到处何所似，应似飞鸿踏雪泥。',
    source: '苏轼',
    scenes: ['archive', 'site']
  },
  {
    id: 'slow-water',
    text: '水深则流缓，人贵则语迟。',
    source: 'flomo 摘录',
    scenes: ['about', 'post']
  },
  {
    id: 'yesterday-sun',
    text: '昨天的太阳永远留在昨天，今年的草木也不再是去年的草木。',
    source: 'flomo #读书',
    scenes: ['archive', 'post']
  },
  {
    id: 'youth-last-song',
    text: '原来这就是青春的最后离歌。',
    source: 'flomo #人生散点',
    scenes: ['archive', 'about']
  },
  {
    id: 'long-way-home',
    text: '夕阳映照着，缓缓地走，感觉一步一步的回家好漫长。',
    source: 'flomo #人生散点',
    scenes: ['archive', 'about']
  },
  {
    id: 'memory-freedom',
    text: '那些珍贵的记忆片段，会帮我们找到部分确定感。',
    source: 'flomo #诗人十四个',
    scenes: ['archive', 'about']
  },
  {
    id: 'ideal-freedom',
    text: '真正的理想是自由心灵结出的果实。',
    source: 'flomo #诗人十四个',
    scenes: ['post', 'about']
  },
  {
    id: 'own-anchor',
    text: '人要有自己的定海神针，不然人就会随波逐流。',
    source: 'flomo #罗翔',
    scenes: ['post', 'taxonomy', 'about']
  },
  {
    id: 'moving-life',
    text: '能动，能发展，能创造，便是顺从自然。',
    source: '朱光潜摘录',
    scenes: ['post', 'about']
  },
  {
    id: 'hearted-people',
    text: '这个世界是属于有心之人的。',
    source: 'flomo #bilibili',
    scenes: ['home', 'about']
  }
];

export function getQuoteLines(scenes: QuoteScene[] = ['site']): QuoteLine[] {
  const sceneSet = new Set<QuoteScene>(['site', ...scenes]);
  const matched = quoteLines.filter((quote) => quote.scenes.some((scene) => sceneSet.has(scene)));
  return matched.length > 0 ? matched : quoteLines.filter((quote) => quote.scenes.includes('site'));
}
