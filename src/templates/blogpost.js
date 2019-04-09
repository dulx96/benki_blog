import React from 'react'
import { graphql } from 'gatsby'
import Layout from 'components/Layout'

const BlogPost = ({ data }) => {
  const { body } = data.contentfulBlogSpot
  return (
    <Layout>
      <section className='container'>
        <div dangerouslySetInnerHTML={{ __html: body.childMarkdownRemark.html }}/>
      </section>
    </Layout>
  )
}
export default BlogPost
export const pageQuery = graphql`
 query($slug: String!) {
  contentfulBlogSpot(slug: {eq: $slug}) {
    id
    slug
    body {
      body
     childMarkdownRemark {
            id
            html
      }
    }
  }
 }
`
