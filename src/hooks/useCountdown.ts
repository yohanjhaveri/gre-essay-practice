import { useEffect, useState } from "react";

export const useCountdown = (initial: number) => {
  const [remaining, setRemaining] = useState(initial);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setRemaining((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, []);

  return remaining;
};
