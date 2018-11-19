module.exports = {
  pathPrefix: "/enblog",
  siteMetadata: {
    title: 'Juhyung blog',
    description: `Blog about game development`,
    siteUrl: `https://blog.majecty.com/enblog`
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
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/images/gatsby-icon.png', // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-feed`
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
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-78778924-2",
        // Puts tracking script in the head instead of the body
        head: false,
        // Avoids sending pageview hits from custom paths
        exclude: ["/preview/**"],
        // Enables Google Optimize using your container Id
        optimizeId: "GTM-54R6RG5",
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
  ],
}
