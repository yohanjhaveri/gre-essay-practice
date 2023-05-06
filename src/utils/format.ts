export const formatId = (id: string) => {
  return ("000" + id).slice(-3);
};

export const formatTitleCase = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};
