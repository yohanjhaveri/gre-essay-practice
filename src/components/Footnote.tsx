import { Icon, Link as ChakraLink, Text } from "@chakra-ui/react";
import { FaHeart } from "react-icons/fa";
import { theme } from "../theme";

export const Footnote = () => {
  return (
    <Text position="relative" fontWeight="medium">
      Built with{" "}
      <Icon
        as={FaHeart}
        marginX="0.5"
        top="0.5"
        color={theme.blueColor}
        fontSize="sm"
        position="relative"
      />{" "}
      by{" "}
      <ChakraLink
        href="https://yohanjhaveri.com"
        color={theme.blueColor}
        fontWeight="semibold"
        target="_blank"
        rel="noreferrer"
      >
        Yohan Jhaveri
      </ChakraLink>
    </Text>
  );
};
