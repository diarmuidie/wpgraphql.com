import React from "react"
import { Box, Flex, Heading } from "@chakra-ui/react"
import Layout from "../components/Layout"
import Container from "../components/Container"
import { graphql } from "gatsby"
import PageTransition from "../components/PageTransition"
import DocsSidebar from "../components/DocsSidebar"
import { ParseHtml } from "../components/parse-html"
import TableOfContents from "../components/TableOfContents"
import Breadcrumb from "../components/breadcrumb/Breadcrumb"
import { getPagination, navMenuListFromYaml } from "../utils"
import Pagination from "../components/Pagination"

const MarkDownDoc = ({ data }) => {
  const { markdownRemark: post, navMenu, markdownDocs, wpDocs } = data

  // Get only the page items from navigation yaml in order
  let navRoutes = navMenuListFromYaml(
    navMenu.nodes,
    markdownDocs.nodes.concat(wpDocs.nodes)
  )
  navRoutes = navRoutes
    .map(function (item) {
      item.uri = item.path
      return item
    })
    .filter((item) => "#" !== item.path)

  const pagination = getPagination(post.frontmatter.uri, navRoutes)

  const crumbs = [
    {
      title: "Docs",
      path: "/docs/introduction/",
      isCurrentPage: false,
    },
    {
      title: post.frontmatter.title,
      path: post.frontmatter.uri,
      isCurrentPage: true,
    },
  ]

  return (
    <Layout>
      <Container>
        <Flex>
          <DocsSidebar title={"Docs"} />
          <Box style={{ flex: 1 }}>
            <Box pt={3} pl={[0, 0, 10]} pr={0} mt="0" mx="auto" minH="80vh">
              <PageTransition>
                <Flex>
                  <Box
                    className="content"
                    pt={3}
                    mt="0"
                    mx="auto"
                    maxWidth={[`20rem`, "30rem", "40rem"]}
                    minH="80vh"
                  >
                    <Breadcrumb crumbs={crumbs} />
                    <Heading as="h1" fontSize={`4xl`}>
                      {post.frontmatter.title}
                    </Heading>
                    {ParseHtml(post.html)}
                    <Pagination
                      sx={{ ".pagination-link": { wordBreak: "break-word" } }}
                      next={pagination.next}
                      previous={pagination.previous}
                    />
                  </Box>
                  <TableOfContents
                    content={post.html}
                    contentRef={ParseHtml(post.html)}
                  />
                </Flex>
              </PageTransition>
            </Box>
          </Box>
        </Flex>
      </Container>
    </Layout>
  )
}

export const query = graphql`
  query ($id: String) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        uri
      }
    }
    navMenu: allDocsNavMenuYaml {
      nodes {
        id
        section {
          name
          items {
            uri
            title: label
          }
        }
      }
    }
    markdownDocs: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "//v1/docs//" } }
    ) {
      nodes {
        frontmatter {
          uri
          title
        }
      }
    }
    wpDocs: allWpDocument {
      nodes {
        uri
        title
      }
    }
  }
`

export default MarkDownDoc
