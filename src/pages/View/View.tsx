import { usePDF } from "@react-pdf/renderer";
import { Stack } from "@chakra-ui/react";

import { ViewButtons } from "./ViewButtons";
import { ViewQuestion } from "./ViewQuestion";
import { ViewResponse } from "./ViewResponse";

import { Essay } from "../../context/Context";
import { PageProps } from "../../components/PageWrapper";
import { ViewBack } from "./ViewBack";
import { PDFDocument } from "../../components/PDFDocument";

export const View = ({ context }: PageProps) => {
  const selectedEssay = context.essays.find(
    (essay) => essay.id === context.select
  ) as Required<Essay> | undefined;

  const onBack = () => {
    if (context.select) {
      context.unselectEssay();
    }
  };

  const onRetry = () => {
    if (context.select) {
      context.redoEssay(context.select);
    }
  };

  const onDelete = () => {
    if (context.select) {
      context.deleteEssay(context.select);
    }
  };

  const [instance] = usePDF({
    document: (
      <PDFDocument
        prompt={selectedEssay?.prompt || ""}
        instructions={selectedEssay?.instructions || ""}
        answer={selectedEssay?.answer || ""}
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
          downloadName={`essay-response-${context.select}.pdf`}
          downloadLink={instance.url || ""}
          downloadLoading={instance.loading}
        />
        <ViewResponse answer={selectedEssay.answer} />
      </Stack>
    </Stack>
  ) : null;
};
