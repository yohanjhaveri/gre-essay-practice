import { createContext } from "react";
import { useStatePersist } from "../hooks/useStatePersist";

import data from "../data.json";
import { getCurrentTimestampSeconds } from "../utils/datetime";
import { essayFeedbackAndScore } from "../utils/score";

export type EssayType = "issue" | "argument";

export type Essay = {
  id: string;
  type: EssayType;
  prompt: string;
  answer?: string;
  startTime?: number;
  submitTime?: number;
  score?: string;
  feedback?: string;
  instructions: string;
};

export type Essays = Essay[];

export type ReqEssay = Required<Essay>;

export type ContextValue = {
  essays: Essays;
  active: ReqEssay | null;
  select: ReqEssay | null;
  selectEssay: (essayId: string) => void;
  unselectEssay: () => void;
  startEssay: (essayId: string) => void;
  updateEssay: (answer: string) => void;
  cancelEssay: () => void;
  submitEssay: () => Promise<void>;
  deleteEssay: () => void;
  redoEssay: () => void;
};

export const Context = createContext<ContextValue | null>(null);

export type ProviderProps = {
  children: React.ReactNode;
};

export const Provider = ({ children }: ProviderProps) => {
  const [essays, setEssays] = useStatePersist(data as Essays, "essays");
  const [active, setActive] = useStatePersist<ReqEssay | null>(null, "active");
  const [select, setSelect] = useStatePersist<ReqEssay | null>(null, "select");

  const selectEssay = (essayId: string) => {
    const essay = essays.find((e) => e.id === essayId);

    if (!essay || active) {
      return;
    }

    setSelect(essay as ReqEssay);
  };

  const unselectEssay = () => {
    setSelect(null);
  };

  const startEssay = (essayId: string) => {
    const essay = essays.find((e) => e.id === essayId);

    if (!essay || active) {
      return;
    }

    setActive(
      (prev) =>
        prev || {
          id: essay.id,
          type: essay.type,
          prompt: essay.prompt,
          answer: "",
          startTime: getCurrentTimestampSeconds(),
          submitTime: -1,
          score: "",
          feedback: "",
          instructions: essay.instructions,
        }
    );
  };

  const updateEssay = (answer: string) => {
    if (!active) {
      return;
    }

    setActive(
      (prev) =>
        prev && {
          id: prev.id,
          type: prev.type,
          prompt: prev.prompt,
          answer,
          startTime: prev.startTime,
          submitTime: prev.submitTime,
          score: "",
          feedback: "",
          instructions: prev.instructions,
        }
    );
  };

  const cancelEssay = () => {
    if (!active) {
      return;
    }

    setActive(null);
  };

  const submitEssay = async () => {
    if (!active) {
      return;
    }

    const response = await essayFeedbackAndScore(
      active.type,
      active.prompt,
      active.answer
    );

    const data = response.content;

    const [score, feedback] = data.split("\n").map((s: string) => s.trim());

    const completed = {
      ...active,
      submitTime: getCurrentTimestampSeconds(),
      score,
      feedback,
    };

    setEssays((prev) => prev.map((e) => (e.id === active.id ? completed : e)));
    setSelect(completed);
    setActive(null);
  };

  const deleteEssay = () => {
    if (!select) {
      return;
    }

    setSelect(null);
    setEssays((prev) =>
      prev.map((essay) =>
        essay.id === select.id
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

  const redoEssay = () => {
    deleteEssay();

    if (select) {
      startEssay(select.id);
    }
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
