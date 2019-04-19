import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
// plugins
import classNames from 'classnames'
import Logo from 'images/logo.png'
// style

import './Header.css'
import * as styles from './Header.module.less'
import PropTypes from 'prop-types'

class Header extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      cateMenuOpen: false,
    }
    this.toggleCateMenu = this.toggleCateMenu.bind(this)
  }

  toggleCateMenu = () => {
    this.setState(
      (prevState) => this.setState({ cateMenuOpen: !prevState.cateMenuOpen }))
  }

  render() {
    const lv1Category = this.props.data.level1Category.edges.map(edge => {
      const text = edge.node.displayName
      const slug = edge.node.fields.genSlug
      return <li className="nav-item"><Link className="nav-link"
                                            to={slug}> {text} </Link></li>
    })
    return (
      <header className={`${this.props.isHomePage ? 'homepage' : ''}`}>
        <nav className="navbar navbar-expand-sm navbar__header py-0 w-100">
          <div className="container">
            <div
              className="navbar-brand d-flex justify-content-between w-100 align-items-center">
              <Link to="/" className="navbar__logo h5 font-weight-normal">
                <img className="header-logo" src={Logo} alt="header-logo"/>
              </Link>
              <div className="collapse navbar-collapse" id="navbarContent">
                <ul className="navbar-nav ml-auto">
                  {lv1Category}
                </ul>
              </div>
              <div className="navbar-toggler px-0">
                <button className={`hamburger hamburger--elastic 
                ${this.state.cateMenuOpen ? 'is-active' : ''}`}
                        type="button"
                        aria-label="Menu" aria-controls="navbarContent"
                        onClick={this.toggleCateMenu.bind(this)}>
                  <span className="hamburger-box">
                    <span className="hamburger-inner"/>
                  </span>
                </button>
                {/*<div className={classNames(styles.modalOverlay, { [styles.active]: this.state.cateMenuOpen })}/>*/}
                {
                  this.state.cateMenuOpen &&
                  <Modal category={lv1Category} active={this.state.cateMenuOpen}
                         closeModal={this.toggleCateMenu.bind(this)}/>

                }
              </div>

            </div>
          </div>
        </nav>
      </header>
    )
  }
}

class Modal extends React.PureComponent {
  static propTypes = {
    category: PropTypes.array.isRequired,
    active: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
  }
  static defaultProps = {
    active: false,
  }

  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
    }
  }

  closeModal = () => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        this.setState({ loaded: false }, () => {
          setTimeout(this.props.closeModal, 150)
        })
      })
    })

  }

  componentDidMount() {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        this.setState({ loaded: true })
      })
    })
  }

  render() {
    return (
      <div>
        <div
          className={classNames('modal container fade',
            { 'show': this.state.loaded }, styles.modalNav)}
          role="dialog" tabIndex={-1}
          onClick={this.closeModal}>
          <div className="modal-dialog mt-5" role="document">
            <div className="modal-content">
              <div className="p-0 modal-body">
                <div>
                  <ul className="navbar-nav ml-auto">
                    {this.props.category}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={classNames('modal-backdrop fade',
          { 'show': this.state.loaded })}/>
      </div>
    )
  }

}

export default props =>
  <StaticQuery
    query={
      graphql`
    {
           level1Category: allContentfulCategory(filter:{level: {eq:1}}) {
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
    }
    render={data => <Header data={data} {...props}/>}
  />
