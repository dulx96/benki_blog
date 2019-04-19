import React from 'react'
import { graphql } from 'gatsby'

//components
import Layout from 'components/Layout'
import PostCard from 'components/Cards/PostCard'

const PostList = ({ data }) => {
  const { postList } = data
  const postCards = postList.edges.map(e => {
    const link = e.node.fields.genSlug
    const title = e.node.title
    const description = e.node.description ||
      e.node.content.childMarkdownRemark.excerpt
    const updatedAt = e.node.updatedAt
    const categoryName = e.node.category.displayName
    const coverImgFluid = e.node.cover.fluid
    return (
      <PostCard title={title} description={description} link={link}
                coverImg={coverImgFluid} updatedAt={updatedAt}
                categoryName={categoryName}/>
    )
  })
  return (
    <Layout>
      <section className='container'>
        <div className='row'>
          {postCards}
        </div>
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
          description
          updatedAt(formatString: "MMM DD, YYYY",locale:"vi")
          category {
            displayName
          }
          fields {
            genSlug
          }
          content {
            childMarkdownRemark {
              excerpt(truncate: true, pruneLength:250)
            }
          }
          cover {
           fluid(maxWidth: 1280,cropFocus:CENTER,resizingBehavior:FILL,maxHeight:600, quality: 100) {
              ...GatsbyContentfulFluid_noBase64
           }
          }
        }
    }
  }
}
`
