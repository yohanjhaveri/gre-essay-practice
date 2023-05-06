import { usePDF } from "@react-pdf/renderer";
import { Stack, Text } from "@chakra-ui/react";

import { PDFDocument } from "../../components/PDFDocument";

import { ViewBack } from "./ViewBack";
import { ViewButtons } from "./ViewButtons";
import { ViewQuestion } from "./ViewQuestion";
import { ViewResponse } from "./ViewResponse";

import { PageProps } from "../../components/PageWrapper";
import { ReqEssay } from "../../context/Context";
import {
  ConfirmationModal,
  ConfirmationModalProps,
} from "../../components/ConfirmationModal";
import { useState } from "react";
import { timestampToDate } from "../../utils/datetime";

export const View = ({ context }: PageProps) => {
  const selectedEssay = context.select as ReqEssay;

  const [modal, setModal] = useState<ConfirmationModalProps | null>(null);

  const onClose = () => {
    setModal(null);
  };

  const onRetryClick = () => {
    setModal({
      title: "Retry Response",
      children: "Are you sure you want to retry your response attempt?",
      colorScheme: "orange",
      buttonText: "Confirm Retry",
      onClose,
      onConfirm: onRetryConfirm,
    });
  };

  const onDeleteClick = () => {
    setModal({
      title: "Delete Response",
      children: "Are you sure you want to delete your response attempt?",
      colorScheme: "red",
      buttonText: "Confirm Delete",
      onClose,
      onConfirm: onDeleteConfirm,
    });
  };

  const onBack = () => {
    if (context.select) {
      context.unselectEssay();
    }
  };

  const onRetryConfirm = () => {
    context.redoEssay();
  };

  const onDeleteConfirm = () => {
    context.deleteEssay();
  };

  const [instance] = usePDF({
    document: (
      <PDFDocument
        prompt={selectedEssay.prompt}
        instructions={selectedEssay.instructions}
        answer={selectedEssay.answer}
      />
    ),
  });

  return selectedEssay ? (
    <Stack spacing="8">
      {modal && <ConfirmationModal {...modal} />}
      <ViewBack onBack={onBack} />
      <ViewQuestion
        prompt={selectedEssay.prompt}
        instructions={selectedEssay.instructions}
      />
      <Stack spacing="3">
        <Stack
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align={{ base: "flex-start", md: "flex-end" }}
          color="gray.400"
          fontStyle="italic"
        >
          <ViewButtons
            onRetry={onRetryClick}
            onDelete={onDeleteClick}
            downloadName={`essay-response-${selectedEssay.id}.pdf`}
            downloadLink={instance.url || ""}
            downloadLoading={instance.loading}
          />
          <Text>Submitted on {timestampToDate(selectedEssay.startTime)}</Text>
        </Stack>
        <ViewResponse answer={selectedEssay.answer} />
      </Stack>
    </Stack>
  ) : null;
};
