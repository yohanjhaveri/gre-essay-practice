import { HStack } from "@chakra-ui/react";
import { ActionButton } from "../../components/ActionButton";

type HomeButtonsProps = {
  onClickWrite: (type: "issue" | "argument") => void;
};

export const HomeButtons = (props: HomeButtonsProps) => (
  <HStack spacing="2.5">
    <ActionButton
      colorScheme="blue"
      onClick={() => props.onClickWrite("issue")}
    >
      Attempt Issue Essay
    </ActionButton>
    <ActionButton
      colorScheme="blue"
      onClick={() => props.onClickWrite("argument")}
    >
      Attempt Argument Essay
    </ActionButton>
  </HStack>
);
