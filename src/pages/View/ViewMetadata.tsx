import { Flex, Text } from "@chakra-ui/react";
import { theme } from "../../theme";

type ViewMetadataProps = {
  id: string;
  date?: string;
};

export const ViewMetadata = (props: ViewMetadataProps) => (
  <Flex
    width="full"
    justify="space-between"
    color={theme.grayColor}
    fontSize="xs"
    fontWeight="semibold"
  >
    <Text color={theme.blueColor} fontWeight="extrabold" fontFamily="Monaco">
      {props.id}
    </Text>
    <Text>{props.date || ""}</Text>
  </Flex>
);
