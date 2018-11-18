import React from 'react'
import { Link, graphql } from 'gatsby'
import { css } from "react-emotion";

import Layout from '../components/layout'
import Image from '../components/image'

const IndexPage = ({ data }) => (
  <Layout>
    <h1>All blogs</h1>
    <h4>{data.allMarkdownRemark.totalCount} Posts</h4>
    {data.allMarkdownRemark.edges.map(({ node }) => (
      <div key={node.id}>
        <Link
              to={node.fields.slug}
              className={css`
                text-decoration: none;
                color: inherit;
              `}
        >
          <h3
            className={css`
              margin-bottom: 10px;
            `}
          >
            {node.frontmatter.title}{" "}
            <span
              className={css`
                color: #bbb;
              `}
            >
              - {node.frontmatter.date}
            </span>
          </h3>
        </Link>
        <p>{node.excerpt}</p>
      </div>
    ))}
  </Layout>
)

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`


export default IndexPage
