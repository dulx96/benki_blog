import React from 'react'
import { graphql, Link } from 'gatsby'

//components
import Layout from 'components/Layout'
import CategoryCard from 'components/Cards/CategoryCard'

const CatList = ({ data }) => {
  const { SubCategories, Category } = data
  const categoryCards = SubCategories.edges.map(edge => {
    const title = edge.node.displayName
    const link = edge.node.fields.genSlug
    const coverImgFluid = edge.node.cover.fluid
    const description = edge.node.description
    return <CategoryCard title={title} link={link} coverImg={coverImgFluid}/>
  })
  const categoryName = Category.edges[0].node.displayName
  return (
    <Layout>
      <section className="container">
        <div className="row">
          <div className="col-auto">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a>toang</a>
                </li>
                <li className="breadcrumb-item">
                  <a>toang</a>
                </li>
                <li className="breadcrumb-item">
                  <a>toang</a>
                </li>
              </ol>
            </nav>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <h1>{categoryName}</h1>
          </div>
        </div>
        <div className="row">
          {categoryCards}
        </div>
      </section>
    </Layout>
  )
}
export default CatList
export const pageQuery = graphql`
  query($parentCatId: String!) {
    SubCategories: allContentfulCategory(
      filter: { parentCat: { id: { eq: $parentCatId } } }
    ) {
      edges {
        node {
          displayName
          fields {
            genSlug
          }
          description
          cover {
            fluid(
              maxWidth: 800
              maxHeight: 500
              cropFocus: CENTER
              resizingBehavior: FILL
              quality: 100
            ) {
              ...GatsbyContentfulFluid_noBase64
            }
          }
        }
      }
    }
    Category: allContentfulCategory(
      filter: {id: {eq: $parentCatId} } ) 
        {
          edges {
            node {
              displayName 
            }
          }
        }
  }
`
