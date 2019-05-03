import React from 'react'
import PropTypes from 'prop-types'
// plugin
import AnchorLink from 'react-anchor-link-smooth-scroll'
import { Collapse, UnmountClosed } from 'react-collapse'
//style
import './mobile.less'
import arrow_down from 'styles/icons/arrow_down.svg'
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
    this.fromHeading = 1 //H
    this.toHeading = 3
    this.state = {
      active: false,
    }
  }

  toggleActive = () => {
    this.setState((prev) => ({ active: !prev.active }))
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
    const headerChilds = HelperTOC.getHeaderChildsFiltered(childrens, headings, this.fromHeading, this.toHeading)
    const maxHeading = HelperTOC.getMaxHeading(headerChilds)

    return (
      <div className="toc_m_container" ref={this.toc}>
        <div className="toc_m_name" onClick={this.toggleActive}>Mục lục <img
          className={`arrow-down ${this.state.active ? 'active' : ''}`} src={arrow_down}/></div>
        <UnmountClosed isOpened={this.state.active}>
          <div className="toc_m_content">
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

        </UnmountClosed>

      </div>

    )
  }
}
