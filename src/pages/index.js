import React from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../components/Layout'

class IndexPage extends React.PureComponent {
  constructor(props) {
    super(props)

  }

  render() {
    const data = this.props.data
    const card = data.Post.edges.map(e => {
      const link = e.node.childPostSlug.slugPost
      const title = e.node.title
      return (
        <>
          <Link to={link}>{title}</Link>
        </>
      )
    })
    return (
      <Layout>
        <section className="container">
          {card}
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
                childPostSlug {
                    slugPost
                }
                cover {
                 sizes(maxWidth: 1280) {
                    ...GatsbyContentfulSizes
                 }
                }
                categories {
                  title 
                  level
                  slug
                }
              }
            }
          }
    }
    
    `

  }
               render={data => <IndexPage data={data} {...props}/>}/>
)
