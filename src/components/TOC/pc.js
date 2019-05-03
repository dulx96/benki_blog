import React from 'react'
import PropTypes from 'prop-types'
// plugin
import AnchorLink from 'react-anchor-link-smooth-scroll'
import { Scrollbars } from 'react-custom-scrollbars'

//style
import './pc.less'
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
    this.state = {
      headerChilds: null,
      fromHeading: 1, //Header
      toHeading: 4,

    }
    this.toc = React.createRef()
    this.handleScrollWindow = this.handleScrollWindow.bind(this)
    this.activeClassActiveTOC = this.activeClassActiveTOC.bind(this)
  }

  handleScrollWindow() {
    const headerChilds = this.state.headerChilds
    const scrollHeight = window.pageYOffset
    const transformToc = this.defaultOffset > scrollHeight ? -scrollHeight : -this.defaultOffset
    this.toc.current.style = `transform: translateY(${transformToc}px)`
    headerChilds.map(c => {
      const el = document.getElementById(c.id)
      const topOffset = el.getBoundingClientRect().top
      if (topOffset >= 0 && topOffset <= this.defaultOffset) {
        this.activeClassActiveTOC(c.id)
      }
    })
  }

  // active el match id, remove active from others
  activeClassActiveTOC(id) {
    const headerChilds = this.state.headerChilds
    headerChilds.map(c => {
      const tocEl = document.getElementById(`toc-${c.id}`)
      if (c.id === id) {
        tocEl.classList.add('active')
      } else {
        tocEl.classList.remove('active')
      }
    })
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // gen header child from begin, global variables for other func
    if (!prevState.headerChilds) {
      const childrens = nextProps.htmlTree.children || []
      const headings = nextProps.headings
      if (typeof headings === 'undefined' || headings.length === 0) {
        return null
      }
      return {
        headerChilds: HelperTOC.getHeaderChildsFiltered(childrens, headings, prevState.fromHeading, prevState.toHeading),
      }
    }
    return null

  }

  componentDidMount() {
    if (typeof window !== 'undefined' && window) {
      this.handleScrollWindow()
      window.addEventListener('scroll', this.handleScrollWindow)
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScrollWindow)
  }

  render() {
    const headerChilds = this.state.headerChilds
    const maxHeading = HelperTOC.getMaxHeading(headerChilds)
    return (
      <div className="toc_container card" ref={this.toc}>
        <Scrollbars autoHeight autoHeightMax={`calc(100vh) - ${this.defaultOffset}px`} autoHide universal>
          <div className="scroll-wrapper">
            <div className="toc_name">Mục lục</div>
            {headerChilds.map(e => (
              <div
                key={e.id}
                className={`${
                  HelperTOC.genClassLevelByHeading(e.tagName, maxHeading)
                  } item`}
                id={`toc-${e.id}`}
              >
                <AnchorLink href={`#${e.id}`} offset={this.defaultOffset} dangerouslySetInnerHTML={{ __html: e.text }}/>
              </div>
            ))}
          </div>

        </Scrollbars>

      </div>
    )
  }
}
