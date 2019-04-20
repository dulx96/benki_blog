import React from 'react'
import { graphql } from 'gatsby'

import Layout from 'components/Layout'
import TOC from 'components/TOC'
// plugin
import Img from 'gatsby-image'
// style
import './blogpost.less'

const BlogPost = ({ data }) => {
  const { Post } = data
  const content = Post.content
  const imageFluid = Post.cover.fluid
  const title = Post.title
  return (
    <Layout>
      <section className="container">
        <div className="row news__content">
          <div className="col-sm-9 px-0 docs__content">
            <div className="card">
              <h1>{title}</h1>
              <Img sizes={imageFluid} alt={title}/>
              <div
                className="card-body"
                dangerouslySetInnerHTML={{
                  __html: content.childMarkdownRemark.html,
                }}
              />
            </div>
          </div>
          <div className="container toc">
            <div className="col-sm-9"/>
            <div className="col-sm-3">
              <TOC
                htmlTree={content.childMarkdownRemark.htmlAst}
                headings={content.childMarkdownRemark.headings}
              />
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
    Post: contentfulPost(id: { eq: $id }) {
      title
      cover {
        fluid(maxWidth: 1280, quality:100) {
          ...GatsbyContentfulFluid_noBase64
        }
      }
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
