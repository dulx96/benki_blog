import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

// plugins
import Img from 'gatsby-image'

export default class CategoryCard extends React.PureComponent {
  static defaultProps = {}
  static propTypes = {
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    coverImg: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="col-sm-6 col-md-4 col-lg-3 px-2 py-2">
        <div className="card">
          <Link to={this.props.link} className="news__clickable">
            <h3>{this.props.title}</h3>
          </Link>
          <Img fluid={this.props.coverImg} alt={this.props.title}/>
        </div>
      </div>
    )
  }
}
