import React from 'react'
import { graphql } from 'gatsby'

//components
import Layout from 'components/Layout'
import CategoryCard from 'components/Cards/CategoryCard'

const CatList = ({ data }) => {
  const { Categories } = data
  const categoryCards = Categories.edges.map(edge => {
    const title = edge.node.displayName
    const link = edge.node.fields.genSlug
    const coverImgFluid = edge.node.cover.fluid
    const description = edge.node.description
    return <CategoryCard title={title} link={link} coverImg={coverImgFluid}/>
  })
  return (
    <Layout>
      <section className='container'>
        <div className='row'>
          {categoryCards}
        </div>
      </section>
    </Layout>
  )

}
export default CatList
export const pageQuery = graphql`
 query($parentCatId: String!) {
   Categories: allContentfulCategory(filter:{parentCat: {id: {eq: $parentCatId}}}) {
   edges {
            node {
              displayName
              fields {
                genSlug
              }
              description
               cover {
                 fluid(maxWidth: 800,maxHeight:500,cropFocus:CENTER,resizingBehavior:FILL, quality: 100) {
                    ...GatsbyContentfulFluid_noBase64
                 }
                }
            }
          }
  }
}
`
