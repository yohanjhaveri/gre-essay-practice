import { HStack, Stack, Text } from "@chakra-ui/react";
import { timestampToDate } from "../utils/datetime";
import { formatId } from "../utils/format";
import { theme } from "../theme";

type CompletedEssayCardProps = {
  id: string;
  prompt: string;
  answer: string;
  startTime: number;
};

export const CompletedEssayCard = (props: CompletedEssayCardProps) => {
  const formattedId = formatId(props.id);
  const date = timestampToDate(props.startTime);

  return (
    <Stack
      spacing="1.5"
      background={theme.bgColor}
      padding="5"
      borderRadius="md"
      height="full"
      minHeight="52"
    >
      <HStack fontSize="sm" justify="space-between">
        <Text
          color={theme.blueColor}
          fontWeight="extrabold"
          fontFamily="Monaco"
        >
          {formattedId}
        </Text>
        <Text color={theme.grayColor} fontWeight="semibold">
          {date}
        </Text>
      </HStack>
      <Text fontWeight="bold" noOfLines={2}>
        {props.prompt}
      </Text>
      <Text color={theme.grayColor} noOfLines={4}>
        {props.answer || <em>No response</em>}
      </Text>
    </Stack>
  );
};
