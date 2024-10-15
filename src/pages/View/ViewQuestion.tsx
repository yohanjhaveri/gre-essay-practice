import { Stack, Text } from "@chakra-ui/react";
import { theme } from "../../theme";

type ViewQuestionProps = {
  prompt: string;
  instructions: string;
};

export const ViewQuestion = (props: ViewQuestionProps) => (
  <Stack spacing="1.5">
    <Text fontWeight="semibold" whiteSpace="pre-wrap">
      {props.prompt}
    </Text>
    <Text color={theme.grayColor}>{props.instructions}</Text>
  </Stack>
);
