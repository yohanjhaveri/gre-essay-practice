import { Box, Text } from "@chakra-ui/react";

type ViewGradingProps = {
  score: string;
  feedback: string;
};

const colorByGrade = {
  NS: "gray",
  "0": "red",
  "1": "red",
  "2": "red",
  "3": "orange",
  "4": "yellow",
  "5": "green",
  "6": "green",
};

export const ViewGrading = (props: ViewGradingProps) => {
  const score = props.score as keyof typeof colorByGrade;
  const color = `${colorByGrade[score]}.400`;

  return (
    <Box
      padding="4"
      marginBottom="4"
      borderWidth="1px"
      borderColor={color}
      borderRadius="md"
    >
      <Text color={color} fontWeight="extrabold" marginBottom="1">
        <strong>Score:</strong> {props.score}
      </Text>
      <Text color={color}>{props.feedback}</Text>
    </Box>
  );
};
