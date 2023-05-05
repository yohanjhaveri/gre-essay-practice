import { Flex, Text } from "@chakra-ui/react";
import { theme } from "../../theme";

export const HomeEssaysNone = () => (
  <Flex
    color={theme.grayColor}
    bg={theme.bgColor}
    textAlign="center"
    borderRadius="md"
    justifyContent="center"
    alignItems="center"
    w="100%"
    h="400px"
    p="50px"
  >
    <Text>You will see your completed essays displayed here</Text>
  </Flex>
);
