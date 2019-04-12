import React from 'react'
import { graphql } from 'gatsby'

import Layout from 'components/Layout'
import TOC from 'components/TOC'
// plugin
// style
import './blogpost.less'

const BlogPost = ({ data }) => {
  const { content } = data.Post
  return (
    <Layout>
      <section className='container'>
        <div className='row news__content'>
          <div className="col-sm-9 px-0 docs__content">
            <div className="card">
              <div className="card-body"
                   dangerouslySetInnerHTML={{ __html: content.childMarkdownRemark.html }}/>
            </div>
          </div>
          <div className="container toc">
            <div className="col-sm-9"/>
            <div className="col-sm-3">
              <TOC htmlTree={content.childMarkdownRemark.htmlAst}
                   headings={content.childMarkdownRemark.headings}/>
            </div>
          </div>

        </div>
      </section>
    </Layout>
  )
}
export default BlogPost
export const pageQuery = graphql`
 query($id: String!) {
  Post: contentfulPost(id:{eq: $id}){
    content {
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
