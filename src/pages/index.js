import React from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'
// components
import Layout from '../components/Layout'
import PostCard from 'components/Cards/PostCard'

//styles

// img
import playIcon from 'images/play_icon.svg'
import nguPhap from 'images/ngu_phap.png'
import tuVung from 'images/tu_vung.png'
import giaoTiep from 'images/giao_tiep.png'
import vanHoa from 'images/van_hoa.png'
import nhatBan from 'images/nhat_ban.png'

class IndexPage extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const data = this.props.data
    const postCards = data.Post.edges.map(e => {
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
    return (
      <Layout isHomePage={true}>
        <section className="container-fluid hero__main">
          <div className="container">
            <div className="row align-content-center text-center justify-content-center hero__main-content">
              <div className="hero__main-content-items col-sm-8 col-md-9 col-lg-7 col-xl-6 mx-auto"
                   style={{ 'align-self': 'center' }}>
                {/*fix bug ios*/}
                <h3 className="text-center">
                  Blog chia sẻ kiến thức tiếng Nhật
                </h3>
                <h1>Học tiếng Nhật online qua video song ngữ</h1>
                <div>
                  <span>
                    <a
                      href="https://benkitv.com"
                      className="btn btn-secondary btn__play-video mr-2"
                    >
                      <img
                        src={playIcon}
                        className="icon-play-triangle mr-2 mb-1"
                        alt="play"
                      />
                      Xem ngay
                    </a>
                  </span>
                  <a
                    className="btn btn-primary"
                    href="https://benkitv.com/about"
                  >
                    Giới thiệu
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="container-fluid grey-bg hero__kits-overview-section">
          <div className="container">
            <div className="row text-center hero__kits-overview-section-card">
              <div className="card col-md-12 mx-auto py-5">
                <div className="row">
                  <div className="col-sm-15 text-center">
                    <div className="card card__kits">
                      <div className="kit-image">
                        <img
                          className="img-fluid"
                          src={nguPhap}
                          alt="Ngữ Pháp"
                        />
                      </div>
                      <h4 className="mt-2 mt-md-4 font-weight-demi blue">
                        Ngữ Pháp
                      </h4>
                    </div>
                  </div>
                  <div className="col-sm-15 text-center mt-24 mt-sm-0">
                    <div className="card card__kits">
                      <div className="kit-image">
                        <img className="img-fluid" src={tuVung} alt="Từ Vựng"/>
                      </div>
                      <h4 className="mt-2 mt-md-4 font-weight-demi purple">
                        Từ Vựng
                      </h4>
                    </div>
                  </div>
                  <div className="col-sm-15 text-center mt-24 mt-sm-0">
                    <div className="card card__kits">
                      <div className="kit-image">
                        <img
                          className="img-fluid"
                          src={giaoTiep}
                          alt="Giao Tiếp"
                        />
                      </div>
                      <h4 className="mt-2 mt-md-4 font-weight-demi green">
                        Giao Tiếp
                      </h4>
                    </div>
                  </div>
                  <div className="col-sm-15 text-center mt-24 mt-sm-0">
                    <div className="card card__kits">
                      <div className="kit-image">
                        <img className="img-fluid" src={vanHoa} alt="Văn Hóa"/>
                      </div>
                      <h4 className="mt-2 mt-md-4 font-weight-demi orange">
                        Văn Hóa
                      </h4>
                    </div>
                  </div>
                  <div className="col-sm-15 text-center mt-24 mt-sm-0">
                    <div className="card card__kits">
                      <div className="kit-image">
                        <img
                          className="img-fluid"
                          src={nhatBan}
                          alt="Nhật Bản"
                        />
                      </div>
                      <h4 className="mt-2 mt-md-4 font-weight-demi red">
                        Nhật Bản
                      </h4>
                    </div>
                  </div>
                  <p className="col-md-10 mx-auto mt-4">
                    Snap Kit lets developers like you integrate some of
                    Snapchat’s best features across your platform — and lets
                    your community share their favorite moments from your app
                    with their friends, and Snapchatters across the world!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="container post__list">
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
  <StaticQuery
    query={graphql`
      {
        Post: allContentfulPost {
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
                  maxWidth: 1280
                  cropFocus: CENTER
                  resizingBehavior: FILL
                  maxHeight: 600
                  quality: 100
                ) {
                  ...GatsbyContentfulFluid_noBase64
                }
              }
            }
          }
        }
      }
    `}
    render={data => <IndexPage data={data} {...props} />}
  />
)
