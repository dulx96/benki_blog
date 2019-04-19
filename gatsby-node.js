const path = require('path')
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return graphql(
    `{
          allPost: allContentfulPost {
            edges {
              node {
                id   
                fields {
                 genSlug
                }
              }
            }
          }
          allCategory: allContentfulCategory {
                              edges {
                                node {
                                  id
                                  subCat {
                                    id
                                  }
                                  parentCat {
                                    id
                                  }
                                  fields {
                                    genSlug
                                  }
                                }
                              }
                            }
    }
    `,
  ).then(result => {
    if (result.errors) {
      console.log('Error retrieving contentful data', result.errors)
    }

    // create page blog
    const blogPostTemplate = path.resolve('./src/templates/blogpost.js')
    result.data.allPost.edges.forEach(edge => {
      const slug = edge.node.fields.genSlug
      createPage({
        path: slug,
        component: blogPostTemplate,
        context: {
          id: edge.node.id,
        },
      })
    })

    // create page category List, post List
    // subCat null => post List
    const categoryListTeamplate = path.resolve('./src/templates/categoryList.js')
    const postListTemplate = path.resolve('./src/templates/postList.js')
    const allCategory = result.data.allCategory
    allCategory.edges.forEach(edge => {
      const slug = edge.node.fields.genSlug
      // subCat defined => crate child category page
      if (edge.node.subCat) {
        createPage({
          path: slug,
          component: categoryListTeamplate,
          context: {
            parentCatId: edge.node.id,
          },
        })
      } else {
        createPage({
          path: slug,
          component: postListTemplate,
          context: {
            lastCatId: edge.node.id,
          },

        })
      }

    })
  }).catch(e =>
    console.log('Error retrieving contentful data', e.message))

}
