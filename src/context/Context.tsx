import { createContext, useState } from "react";
import { useStatePersist } from "../hooks/useStatePersist";

import data from "../data.json";
import { getCurrentTimeInSecondsUNIX } from "../utils/datetime";

export type Essay = {
  id: string;
  type: "issue" | "argument";
  prompt: string;
  answer?: string;
  startTime?: number;
  submitTime?: number;
  instructions: string;
};

export type Essays = Essay[];

export type Active = {
  id: string;
  answer: string;
  startTime: number;
};

export type ContextValue = {
  essays: Essays;
  active: Active | null;
  select: string | null;
  selectEssay: (essayId: string) => void;
  unselectEssay: () => void;
  startEssay: (essayId: string) => void;
  updateEssay: (answer: string) => void;
  cancelEssay: () => void;
  submitEssay: (submitTime: number) => void;
  deleteEssay: (essayId: string) => void;
  redoEssay: (essayId: string) => void;
};

export const Context = createContext<ContextValue | null>(null);

export type ProviderProps = {
  children: React.ReactNode;
};

export const Provider = ({ children }: ProviderProps) => {
  const [essays, setEssays] = useStatePersist(data as Essays, "essays");
  const [active, setActive] = useStatePersist<Active | null>(null, "active");
  const [select, setSelect] = useState<string | null>(null);

  const selectEssay = (essayId: string) => {
    if (!active) {
      setSelect(essayId);
    }
  };

  const unselectEssay = () => {
    setSelect(null);
  };

  const startEssay = (essayId: string) => {
    // only start essay if not already active
    setActive(
      (prev) =>
        prev || {
          id: essayId,
          answer: "",
          startTime: getCurrentTimeInSecondsUNIX(),
        }
    );
  };

  const updateEssay = (answer: string) => {
    // only update essay if already active
    if (active) {
      setActive(
        (prev) =>
          prev && {
            answer,
            id: prev.id,
            startTime: prev.startTime,
          }
      );
    }
  };

  const cancelEssay = () => {
    // only cancel essay if already active
    setActive((prev) => prev && null);
  };

  const submitEssay = (submitTime: number) => {
    // only submit essay if already active
    if (active) {
      setEssays((prev) =>
        prev.map((essay) =>
          essay.id === active.id
            ? {
                ...essay,
                answer: active.answer,
                startTime: active.startTime,
                submitTime,
              }
            : essay
        )
      );

      setSelect(active.id);
      setActive(null);
    }
  };

  const deleteEssay = (essayId: string) => {
    setSelect(null);

    setEssays((prev) =>
      prev.map((essay) =>
        essay.id === essayId
          ? {
              id: essay.id,
              type: essay.type,
              prompt: essay.prompt,
              instructions: essay.instructions,
            }
          : essay
      )
    );
  };

  const redoEssay = (essayId: string) => {
    deleteEssay(essayId);
    startEssay(essayId);
  };

  return (
    <Context.Provider
      value={{
        essays,
        active,
        select,
        selectEssay,
        unselectEssay,
        startEssay,
        updateEssay,
        cancelEssay,
        submitEssay,
        deleteEssay,
        redoEssay,
      }}
    >
      {children}
    </Context.Provider>
  );
};
