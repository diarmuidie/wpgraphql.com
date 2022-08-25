import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import {
  useColorModeValue,
  Wrap,
  WrapItem,
  Avatar,
  Box,
} from "@chakra-ui/react"

const Testimonials = () => {
  const data = useStaticQuery(graphql`
    {
      allWpTestimonial {
        nodes {
          id
          title
          content
          testimonialFields {
            avatarurl
            content
            tweeturl
            name
            handle
          }
        }
      }
    }
  `)
  const bg = useColorModeValue("white", "gray.600")

  return (
    <div>
      <Wrap
        maxW="1200px"
        mx="auto"
        justify="space-between"
        align="center"
        spacing="10px"
        mt="20"
        as={`div`}
      >
        {data.allWpTestimonial.nodes.map((testimonial, idx) => {
          if (!testimonial.testimonialFields) {
            return null
          }

          const {
            testimonialFields: { avatarurl, content, tweeturl, name, handle },
          } = testimonial

          return (
            <WrapItem
              key={idx}
              maxWidth="280px"
              bg={bg}
              p="10"
              rounded="lg"
              shadow="base"
            >
              <a href={tweeturl} target="_blank" rel="noreferrer">
                <Avatar
                  mr="34px"
                  size="md"
                  src={avatarurl}
                  name={`Avatar of ${name}`}
                  loading="lazy"
                />
                <Box fontSize="sm">
                  <p>
                    {name}{" "}
                    <Box as="span" opacity={0.7}>
                      {`@${handle}`}
                    </Box>
                  </p>
                  <Box
                    as="p"
                    mt="2"
                    dangerouslySetInnerHTML={{
                      __html: content.replace(/--/g, "<br /><br />"),
                    }}
                  />
                </Box>
              </a>
            </WrapItem>
          )
        })}
      </Wrap>
    </div>
  )
}

export default Testimonials
