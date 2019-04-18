import React from 'react'
import { graphql, Link } from 'gatsby'

import Layout from 'components/Layout'

const PostList = ({ data }) => {
  const { postList } = data
  const card = postList.edges.map(edge => <Link
    to={edge.node.fields.genSlug}>{edge.node.title} </Link>)
  return (
    <Layout>
      <section className='container'>
        {card}
      </section>
    </Layout>
  )

}
export default PostList
export const pageQuery = graphql`
 query($lastCatId: String!) {
   postList: allContentfulPost(filter: {category: {id:{eq: $lastCatId}}}) {
    edges {
      node {
        id
        title
        fields {
          genSlug
        }
      }
    }
  }
}
`
