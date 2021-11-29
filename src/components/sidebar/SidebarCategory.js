import { Icon, chakra, useColorModeValue } from "@chakra-ui/react"
import React, { useRef, useState, useEffect } from "react"

const Arrow = (props) => (
  <svg viewBox="0 0 5 8" fill="none" {...props}>
    <path
      d="M0 0.724246C0 0.111374 0.681914 -0.223425 1.13107 0.168926L4.66916 3.25957C5.11028 3.6449 5.11028 4.3551 4.66916 4.74043L1.13107 7.83107C0.681913 8.22342 0 7.88863 0 7.27575V0.724246Z"
      fill="currentColor"
    />
  </svg>
)

function SidebarCategory(props) {
  const { isMobile, title, selected, opened, children, contentRef, ...rest } =
    props

  const ref = useRef(null)

  const [{ toggle, shouldScroll = false }, setToggle] = useState({
    toggle: selected || opened,
  })

  const onClick = () => {
    console.log("shouldScroll...")
    setToggle({ toggle: !toggle, shouldScroll: true })
  }

  // If a category is selected indirectly, open it. This can happen when using the search input
  useEffect(() => {
    if (selected) {
      console.log({ selected })
      setToggle({ toggle: true, shouldScroll: true })
    }
  }, [selected])

  // Navigate to the start of the category when manually opened
  useEffect(() => {
    console.log("go to the start of the category...")
    console.log({
      toggle,
      shouldScroll,
      current: ref.current,
    })
    if (toggle && shouldScroll && ref.current != null) {
      const contentEl = ref.current
      console.log({ contentRef })

      if (toggle === true && contentEl) {
        // 10 is added for better margin
        const height = ref.current.offsetTop
        contentEl.scrollTop = height

        console.log({ height: height })

        setToggle({ toggle })
      }
    }
  }, [toggle, shouldScroll, isMobile, contentRef])

  const buttonColor = useColorModeValue("gray.600", "inherit")
  const buttonHoverColor = useColorModeValue("gray.900", "inherit")

  return (
    <chakra.div mt="8" ref={ref} {...rest}>
      <chakra.button
        width="full"
        cursor="pointer"
        textTransform="uppercase"
        letterSpacing="wider"
        style={{ outlineOffset: 4 }}
        fontSize="xs"
        fontWeight="bold"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        userSelect="none"
        color={buttonColor}
        onClick={onClick}
        _hover={{
          color: buttonHoverColor,
        }}
      >
        {title}
        <Icon
          w="auto"
          h="2"
          mr="16px"
          transformOrigin="center"
          transform={toggle ? "rotate(90deg)" : undefined}
          transition="transform 0.15s ease"
          as={Arrow}
          color="gray.400"
        />
      </chakra.button>
      <chakra.div hidden={!toggle} mt="16px" mx="-3">
        {children}
      </chakra.div>
    </chakra.div>
  )
}

export default SidebarCategory
