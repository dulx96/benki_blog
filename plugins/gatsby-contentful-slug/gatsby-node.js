const slugify = require('slugify')
const crypto = require('crypto')
const genPostSlug = (node, categories) => {
  let slug = node.slug
  if (!slug) {
    slug = slugify(node.title)
  }
  const add = node.id.split('-')[3]
  const sortedArray = categories.sort((a, b) => (a.level > b.level) ? 1 : -1)
  return sortedArray.reduce((m, c) => m + c.slug + '/', '/') + slug + '-' + add + '/'
}

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

async function onCreateNode({ node, getNode, actions, createNodeId }) {
  const createNode = actions.createNode
  const createParentChildLink = actions.createParentChildLink
  // gen slug category node, using slug, level to define category node, be careful
  if (node.slug && node.level) {
    try {
      const slug = genCategorySlug(node, getNode)
      const categorySlugNode = {
        id: createNodeId(`${node.id} >>> CategorySlug`),
        children: [],
        slugCategory: slug,
        internal: {
          content: slug,
          type: `CategorySlug`,
          contentDigest: crypto.createHash(`md5`).update(slug).digest(`hex`),
        },
      }
      createNode(categorySlugNode)
      createParentChildLink({
        parent: node,
        child: categorySlugNode,
      })
    } catch (e) {
      console.log(e.message)
      return {}
    }
  }
  if (node.internal.mediaType !== `text/markdown`) {
    return {}
  }

  try {
    const postId = node.parent
    const nodePost = getNode(postId)
    const categories = nodePost.categories___NODE.map(id => getNode(id))
    const slug = genPostSlug(nodePost, categories)
    const postSlugNode = {
      id: createNodeId(`${postId} >>> PostSlug`),
      children: [],
      parent: nodePost.id,
      slugPost: slug,
      internal: {
        content: slug,
        type: `PostSlug`,
        contentDigest: crypto.createHash(`md5`).update(slug).digest(`hex`),
      },
    }
    createNode(postSlugNode)
    createParentChildLink({
      parent: nodePost,
      child: postSlugNode,
    })
    return postSlugNode
  } catch (e) {
    console.log('create slug post error', e.message)
    return {}
  }

}

exports.onCreateNode = onCreateNode
