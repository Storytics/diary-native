export const unescapeHtml = (html: string) =>
  html.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
