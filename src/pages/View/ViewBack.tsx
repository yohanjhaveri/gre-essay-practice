import { Link } from "react-router-dom";
import { HStack, Link as ChakraLink, Text } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { theme } from "../../theme";

export const ViewBack = () => (
  <Link to="/">
    <ChakraLink color={theme.blueColor}>
      <HStack spacing="1.5">
        <ArrowBackIcon />
        <Text>Back home</Text>
      </HStack>
    </ChakraLink>
  </Link>
);
