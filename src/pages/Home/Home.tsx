import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Stack } from "@chakra-ui/react";

import { Footnote } from "../../components/Footnote";

import { HomeButtons } from "./HomeButtons";
import { HomeHeading } from "./HomeHeading";
import { HomeEssaysGrid } from "./HomeEssaysGrid";
import { HomeEssaysNone } from "./HomeEssaysNone";

import { PageProps } from "../../components/PageWrapper";

export const Home = ({ context }: PageProps) => {
  const navigate = useNavigate();

  const completedEssays = context.essays.filter((essay) => essay.submitTime);
  const remainingEssays = context.essays.filter((essay) => !essay.submitTime);

  useEffect(() => {
    if (context.select) {
      context.unselectEssay();
    }

    if (context.active?.id) {
      navigate("/write");
    }
  }, [context]);

  const onClickWrite = (type: "issue" | "argument") => {
    const essayByType = remainingEssays.filter((essay) => essay.type === type);

    const randomIndex = Math.floor(Math.random() * essayByType.length);
    const randomEssay = essayByType[randomIndex];

    context.startEssay(randomEssay.id);
    navigate("/write");
  };

  const onClickView = (essayId: string) => {
    context.selectEssay(essayId);
    navigate("/view");
  };

  return (
    <Stack minHeight="full" justify="space-between" spacing="6">
      <Stack spacing="8">
        <HomeHeading />
        <Stack width="full" spacing="5">
          <HomeButtons onClickWrite={onClickWrite} />
          {completedEssays.length ? (
            <HomeEssaysGrid
              completedEssays={completedEssays}
              onClickView={onClickView}
            />
          ) : (
            <HomeEssaysNone />
          )}
        </Stack>
      </Stack>
      <Footnote />
    </Stack>
  );
};
