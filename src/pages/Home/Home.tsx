import { Stack } from "@chakra-ui/react";

import { Footnote } from "../../components/Footnote";

import { HomeButtons } from "./HomeButtons";
import { HomeHeading } from "./HomeHeading";
import { HomeEssaysGrid } from "./HomeEssaysGrid";
import { HomeEssaysNone } from "./HomeEssaysNone";

import { PageProps } from "../../components/PageWrapper";
import { EssayType } from "../../context/Context";

export const Home = ({ context }: PageProps) => {
  const completedEssays = context.essays.filter((essay) => essay.submitTime);
  const remainingEssays = context.essays.filter((essay) => !essay.submitTime);

  const onClickWrite = (type: EssayType) => {
    const essayByType = remainingEssays.filter((essay) => essay.type === type);

    const randomIndex = Math.floor(Math.random() * essayByType.length);
    const randomEssay = essayByType[randomIndex];

    context.startEssay(randomEssay.id);
  };

  const onClickView = (essayId: string) => {
    context.selectEssay(essayId);
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
