import React from 'react'
import { graphql } from 'gatsby'

import Layout from 'components/Layout'
import { TOC_PC, TOC_Mobile } from 'components/TOC'
// plugin
import Img from 'gatsby-image'
// style
import './blogpost.less'

// SEO
import SEO from 'SEO'

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

  // SEO INFO
  const SEO_INFO = {
    title: Post.title,
    description: Post.description || content.childMarkdownRemark.excerpt,
    linkImage: 'https:' + Post.cover.seoImage.src,
    canonicalUrl: 'https://blog.benkitv.com' + Post.fields.genSlug,
  }
  return (
    <Layout>
      <SEO {...SEO_INFO} />
      <section className="container">
        <div className="row news__content">
          <div className="col-md-9 px-0 docs__content">
            <div className="card">
              <h2>{title}</h2>
              <Img sizes={imageFluid} alt={title}/>
              <TOC_Mobile htmlTree={content.childMarkdownRemark.htmlAst}
                          headings={content.childMarkdownRemark.headings}/>
              <div
                className="card-body"
                dangerouslySetInnerHTML={{
                  __html: html,
                }}
              />
            </div>
          </div>
          <div className="container toc">
            <div className="col-md-9"/>
            <div className="col-md-3">
              <TOC_PC
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
      description
      fields {
                genSlug
              }
      cover {
        fluid(maxWidth: 1280, quality:70) {
          ...GatsbyContentfulFluid_noBase64
        }
        seoImage: fluid(
                    maxWidth: 1200
                    maxHeight: 630
                    cropFocus: CENTER
                    resizingBehavior: FILL
                    quality: 70
                  ) {
                    src
                  }
      }
      content {
          childMarkdownRemark {
            html
            htmlAst
            headings {
              value
            }
            excerpt
          }
      }
    }
  }
`
