const BILIBILI_BV_PATTERN = /bilibili\.com\/video\/(BV[0-9A-Za-z]+)/;

export function extractBilibiliBvid(url: string): string | null {
  const match = url.match(BILIBILI_BV_PATTERN);
  return match ? match[1] : null;
}

export function bilibiliEmbedUrl(url: string): string | null {
  const bvid = extractBilibiliBvid(url);
  return bvid ? `https://player.bilibili.com/player.html?bvid=${bvid}&page=1&high_quality=1&danmaku=0` : null;
}
