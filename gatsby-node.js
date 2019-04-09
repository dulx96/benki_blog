const path = require('path')
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return graphql(
    `{
           allContentfulBlogSpot {
            edges {
              node {
                title
                slug
                body {
                  id
                  body
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
    result.data.allContentfulBlogSpot.edges.forEach(edge => {
      createPage({
        path: `/blog${edge.node.slug}`,
        component: blogPostTemplate,
        context: {
          slug: edge.node.slug,
          id: edge.node.id,
        },
      })
    })
  }).catch(e =>
    console.log('Error retrieving contentful data', error))
}
