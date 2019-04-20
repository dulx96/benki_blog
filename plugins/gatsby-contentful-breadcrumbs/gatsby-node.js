const genBreadCrumbs = (node, getNode) => {
  return recursiveBreadCrumbs(node, getNode)
}

const recursiveBreadCrumbs = (node, getNode) => {
  const tempArray = [{ level: node.level, displayName: node.displayName, slug: node.fields.genSlug }]
  const parentCatId = node.parentCat___NODE
  if (parentCatId) {
    const parentCatNode = getNode(parentCatId)
    return recursiveBreadCrumbs(parentCatNode, getNode).concat(tempArray)
  }
  // add home
  tempArray.unshift({ level: 0, displayName: 'HOME', slug: '/' })
  return tempArray

}

function onCreateNode({ node, getNode, actions }) {
  const createNodeField = actions.createNodeField
  // gen slug category node, using slug, level to define category node, be careful
  if (!node.internal) {
    return {}
  }
  if (node.slug && node.level) {
    try {
      const breadcrumbs = genBreadCrumbs(node, getNode)
      createNodeField({
        node: node,
        name: `genBreadCrumbs`,
        value: breadcrumbs,
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
