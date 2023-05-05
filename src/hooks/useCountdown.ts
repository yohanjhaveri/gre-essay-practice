import { useEffect, useState } from "react";

export const useCountdown = (initialSeconds: number) => {
  const [remainingSeconds, setRemainingSeconds] = useState(initialSeconds);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setRemainingSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, []);

  return remainingSeconds;
};
