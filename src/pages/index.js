import React from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../components/Layout'
import { genParentSlug } from 'heplers'

class IndexPage extends React.PureComponent {
  constructor(props) {
    super(props)

  }

  render() {
    const data = this.props.data
    const card = data.Post.edges.map(e => {
      const link = genParentSlug(e)
      return (
        <>
          <Link to={link}> <Img sizes={e.node.cover.sizes}/> </Link>
        </>
      )
    })
    return (
      <Layout>
        {card}
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
                slug
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
