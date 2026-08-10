// 写入/更新 Cookie
export function setCookie(name: string, value: string, days = 30) {
  if (typeof window === 'undefined') return;

  // 使用 encodeURIComponent 编码，防止 JSON 里的引号、括号导致 Cookie 解析破损
  const encodedValue = encodeURIComponent(value);
  const maxAge = days * 24 * 60 * 60; // 转换为秒

  // path=/ 保证全局路由 API 都可以自动携带
  document.cookie = `${name}=${encodedValue}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

// 读取指定 Cookie
export function getCookie(name: string): string | null {
  if (typeof window === 'undefined') return null;

  const nameEQ = `${name}=`;
  const ca = document.cookie.split(';');

  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) {
      return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
  }
  return null;
}
