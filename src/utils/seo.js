export const setPageTitle = (title) => {
  document.title = `${title} | Artify`;
};

export const setMetaDescription = (description) => {
  const meta = document.querySelector('meta[name="description"]');
  if (meta) {
    meta.setAttribute("content", description);
  } else {
    const newMeta = document.createElement("meta");
    newMeta.name = "description";
    newMeta.content = description;
    document.head.appendChild(newMeta);
  }
};
