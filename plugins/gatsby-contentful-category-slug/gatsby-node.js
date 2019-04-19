const crypto = require('crypto')

const genCategorySlug = (node, getNode) => {
  return recursiveSlugCategory(node, getNode)
}
const recursiveSlugCategory = (node, getNode) => {
  const parentCatId = node.parentCat___NODE
  if (!parentCatId) {
    return '/' + node.slug + '/'
  } else {
    const parentCatNode = getNode(parentCatId)
    return recursiveSlugCategory(parentCatNode, getNode) + node.slug + '/'
  }
}

function onCreateNode({ node, getNode, actions }) {
  const createNodeField = actions.createNodeField
  // gen slug category node, using slug, level to define category node, be careful
  if (!node.internal) {
    return {}
  }
  if (node.slug && node.level) {
    try {
      const slug = genCategorySlug(node, getNode)
      createNodeField({
        node: node,
        name: `genSlug`,
        value: slug,
      })
      return {}
    } catch (e) {
      console.log(e.message)
      return {}
    }
  }
  return {}
}

exports.onCreateNode = onCreateNode