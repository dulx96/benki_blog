import React from 'react'
import { graphql } from 'gatsby'

import Layout from 'components/Layout'
import TOC from 'components/TOC'
// plugin

const BlogPost = ({ data }) => {
  const { body } = data.contentfulBlogSpot
  return (
    <Layout>
      <section className='container'>
        <div className='row news__content'>
          <div className="col-sm-9 px-0 docs__content">
            <div className="card">

              <div className="card-body" dangerouslySetInnerHTML={{ __html: body.childMarkdownRemark.html }}/>
            </div>
          </div>
          <div className="col-sm-3 ">
            <TOC htmlTree={body.childMarkdownRemark.htmlAst} headings={body.childMarkdownRemark.headings}/>
          </div>

        </div>
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
     childMarkdownRemark {
            html
            htmlAst
            headings {
             value
            }
      }
    }
  }
 }
`
