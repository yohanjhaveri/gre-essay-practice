import { Stack, Heading } from "@chakra-ui/react";
import { CountdownTimer } from "../../components/CountdownTimer";

type WriteHeaderProps = {
  endTime: number;
  onSubmit: () => void;
};

export const WriteHeader = (props: WriteHeaderProps) => (
  <Stack spacing="1">
    <Heading size="md">Time Remaining</Heading>
    <CountdownTimer endTime={props.endTime} onTimerEnd={props.onSubmit} />
  </Stack>
);
