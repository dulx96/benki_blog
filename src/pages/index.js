import React from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'
// components
import Layout from '../components/Layout'
import PostCard from 'components/Cards/PostCard'

class IndexPage extends React.PureComponent {
  constructor(props) {
    super(props)

  }

  render() {
    const data = this.props.data
    const postCards = data.Post.edges.map(e => {
      const link = e.node.fields.genSlug
      const title = e.node.title
      const description = e.node.description ||
        e.node.content.childMarkdownRemark.excerpt
      const updatedAt = e.node.updatedAt
      const categoryName = e.node.category.displayName
      const coverImgFluid = e.node.cover.fluid
      return (
        <PostCard title={title} description={description} link={link}
                  coverImg={coverImgFluid} updatedAt={updatedAt} categoryName={categoryName}/>
      )
    })
    return (
      <Layout>
        <section className="container">
          <div className="row news__content">
            <div className="col-sm-12 col-md-10 col-lg-8 col-xl-8 mx-auto px-0">
              {postCards}
            </div>
          </div>
        </section>
      </Layout>

    )
  }

}

export default props => (
  <StaticQuery query={graphql
    `
       {
          Post: allContentfulPost {
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

  }
               render={data => <IndexPage data={data} {...props}/>}/>
)
