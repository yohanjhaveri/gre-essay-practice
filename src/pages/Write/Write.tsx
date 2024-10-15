import { Stack } from "@chakra-ui/react";

import { WriteHeader } from "./WriteHeader";
import { WriteQuestion } from "./WriteQuestion";
import { WriteButtons } from "./WriteButtons";
import { WriteResponse } from "./WriteResponse";

import { PageProps } from "../../components/PageWrapper";
import { ReqEssay } from "../../context/Context";
import {
  ConfirmationModal,
  ConfirmationModalProps,
} from "../../components/ConfirmationModal";
import { useState } from "react";

export const Write = ({ context }: PageProps) => {
  const activeEssay = context.active as ReqEssay;

  const [modal, setModal] = useState<ConfirmationModalProps | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const onClose = () => {
    setModal(null);
  };

  const onCancelClick = () => {
    setModal({
      title: "Cancel Response",
      children: "Are you sure you want to cancel your response attempt?",
      colorScheme: "red",
      buttonText: "Confirm Cancel",
      onClose,
      onConfirm: onCancelConfirm,
    });
  };

  const onSubmitClick = () => {
    setModal({
      title: "Submit Response",
      children: "Are you sure you want to submit your response attempt?",
      colorScheme: "blue",
      buttonText: "Confirm Submit",
      onClose,
      onConfirm: onSubmitConfirm,
    });
  };

  const onChange = (value: string) => {
    context.updateEssay(value);
  };

  const onCancelConfirm = () => {
    context.cancelEssay();
  };

  const onSubmitConfirm = async () => {
    setIsLoading(true);

    try {
      await context.submitEssay();
    } catch (e) {
      console.error("API ERROR!!!", e);
    } finally {
      setIsLoading(false);
    }
  };

  const SECONDS_IN_30_MINUTES = 30 * 60;

  return activeEssay ? (
    <Stack spacing="8">
      {modal && <ConfirmationModal {...modal} isLoading={isLoading} />}
      <WriteHeader
        endTime={
          activeEssay.startTime && activeEssay.startTime + SECONDS_IN_30_MINUTES
        }
        onSubmit={onSubmitClick}
      />
      <Stack spacing="8">
        <WriteQuestion
          prompt={activeEssay.prompt}
          instructions={activeEssay.instructions}
        />
        <Stack spacing="4">
          <WriteResponse answer={activeEssay.answer} onChange={onChange} />
          <WriteButtons onCancel={onCancelClick} onSubmit={onSubmitClick} />
        </Stack>
      </Stack>
    </Stack>
  ) : null;
};
