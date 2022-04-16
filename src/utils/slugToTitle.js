export const slugToTitle = (slug) => {
  return slug.replace(/-/g, ' ').replace(/\b[a-z]/g, function() {
    return arguments[0].toUpperCase();
  });
};
