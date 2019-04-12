const slugify = require('slugify')
exports.genParentSlug = (edge) => {
  let slug = edge.node.slug
  if (!slug) {
    slug = slugify(edge.node.title)
  }
  const sortedArray = edge.node.categories.sort(
    (a, b) => (a.level > b.level) ? 1 : -1)
  return sortedArray.reduce((m, c) => m + c.slug + '/', '/') + slug
}