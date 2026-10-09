import { clients as fallbackClients } from '../data/clients';

const GITHUB_API_URL =
  'https://api.github.com/repos/teddyand/myrestapi/contents/db.json';

// 浏览器端：atob 得到的是按字节解出来的 Latin-1 字符串，需要再按 UTF-8 重新编码，
// 否则中文会乱码。用 TextDecoder 还原真实字符。
function base64ToUtf8(base64) {
  if (typeof atob === 'function') {
    const binary = atob(base64.replace(/\s/g, ''));
    const bytes = Uint8Array.from(binary, (ch) => ch.charCodeAt(0));
    return new TextDecoder('utf-8').decode(bytes);
  }
  // 服务端 Node：Buffer 直接支持 UTF-8
  return Buffer.from(base64, 'base64').toString('utf8');
}

export async function fetchRemoteClients() {
  // Token 走服务端（非 NEXT_PUBLIC，不会泄露到浏览器）。
  // 有 token：认证请求限额 5000/小时；没有：匿名 60/小时，容易撞墙。
  const headers = { Accept: 'application/vnd.github+json' };
  const token = process.env.GITHUB_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(GITHUB_API_URL, { headers });
  if (!res.ok) throw new Error(`GitHub API responded ${res.status}`);
  const payload = await res.json();
  const text = base64ToUtf8(payload.content);
  const decoded = JSON.parse(text);
  return Array.isArray(decoded.clients) ? decoded.clients : [];
}

export async function fetchClients() {
  try {
    const remote = await fetchRemoteClients();
    if (remote.length === 0) throw new Error('remote db.json has no clients');
    return { clients: remote, source: 'remote' };
  } catch (error) {
    console.warn('remote db.json unavailable, using local fallback', error);
    return { clients: fallbackClients, source: 'fallback' };
  }
}

export function normalizeClient(client) {
  if (!client) return null;
  return {
    ...client,
    profile_pic: client.profile_pic || '/layeebu.jpeg',
    articles: Array.isArray(client.articles) ? client.articles : [],
  };
}

export { fallbackClients };
