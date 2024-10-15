import { Text } from "@chakra-ui/react";

type ViewAnswerProps = {
  answer: string;
};

export const ViewAnswer = (props: ViewAnswerProps) => (
  <Text fontSize="16px" fontWeight="400">
    {props.answer || <em>No response</em>}
  </Text>
);
