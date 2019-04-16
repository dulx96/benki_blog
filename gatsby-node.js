const path = require('path')
// helper
const { genParentSlug } = require('./src/heplers/index.js')
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return graphql(
    `{
          allPost: allContentfulPost {
            edges {
              node {
                id   
                title
                slug
                categories {
                  title
                  level
                  slug
                }
              }
            }
          }
          allCategoryLv1:   allContentfulCategory(filter:{level: {eq:1}}) {
                              edges {
                                node {
                                  id
                                  childCategorySlug{
                                    slugCategory
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
      const slug = genParentSlug(edge)
      createPage({
        path: slug,
        component: blogPostTemplate,
        context: {
          id: edge.node.id,
        },
      })
    })

    // create page lv1 category
    const categoryLv1Teamplate = path.resolve('./src/templates/categoryLv1.js')
    const allCategoryLv1 = result.data.allCategoryLv1
    allCategoryLv1.edges.forEach(edge => {
      const slug = edge.node.childCategorySlug.slugCategory
      createPage({
        path: slug,
        component: categoryLv1Teamplate,
        context: {
          parentCatId: edge.node.id,
        },
      })
    })
  }).catch(e =>
    console.log('Error retrieving contentful data', e.message))

}
