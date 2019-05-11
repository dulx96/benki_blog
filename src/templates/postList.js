import React from 'react'
import { graphql, Link } from 'gatsby'

//components
import Layout from 'components/Layout'
import PostCard from 'components/Cards/PostCard'

// SEO
import SEO from 'SEO'

const PostList = ({ data }) => {
  const { postList, Category } = data
  const postCards = postList.edges.map(e => {
    const link = e.node.fields.genSlug
    const title = e.node.title
    const description =
      e.node.description || e.node.content.childMarkdownRemark.excerpt
    const updatedAt = e.node.updatedAt
    const categoryName = e.node.category.displayName
    const coverImgFluid = e.node.cover.fluid
    return (
      <PostCard
        title={title}
        description={description}
        link={link}
        coverImg={coverImgFluid}
        updatedAt={updatedAt}
        categoryName={categoryName}
      />
    )
  })
  const categoryName = Category.edges[0].node.displayName
  const categoryLevel = Category.edges[0].node.level
  const breadCrumbs = Category.edges[0].node.fields.genBreadCrumbs
  const breadCrumbsLi = breadCrumbs.map(e => {
      const isCurrent = e.level === categoryLevel
      return <li
        className={`breadcrumb-item ${isCurrent ? 'active' : ''}`}
        aria-current={isCurrent && 'page'}
      >
        {isCurrent ? e.displayName : <Link to={e.slug}>
          {e.displayName}
        </Link>}

      </li>
    },
  )

  // seo info
  const dataCategory = Category.edges[0].node
  const SEO_INFO = {
    title: dataCategory.displayName,
    description: dataCategory.description,
    linkImage: dataCategory.cover.seoImage.src,
    canonicalUrl: 'https:benkitv.com' + dataCategory.fields.genSlug,
  }
  return (
    <Layout>
      <SEO {...SEO_INFO} />
      <section className="container">
        {/*breadscrumb*/}
        <div className="row">
          <div className="col-auto">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                {breadCrumbsLi}
              </ol>
            </nav>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <h1>{categoryName}</h1>
          </div>
          <div className="w-100"/>
          <div className="col-md-9 news__content">
            {postCards}
          </div>
        </div>
      </section>
    </Layout>
  )
}
export default PostList
export const pageQuery = graphql`
  query($lastCatId: String!) {
    postList: allContentfulPost(
      filter: { category: { id: { eq: $lastCatId } } }
    ) {
      edges {
        node {
          id
          title
          description
          updatedAt(formatString: "MMM DD, YYYY", locale: "vi")
          category {
            displayName
          }
          fields {
            genSlug
          }
          content {
            childMarkdownRemark {
              excerpt(truncate: true, pruneLength: 250)
            }
          }
          cover {
            fluid(
              cropFocus: CENTER
              resizingBehavior: FILL
              maxHeight: 500
              quality: 70
            ) {
              ...GatsbyContentfulFluid_noBase64
            }
          }
        }
      }
    }
    Category: allContentfulCategory(
    filter: {id: {eq: $lastCatId} } ) 
      {
        edges {
          node {
            displayName
            level
            description
            cover {
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
            fields {
              genSlug
              genBreadCrumbs {
                  level
                  displayName
                  slug
             }
            }
          }
        }
      }
  }
`
