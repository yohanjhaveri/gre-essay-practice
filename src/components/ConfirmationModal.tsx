import {
  Button,
  ButtonProps,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

type ConfirmationModalProps = {
  title: string;
  children: React.ReactNode;
  colorScheme: ButtonProps["colorScheme"];
  buttonText: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export const ConfirmationModal = (props: ConfirmationModalProps) => (
  <Modal isOpen={props.isOpen} onClose={props.onClose}>
    <ModalOverlay />

    <ModalContent>
      <ModalHeader color={`${props.colorScheme}.400`}>
        {props.title}
      </ModalHeader>

      <ModalBody>{props.children}</ModalBody>

      <ModalFooter>
        <Button variant="ghost" mr="3" onClick={props.onClose}>
          Cancel
        </Button>
        <Button colorScheme={props.colorScheme} onClick={props.onConfirm}>
          {props.buttonText}
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
);
