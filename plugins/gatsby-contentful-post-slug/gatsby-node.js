const slugify = require('slugify')
const crypto = require('crypto')
const genPostSlug = (node, category) => {
  let slug = node.slug
  if (!slug) {
    slug = slugify(node.title)
  }
  const additional = node.id.split('-')[3]
  // const sortedArray = categories.sort((a, b) => (a.level > b.level) ? 1 : -1)
  // return sortedArray.reduce((m, c) => m + c.slug + '/', '/') + slug + '-' +
  //   add + '/'
  slug = category.fields.genSlug + slug + '-' + additional + '/'
  return slug
}

function onCreateNode({ node, getNode, actions }) {
  const createNode = actions.createNode
  const createNodeField = actions.createNodeField
  const createParentChildLink = actions.createParentChildLink
  // gen slug post node, using interna mediaTYpe for detect
  if (node.internal.mediaType !== `text/markdown`) {
    return {}
  }
  try {
    const postId = node.parent
    const nodePost = getNode(postId)
    const category = getNode(nodePost.category___NODE)
    const slug = genPostSlug(nodePost, category)
    createNodeField({
      node: nodePost,
      name: `genSlug`,
      value: slug,
    })

    return {}
  } catch (e) {
    console.log('create slug post error', e.message)
    return {}
  }

}

exports.onCreateNode = onCreateNode
