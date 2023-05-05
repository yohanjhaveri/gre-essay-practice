import { HStack } from "@chakra-ui/react";
import { ActionButton } from "../../components/ActionButton";
import { EssayType } from "../../context/Context";

type HomeButtonsProps = {
  onClickWrite: (type: EssayType) => void;
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
