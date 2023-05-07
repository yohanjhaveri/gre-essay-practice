import { useEffect, useState } from "react";

export const useStatePersist = <T>(
  initial: T,
  key: string
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [state, setState] = useState(initial);

  useEffect(() => {
    const json = localStorage.getItem(key);

    if (json) {
      const data = JSON.parse(json) as T;
      setState(data);
    }
  }, [key]);

  useEffect(() => {
    if (state) {
      const json = JSON.stringify(state);
      localStorage.setItem(key, json);
    }
  }, [key, state]);

  return [state, setState];
};
