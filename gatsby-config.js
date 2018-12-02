module.exports = {
  pathPrefix: "/enblog",
  siteMetadata: {
    title: 'Juhyung blog',
    description: `Blog about game development`,
    siteUrl: `https://blog.majecty.com`
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages`,
      },
    },
    'gatsby-transformer-sharp',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Juhyung's blog`,
        short_name: `Juhyung's blog`,
        start_url: '/enblog',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/images/favicon_310.png', // This path is relative to the root of the site.
        icons: [{
          src: `/enblog/favicon/favicon_16.png`,
          sizes: `16x16`,
          type: `image/png`,
        }, {
          src: `/enblog/favicon/favicon_32.png`,
          sizes: `32x32`,
          type: `image/png`,
        }, {
          src: `/enblog/favicon/favicon_96.png`,
          sizes: `96x96`,
          type: `image/png`,
        }, {
          src: `/enblog/favicon/favicon_310.png`,
          sizes: `310x310`,
          type: `image/png`,                    
        }]
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
              pathPrefix
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  url: site.siteMetadata.siteUrl + site.pathPrefix + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl+ site.pathPrefix + edge.node.fields.slug,
                  custom_elements: [{ "content:encoded": edge.node.html }],
                })
              })
            },
            query: `
              {
                allMarkdownRemark(
                  limit: 1000,
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      fields { slug }
                      frontmatter {
                        title
                        date
                      }
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "JuhyungBlog RSS Feed",
          },
        ],
      },
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [{
          resolve: `gatsby-remark-prismjs`,
        }]
      }
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
  ],
}
