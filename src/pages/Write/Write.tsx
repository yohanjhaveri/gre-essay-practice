import { Stack } from "@chakra-ui/react";
import { getCurrentTimeInSecondsUNIX } from "../../utils/datetime";

import { WriteHeader } from "./WriteHeader";
import { WriteQuestion } from "./WriteQuestion";
import { WriteButtons } from "./WriteButtons";
import { WriteResponse } from "./WriteResponse";

import { PageProps } from "../../components/PageWrapper";

export const Write = ({ context }: PageProps) => {
  const activeEssay = context.essays.find(
    (essay) => essay.id === context.active?.id
  );

  const onChange = (value: string) => {
    context.updateEssay(value);
  };

  const onCancel = () => {
    context.cancelEssay();
  };

  const onSubmit = () => {
    context.submitEssay(getCurrentTimeInSecondsUNIX());
  };

  const SECONDS_IN_30_MINUTES = 30 * 60;

  return context.active && activeEssay ? (
    <Stack spacing="8">
      <WriteHeader
        endTime={
          context.active.startTime &&
          context.active.startTime + SECONDS_IN_30_MINUTES
        }
        onSubmit={onSubmit}
      />
      <Stack spacing="8">
        <WriteQuestion
          prompt={activeEssay.prompt}
          instructions={activeEssay.instructions}
        />
        <Stack spacing="4">
          <WriteResponse answer={context.active.answer} onChange={onChange} />
          <WriteButtons onCancel={onCancel} onSubmit={onSubmit} />
        </Stack>
      </Stack>
    </Stack>
  ) : null;
};
