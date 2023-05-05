import { HStack } from "@chakra-ui/react";
import { FaDownload, FaRedo, FaTrashAlt } from "react-icons/fa";
import { ActionButton } from "../../components/ActionButton";

type ViewButtonsProps = {
  onRetry: () => void;
  onDelete: () => void;
  downloadName: string;
  downloadLink: string;
  downloadLoading: boolean;
};

export const ViewButtons = (props: ViewButtonsProps) => (
  <HStack spacing="2.5">
    <ActionButton
      leftIcon={<FaRedo />}
      colorScheme="orange"
      onClick={props.onRetry}
    >
      Retry Essay
    </ActionButton>

    <ActionButton
      leftIcon={<FaTrashAlt />}
      colorScheme="red"
      onClick={props.onDelete}
    >
      Delete Response
    </ActionButton>

    <ActionButton
      leftIcon={<FaDownload />}
      colorScheme="blue"
      isLoading={props.downloadLoading}
    >
      <a href={props.downloadLink} download={props.downloadName}>
        Download Response
      </a>
    </ActionButton>
  </HStack>
);
