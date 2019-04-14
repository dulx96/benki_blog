import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'

// components
import Header from './Header/'

// styles
import 'styles/layout/index.css'
import 'styles/layout/index.less'

const Layout = (props) => (
  <StaticQuery
    query={graphql`
       {
           level1Category: allContentfulCategory(filter:{level: {eq:1}}) {
              edges {
                node {
                  displayName
                  childCategorySlug{
                    slugCategory
                  }
                }
              }
            }
          
          }
    `}
    render={data => (
      <>
        <Header {...props}/>
        <main>{props.children}</main>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
