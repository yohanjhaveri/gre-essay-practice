import { usePDF } from "@react-pdf/renderer";
import { Stack } from "@chakra-ui/react";

import { PDFDocument } from "../../components/PDFDocument";

import { ViewBack } from "./ViewBack";
import { ViewButtons } from "./ViewButtons";
import { ViewQuestion } from "./ViewQuestion";
import { ViewResponse } from "./ViewResponse";

import { PageProps } from "../../components/PageWrapper";
import { ReqEssay } from "../../context/Context";

export const View = ({ context }: PageProps) => {
  const selectedEssay = context.select as ReqEssay;

  const onBack = () => {
    if (context.select) {
      context.unselectEssay();
    }
  };

  const onRetry = () => {
    context.redoEssay();
  };

  const onDelete = () => {
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
      <ViewBack onBack={onBack} />
      <ViewQuestion
        prompt={selectedEssay.prompt}
        instructions={selectedEssay.instructions}
      />
      <Stack spacing="4">
        <ViewButtons
          onRetry={onRetry}
          onDelete={onDelete}
          downloadName={`essay-response-${selectedEssay.id}.pdf`}
          downloadLink={instance.url || ""}
          downloadLoading={instance.loading}
        />
        <ViewResponse answer={selectedEssay.answer} />
      </Stack>
    </Stack>
  ) : null;
};
