import React from 'react'
import { graphql, Link } from 'gatsby'

import Layout from 'components/Layout'

const PostList = ({ data }) => {
  const { postList } = data
  const card = postList.edges.map(edge => <Link
    to={edge.node.childPostSlug.slugPost}>{edge.node.title} </Link>)
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
   postList: allContentfulPost(filter: {categories: {elemMatch:{id:{eq: $lastCatId}}}}) {
    edges {
      node {
        id
        title
        childPostSlug {
          slugPost
        }
      }
    }
  }
}
`
