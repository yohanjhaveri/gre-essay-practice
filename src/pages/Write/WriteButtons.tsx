import { Button, HStack } from "@chakra-ui/react";

type WriteButtonsProps = {
  onCancel: () => void;
  onSubmit: () => void;
};

export const WriteButtons = (props: WriteButtonsProps) => (
  <HStack width="full" justify="flex-end" spacing="2.5">
    <Button colorScheme="gray" onClick={props.onCancel}>
      Cancel
    </Button>
    <Button colorScheme="blue" onClick={props.onSubmit}>
      Submit
    </Button>
  </HStack>
);
