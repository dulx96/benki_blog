const slugify = require('slugify')
const crypto = require('crypto')
const genSlug = (node, categories) => {
  let slug = node.slug
  if (!slug) {
    slug = slugify(node.title)
  }
  const add = node.id.split('-')[3]
  const sortedArray = categories.sort((a, b) => (a.level > b.level) ? 1 : -1)
  return sortedArray.reduce((m, c) => m + c.slug + '/', '/') + slug + '-' + add
}

async function onCreateNode({ node, getNode, actions, createNodeId }) {
  if (node.internal.mediaType !== `text/markdown`) {
    return {}
  }
  const createNode = actions.createNode
  const createParentChildLink = actions.createParentChildLink
  try {
    const postId = node.parent
    const nodePost = getNode(postId)
    const categories = nodePost.categories___NODE.map(id => getNode(id))
    const slug = genSlug(nodePost, categories)
    const postSlugNode = {
      id: createNodeId(`${postId} >>> PostSlug`),
      children: [],
      parent: nodePost.id,
      slug: slug,
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
