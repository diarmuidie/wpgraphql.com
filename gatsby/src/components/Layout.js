import React from "react"
import {
  chakra,
  Box,
  Button,
  Flex,
  useColorMode,
  useColorModeValue,
  Text,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Spacer,
  useDisclosure,
  Link as ChakraLink,
} from "@chakra-ui/react"
import {
  FaMoon,
  FaSun,
  FaGithub,
  FaWordpress,
  FaBars,
  FaTimes,
} from "react-icons/fa"
import { Link } from "gatsby"
import Logo from "./Logo"
import Search from "./Search"
import Container from "./Container"
import PrimaryNav from "./PrimaryNav"
import PrimaryNavMobile from "./PrimaryNavMobile"
import FooterSocialLinks from "./FooterSocialLinks"
import "../styles/global.css"

const DrawerNav = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()

  return (
    <>
      <Button
        ref={btnRef}
        colorScheme="blue"
        onClick={isOpen ? onClose : onOpen}
        display={["block", "block", "none"]}
        aria-label="Open Nav"
      >
        {isOpen ? <FaTimes /> : <FaBars />}
        <chakra.span sx={{ display: "none" }}>Open mobile nav</chakra.span>
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>WPGraphQL</DrawerHeader>

            <DrawerBody>
              <PrimaryNavMobile display="flex" />
            </DrawerBody>

            <DrawerFooter>
              <FooterSocialLinks />
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  )
}

function Layout(props) {
  const { toggleColorMode } = useColorMode()
  const SwitchIcon = useColorModeValue(FaMoon, FaSun)
  const bg = useColorModeValue("white", "gray.800")
  const btnRef = React.useRef()
  return (
    <Box>
      <chakra.header
        top="0"
        position="fixed"
        zIndex="99"
        bg={bg}
        left="0"
        right="0"
        borderBottomWidth="1px"
        width="full"
        {...props}
      >
        <Container pt={0} px={0} mt="0" height="auto" mx="auto" minHeight="0">
          <Flex
            w="100%"
            h="100%"
            py={3}
            px={5}
            align="center"
            justify="space-between"
          >
            <Flex align="center">
              <Link to="/" aria-label="Home Page">
                <Logo />
                <chakra.span sx={{ display: "none" }}>Homepage</chakra.span>
              </Link>
              <PrimaryNav display={{ base: "none", md: "flex" }} />
            </Flex>

            <Flex>
              <Search />
              <Spacer mx={1} />
              <Button
                as={ChakraLink}
                pt={3}
                href="https://github.com/wp-graphql/wp-graphql"
                display={["none", "none", "block"]}
                aria-label="Link to WPGraphQL on Github"
              >
                <FaGithub />
                <chakra.span sx={{ display: "none" }}>
                  Link to WPGraphQL on Github
                </chakra.span>
              </Button>
              <Spacer mx={1} />
              <Button
                as={ChakraLink}
                pt={3}
                href="https://wordpress.org/plugins/wp-graphql"
                display={["none", "none", "block"]}
                aria-label="Link to WPGraphQL on WordPress.org"
              >
                <FaWordpress />
                <chakra.span sx={{ display: "none" }}>
                  Link to WPGraphQL on WordPress.org
                </chakra.span>
              </Button>

              <Spacer mx={1} />
              <Button
                onClick={toggleColorMode}
                aria-label="Change color theme of the site"
              >
                <SwitchIcon />
                <chakra.span sx={{ display: "none" }}>
                  Change color theme of the site
                </chakra.span>
              </Button>
              <Spacer mx={1} />
              <DrawerNav btnRef={btnRef} />
            </Flex>
          </Flex>
        </Container>
      </chakra.header>
      <Box as="main" mt={"70"}>
        {props.children}
      </Box>
      <chakra.footer
        bottom="0"
        zIndex="1"
        bg={bg}
        left="0"
        right="0"
        border="0"
        width="full"
        {...props}
      >
        <chakra.div border="0" height="6rem" mx="auto" maxW="1200px">
          <Flex
            w="100%"
            h="100%"
            py={3}
            px={5}
            align="center"
            justify="space-around"
            border="0"
          >
            <Text>
              Development sponsored by{" "}
              <a href="https://wpengine.com/" target="_blank" rel="noreferrer">
                <Text
                  as={`span`}
                  border="0"
                  color={useColorModeValue(`blue.600`, `#0cf`)}
                >
                  WP Engine
                </Text>
              </a>
            </Text>
          </Flex>
          <Flex
            border="0"
            w="100%"
            h="100%"
            py={3}
            px={5}
            align="center"
            justify="space-around"
          >
            <FooterSocialLinks />
          </Flex>
        </chakra.div>
      </chakra.footer>
    </Box>
  )
}

export default Layout
