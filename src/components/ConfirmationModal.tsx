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

export type ConfirmationModalProps = {
  title: string;
  children: React.ReactNode;
  colorScheme: ButtonProps["colorScheme"];
  buttonText: string;
  onClose: () => void;
  onConfirm: () => void;
};

export const ConfirmationModal = (props: ConfirmationModalProps) => (
  <Modal isOpen onClose={props.onClose}>
    <ModalOverlay />

    <ModalContent>
      <ModalHeader color={`${props.colorScheme}.200`} pb="0">
        {props.title}
      </ModalHeader>

      <ModalBody>{props.children}</ModalBody>

      <ModalFooter>
        <Button variant="solid" mr="3" onClick={props.onClose}>
          Close
        </Button>
        <Button colorScheme={props.colorScheme} onClick={props.onConfirm}>
          {props.buttonText}
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
);
