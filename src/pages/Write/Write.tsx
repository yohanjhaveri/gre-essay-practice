import { Stack } from "@chakra-ui/react";

import { WriteHeader } from "./WriteHeader";
import { WriteQuestion } from "./WriteQuestion";
import { WriteButtons } from "./WriteButtons";
import { WriteResponse } from "./WriteResponse";

import { PageProps } from "../../components/PageWrapper";
import { ReqEssay } from "../../context/Context";

export const Write = ({ context }: PageProps) => {
  const activeEssay = context.active as ReqEssay;

  const onChange = (value: string) => {
    context.updateEssay(value);
  };

  const onCancel = () => {
    context.cancelEssay();
  };

  const onSubmit = () => {
    context.submitEssay();
  };

  const SECONDS_IN_30_MINUTES = 30 * 60;

  return activeEssay ? (
    <Stack spacing="8">
      <WriteHeader
        endTime={
          activeEssay.startTime && activeEssay.startTime + SECONDS_IN_30_MINUTES
        }
        onSubmit={onSubmit}
      />
      <Stack spacing="8">
        <WriteQuestion
          prompt={activeEssay.prompt}
          instructions={activeEssay.instructions}
        />
        <Stack spacing="4">
          <WriteResponse answer={activeEssay.answer} onChange={onChange} />
          <WriteButtons onCancel={onCancel} onSubmit={onSubmit} />
        </Stack>
      </Stack>
    </Stack>
  ) : null;
};
