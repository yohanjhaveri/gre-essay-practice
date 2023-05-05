import { useEffect } from "react";
import { Heading } from "@chakra-ui/react";
import { useCountdown } from "../hooks/useCountdown";
import { getCurrentTimestampSeconds } from "../utils/datetime";

type CountdownTimerProps = {
  endTime: number;
  onTimerEnd: () => void;
};

export const CountdownTimer = (props: CountdownTimerProps) => {
  const currentTime = getCurrentTimestampSeconds();
  const remainingSeconds = useCountdown(props.endTime - currentTime);

  useEffect(() => {
    if (remainingSeconds <= 0) {
      props.onTimerEnd();
    }
  }, [remainingSeconds, props]);

  const minutes = ("0" + Math.floor(remainingSeconds / 60)).slice(-2);
  const seconds = ("0" + (remainingSeconds % 60)).slice(-2);

  return (
    <Heading size="md" color="blue.500">
      {minutes}:{seconds}
    </Heading>
  );
};
