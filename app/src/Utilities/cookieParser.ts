export const getCookieData = (name: string) => {
  const cookieValue = document.cookie.match(
    `(^|;) ?${name}=([^;]*)(;|$)`,
  );
  return cookieValue ? cookieValue[2] : null;
};

export const isCookieSet = (name: string) => {
  return Boolean(getCookieData(name));
};

export const setCookies = (
  name: string,
  value: string,
  days: number,
) => {
  const date = new Date();
  const oneDay = 24 * 60 * 60;
  const oneSecInMs = 1000;

  date.setTime(date.getTime() + oneDay * oneSecInMs * days);
  document.cookie = `${name}=${value};path=/;expires=${date.toUTCString()}`;
  return;
};

export const deleteCookie = (name: string) => {
  setCookies(name, "", -1);
  return;
};
