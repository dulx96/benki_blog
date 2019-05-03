import React from 'react'
import PropTypes from 'prop-types'
// plugin
import AnchorLink from 'react-anchor-link-smooth-scroll'
import { Scrollbars } from 'react-custom-scrollbars'

//style
import './index.less'
// functions
const getHeaderChilds = (childrens, headings) =>
  childrens
    .filter(c => {
      if (['h4', 'h2', 'h3'].includes(c.tagName)) {
        return true
      } else return false
    })
    .map((c, index) => ({
      tagName: c.tagName,
      id: c.properties.id,
      text: headings[index].value,
    }))
export default class TOC extends React.PureComponent {
  static propTypes = {
    htmlTree: PropTypes.object.isRequired,
    headings: PropTypes.array.isRequired,
  }

  constructor() {
    super()
    this.defaultOffset = 100
    this.toc = React.createRef()
    this.handleScrollWindow = this.handleScrollWindow.bind(this)
    this.activeClassActiveTOC = this.activeClassActiveTOC.bind(this)
  }

  handleScrollWindow() {
    const childrens = this.props.htmlTree.children || []
    const headings = this.props.headings
    const headerChilds = getHeaderChilds(childrens, headings)
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
    const childrens = this.props.htmlTree.children || []
    const headings = this.props.headings
    const headerChilds = getHeaderChilds(childrens, headings)
    headerChilds.map(c => {
      const tocEl = document.getElementById(`toc-${c.id}`)
      if (c.id === id) {
        tocEl.classList.add('active')
      } else {
        tocEl.classList.remove('active')
      }
    })
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
    const childrens = this.props.htmlTree.children || []
    const headings = this.props.headings
    if (typeof headings === 'undefined' || headings.length === 0) {
      return null
    }
    const headerChilds = getHeaderChilds(childrens, headings)
    return (
      <div className="toc_container card" ref={this.toc}>
        <Scrollbars autoHeight autoHeightMax={`calc(100vh) - ${this.defaultOffset}px`} autoHide universal>
          <div className="scroll-wrapper">
            <div className="toc_name">Mục lục</div>
            {headerChilds.map(e => (
              <div
                key={e.id}
                className={`${
                  e.tagName === 'h2'
                    ? 'level-1'
                    : e.tagName === 'h3'
                    ? 'level-2'
                    : 'level-3'
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
