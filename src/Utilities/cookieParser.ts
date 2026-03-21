export const getCookieData = (name: string) => {
  if (typeof window === "undefined") return null;
  const cookieValue = document.cookie.match(`(^|;) ?${name}=([^;]*)(;|$)`);
  return cookieValue ? cookieValue[2] : null;
};

export const isCookieSet = (name: string) => {
  if (typeof window === "undefined") return false;
  return Boolean(getCookieData(name));
};

export const setCookies = (name: string, value: string, days: number) => {
  if (typeof window === "undefined") return;
  const date = new Date();
  const oneDay = 24 * 60 * 60;
  const oneSecInMs = 1000;

  date.setTime(date.getTime() + oneDay * oneSecInMs * days);
  document.cookie = `${name}=${value};path=/;expires=${date.toUTCString()};secure`;
  return;
};

export const deleteCookie = (name: string) => {
  if (typeof window === "undefined") return;
  setCookies(name, "", -1);
  return;
};
