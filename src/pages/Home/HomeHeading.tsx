import { Heading, Stack, Text } from "@chakra-ui/react";
import { theme } from "../../theme";

export const HomeHeading = () => (
  <Stack spacing="1.5">
    <Heading fontSize="2xl">GRE Essay Practice</Heading>
    <Text fontSize="lg" color={theme.grayColor}>
      This is a free tool to practice the issue and argument essays in the
      analytical writing section of the GRE test
    </Text>
  </Stack>
);
