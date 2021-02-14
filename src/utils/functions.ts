export const unescapeHtml = (html: string) => {
  return html.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
};
