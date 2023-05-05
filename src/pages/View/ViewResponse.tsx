import { Text } from "@chakra-ui/react";
import { theme } from "../../theme";

type ViewResponseProps = {
  answer: string;
};

export const ViewResponse = (props: ViewResponseProps) => (
  <Text
    padding={{ base: "8", md: "12" }}
    marginBottom="8"
    borderRadius="md"
    background={theme.bgColor}
    whiteSpace="pre-wrap"
  >
    {props.answer || <em>No response</em>}
  </Text>
);
