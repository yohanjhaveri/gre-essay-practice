import { Box, SimpleGrid } from "@chakra-ui/react";
import { CompletedEssayCard } from "../../components/CompletedEssayCard";
import { Essays } from "../../context/Context";

type HomeEssaysGridProps = {
  completedEssays: Essays;
  onClickView: (essayId: string) => void;
};

export const HomeEssaysGrid = (props: HomeEssaysGridProps) => (
  <SimpleGrid gap="5" columns={[1, 2]}>
    {props.completedEssays
      .sort((a, b) => (b.startTime || 0) - (a.startTime || 0))
      .map((essay) => (
        <Box
          key={essay.id}
          cursor="pointer"
          onClick={() => props.onClickView(essay.id)}
        >
          <CompletedEssayCard
            id={essay.id}
            prompt={essay.prompt}
            answer={essay.answer || ""}
            startTime={essay.startTime || 0}
          />
        </Box>
      ))}
  </SimpleGrid>
);
