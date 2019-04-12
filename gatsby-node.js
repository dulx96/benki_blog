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
    }
    `,
  ).then(result => {
    if (result.errors) {
      console.log('Error retrieving contentful data', result.errors)
    }
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
  }).catch(e =>
    console.log('Error retrieving contentful data', e.message))
}
