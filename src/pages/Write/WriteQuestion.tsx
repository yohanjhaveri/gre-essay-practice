import { Stack, Text } from "@chakra-ui/react";
import { theme } from "../../theme";

type WriteQuestionProps = {
  prompt: string;
  instructions: string;
};

export const WriteQuestion = (props: WriteQuestionProps) => (
  <Stack spacing="1">
    <Text fontWeight="semibold" whiteSpace="pre-wrap">
      {props.prompt}
    </Text>
    <Text color={theme.grayColor} marginBottom="8">
      {props.instructions}
    </Text>
  </Stack>
);
