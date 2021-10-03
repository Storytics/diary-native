export const unescapeHtml = (html: string) =>
  html.replace(/&lt;/g, "<").replace(/&gt;/g, ">");

export const cleanUpContent = (content: string): string =>
  unescapeHtml(content)
    .replace(/<\/?[^>]+(>|$)/g, "")
    .replace(/&nbsp;/g, "");
