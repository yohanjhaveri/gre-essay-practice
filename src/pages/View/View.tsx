import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const selectedEssay = context.essays.find(
    (essay) => essay.id === context.select
  ) as Required<Essay> | undefined;

  useEffect(() => {
    if (!context.select) {
      navigate("/");
    }

    if (context.active?.id) {
      navigate("/write");
    }
  }, [context]);

  const onRetry = () => {
    if (context.select) {
      context.redoEssay(context.select);
      navigate("/write");
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
      <ViewBack />
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
