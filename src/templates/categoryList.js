import React from 'react'
import { graphql, Link } from 'gatsby'

import Layout from 'components/Layout'

const CatList = ({ data }) => {
  const { Lv2Cat } = data
  const card = Lv2Cat.edges.map(edge => <Link
    to={edge.node.fields.genSlug}>{edge.node.displayName} </Link>)
  return (
    <Layout>
      <section className='container'>
        {card}
      </section>
    </Layout>
  )

}
export default CatList
export const pageQuery = graphql`
 query($parentCatId: String!) {
  Lv2Cat: allContentfulCategory(filter:{parentCat: {id: {eq: $parentCatId}}}) {
    edges {
      node {
        displayName
        fields {
          genSlug
         }
      }
    }
  }
}
`
