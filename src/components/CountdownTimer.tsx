import { useEffect } from "react";
import { Heading } from "@chakra-ui/react";
import { useCountdown } from "../hooks/useCountdown";
import { getCurrentTimeInSecondsUNIX } from "../utils/datetime";

type CountdownTimerProps = {
  endTime: number;
  onTimerEnd: () => void;
};

export const CountdownTimer = ({
  endTime,
  onTimerEnd,
}: CountdownTimerProps) => {
  const currentTime = getCurrentTimeInSecondsUNIX();
  const remaining = useCountdown(endTime - currentTime);

  useEffect(() => {
    if (remaining <= 0) {
      onTimerEnd();
    }
  }, [remaining, onTimerEnd]);

  const remainingMinutes = ("0" + Math.floor(remaining / 60)).slice(-2);
  const remainingSeconds = ("0" + (remaining % 60)).slice(-2);

  return (
    <Heading size="md" color="blue.500">
      {remainingMinutes}:{remainingSeconds}
    </Heading>
  );
};
