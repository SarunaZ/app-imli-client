export const getCookieData = (name: string) => {
  const cookieValue = document.cookie.match(`(^|;) ?${name}=([^;]*)(;|$)`);
  return cookieValue ? cookieValue[2] : null;
}

export const isCookieSet = (name: string) => {
  return Boolean(getCookieData(name));
}

export const setCookies = (name: string, value: string, days: number) => {
  let date = new Date();
  date.setTime(date.getTime() + 24*60*60*1000*days);
  document.cookie = `${name}=${value};path=/;expires=${date.toUTCString()}`;
  return;
}

export const deleteCookie = (name: string) => {
  setCookies(name, '', -1);
  return;
}
