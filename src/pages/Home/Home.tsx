import { useState } from "react";
import { Stack } from "@chakra-ui/react";

import { Footnote } from "../../components/Footnote";

import { HomeHeading } from "./HomeHeading";
import { HomeButtons } from "./HomeButtons";
import { HomeEssaysGrid } from "./HomeEssaysGrid";
import { HomeEssaysNone } from "./HomeEssaysNone";

import { PageProps } from "../../components/PageWrapper";
import { EssayType } from "../../context/Context";
import {
  HomeSelectEssayPrompt,
  HomeSelectEssayPromptProps,
} from "./HomeSelectEssayPrompt";

export const Home = ({ context }: PageProps) => {
  const [drawer, setDrawer] = useState<HomeSelectEssayPromptProps | null>(null);

  const completedEssays = context.essays.filter((essay) => essay.submitTime);
  const remainingEssays = context.essays.filter((essay) => !essay.submitTime);

  const onClose = () => {
    setDrawer(null);
  };

  const onClickWrite = (type: EssayType) => {
    setDrawer({
      type,
      essays: remainingEssays.filter((essay) => essay.type === type),
      onClose,
      onSelect,
    });
  };

  const onSelect = (type: EssayType, essayId: string) => {
    context.startEssay(essayId);
  };

  const onClickView = (essayId: string) => {
    context.selectEssay(essayId);
  };

  return (
    <Stack minHeight="full" justify="space-between" spacing="6">
      {drawer && <HomeSelectEssayPrompt {...drawer} />}
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
