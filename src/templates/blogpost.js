import React from 'react'
import { graphql } from 'gatsby'

import Layout from 'components/Layout'
import TOC from 'components/TOC'
// plugin
import Img from 'gatsby-image'
// style
import './blogpost.less'

const parseRbTag = (string) => {
  const pattern = /{([^{}.]*)}\^\(([^\(\)]*)\)/
  const re = new RegExp(pattern, 'g')
  return string.replace(re, (text) => {
    const temp = pattern.exec(text)
    const rb = temp[1]
    const rt = temp[2]
    return `<ruby>${rb}<rp>(</rp><rt>${rt}</rt><rp>)</rp></ruby>`
  })
}
const parseCodeInCodeTag = (string) => {
  const pattern = /`([^`]*)\$\$([^`]*)`/
  const re = new RegExp(pattern, 'g')
  return string.replace(re, (text) => {
    const temp = pattern.exec(text)
    const cl = temp[1]
    const content = temp[2]
    return `<code class='language-${cl}'>${content}</code>`
  })

}
const processHtml = (html) => {
  let temp
  temp = parseRbTag(html)
  temp = parseCodeInCodeTag(temp)
  return temp
}
const BlogPost = ({ data }) => {
  const { Post } = data
  const content = Post.content
  const imageFluid = Post.cover.fluid
  const title = Post.title
  const html = processHtml(content.childMarkdownRemark.html) //  cause code tag is all rendered as plain text, u need to parse after
  return (
    <Layout>
      <section className="container">
        <div className="row news__content">
          <div className="col-lg-9 px-0 docs__content">
            <div className="card">
              <h1>{title}</h1>
              <Img sizes={imageFluid} alt={title}/>
              <div
                className="card-body"
                dangerouslySetInnerHTML={{
                  __html: html,
                }}
              />
            </div>
          </div>
          <div className="container toc">
            <div className="col-lg-9"/>
            <div className="col-lg-3">
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
        fluid(maxWidth: 1280, quality:70) {
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
