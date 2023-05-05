import { HStack, Link as ChakraLink, Text } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { theme } from "../../theme";

type ViewBackProps = {
  onBack: () => void;
};

export const ViewBack = (props: ViewBackProps) => (
  <ChakraLink color={theme.blueColor} onClick={props.onBack}>
    <HStack spacing="1.5">
      <ArrowBackIcon />
      <Text>Back home</Text>
    </HStack>
  </ChakraLink>
);
