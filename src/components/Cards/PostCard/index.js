import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

// plugins
import Img from 'gatsby-image'

export default class PostCard extends React.PureComponent {
  static defaultProps = {}
  static propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    categoryName: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    coverImg: PropTypes.object,
  }

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="card">
        <div>
          <Link to={this.props.link} className="news__clickable">
            <h3>{this.props.title}</h3>
            <div className="clearfix header">
              <span className="subtitle float-left">
                {this.props.updatedAt}
              </span>
              <span className="subtitle float-right">
                {this.props.categoryName}
              </span>
            </div>
          </Link>
          <hr />
          <div className="card-body">
            <div>
              <p style={{ overflow: 'hidden' }}>{this.props.description}</p>
            </div>
          </div>
          <Img fluid={this.props.coverImg} alt={this.props.title} />
        </div>
      </div>
    )
  }
}
