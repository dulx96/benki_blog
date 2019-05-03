require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})
const { CONTENTFUL_SPACE_ID, CONTENTFUL_ACCESS_TOKEN, ANALYTICS_ID } = process.env
module.exports = {
  plugins: [
    `gatsby-plugin-resolve-src`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: CONTENTFUL_SPACE_ID,
        accessToken: CONTENTFUL_ACCESS_TOKEN,

      },
    },
    `gatsby-contentful-category-slug`,
    `gatsby-contentful-breadcrumbs`,
    `gatsby-contentful-post-slug`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        tableOfContents: {
          pathToSlugField: 'frontmatter.slug',
          heading: null,
          maxDepth: 3,
        },
        plugins: [
          {
            resolve: `gatsby-remark-ruby`,
            options: {
              parenthesis: '()',
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              inlineCodeMarker: '$$',
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
          },
          // `gatsby-remark-unwrap-images`,
          {
            resolve: `gatsby-remark-images-contentful`,
            options: {
              maxWidth: 1110,
              linkImagesToOriginal: false,
              withWebp: true,
            },
          },

          `gatsby-remark-autolink-headers`,
        ],
      },
    },
    {
      resolve: `gatsby-plugin-less`,

    },
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        postCssPlugins: [
          require('autoprefixer')({
            browsers: [
              '>1%',
              'last 4 versions',
              'Firefox ESR',
              'not ie < 9',
            ],
            flexbox: 'no-2009',
          })],
      },
    },
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        printRejected: true,
        develop: true,
        whitelist: ['pre', 'code'],
        ignore: ['/TOC'],
      },
    },
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Benki-Blog`,
        short_name: `Benki-Blog`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `standalone`,
        icon: `src/images/fav-icon/favicon-128.png`, // This path is relative to the root of the site.
      },
    },
  ],
}
