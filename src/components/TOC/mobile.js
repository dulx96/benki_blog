import React from 'react'
import PropTypes from 'prop-types'
// plugin
import AnchorLink from 'react-anchor-link-smooth-scroll'
//style
import './mobile.less'
// utils
import * as HelperTOC from './utils'

export default class TOC extends React.PureComponent {
  static propTypes = {
    htmlTree: PropTypes.object.isRequired,
    headings: PropTypes.array.isRequired,
  }

  constructor() {
    super()
    this.defaultOffset = 100
    this.fromHeading = 3 //H
    this.toHeading = 5
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    const childrens = this.props.htmlTree.children || []
    const headings = this.props.headings
    if (typeof headings === 'undefined' || headings.length === 0) {
      return null
    }
    let headerChilds = HelperTOC.getHeaderChilds(childrens, headings)
    headerChilds = HelperTOC.filterHeading(headerChilds, this.fromHeading, this.toHeading)
    const maxHeading = HelperTOC.getMaxHeading(headerChilds)

    return (
      <div className="toc_m_container" ref={this.toc}>
        <div className="toc_m_name">Mục lục</div>
        {headerChilds.map(e => (
          <div
            key={e.id}
            className={`${
              HelperTOC.genClassLevelByHeading(e.tagName, maxHeading)
              } item`}
          >
            <AnchorLink href={`#${e.id}`} offset={this.defaultOffset} dangerouslySetInnerHTML={{ __html: e.text }}/>
          </div>
        ))}
      </div>

    )
  }
}
