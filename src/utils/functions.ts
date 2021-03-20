export const unescapeHtml = (html: string) =>
  html.replace(/&lt;/g, "<").replace(/&gt;/g, ">");

export const cleanUpContent = (content: string): string =>
  unescapeHtml(content)
    .replace(/<\/?[^>]+(>|$)/g, "")
    .replace(/&nbsp;/g, "");

export const isValidEmail = (email: string) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};
