import { Flex, Text } from "@chakra-ui/react";
import { useTheme } from "../hooks/useTheme";
import { timestampToDate } from "../utils/datetime";
import { padIdLeft } from "../utils/format";
import { EmptyResponse } from "./EmptyResponse";

export type CompletedEssayProps = {
  id: string;
  prompt: string;
  answer: string;
  startTime: number;
};

export const CompletedEssay = ({
  id,
  prompt,
  answer,
  startTime,
}: CompletedEssayProps) => {
  const { bgColor, grayColor, blueColor } = useTheme();

  return (
    <Flex
      gap="5px"
      background={bgColor}
      padding="20px"
      borderRadius="5px"
      height="100%"
      minHeight="212px"
      flexDirection="column"
      alignItems="flex-start"
    >
      <Flex
        width="100%"
        justifyContent="space-between"
        color={grayColor}
        fontSize="12px"
        fontWeight="600"
      >
        <Text color={blueColor} fontWeight="800" fontFamily="Monaco">
          {padIdLeft(id)}
        </Text>
        <Text>{timestampToDate(startTime)}</Text>
      </Flex>
      <Text fontWeight="bold" noOfLines={2}>
        {prompt}
      </Text>
      <Text color={grayColor} noOfLines={4}>
        {answer || <EmptyResponse />}
      </Text>
    </Flex>
  );
};
