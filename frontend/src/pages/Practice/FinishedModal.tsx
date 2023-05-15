import { Title } from "@tremor/react";
import {
  Text,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalOverlay,
  ModalContent,
  ModalFooter,
} from "@chakra-ui/react";
import { NavigateFunction } from "react-router-dom";

export default function FinishedModal({
  isOpen,
  correct,
  wrong,
  navigate,
}: {
  isOpen: boolean;
  correct: number;
  wrong: number;
  navigate: NavigateFunction;
}) {
  return (
    <Modal isOpen={isOpen} onClose={() => {}}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody p={5}>
          <Title>Congratulations!</Title>
          <Text my={2}>You have finished the game!</Text>
          <Text>
            You had {correct} / {correct + wrong} words correct!
          </Text>
          <ModalFooter mt={10}>
            <Button mr={10} onClick={() => navigate("/")}>
              See lists
            </Button>
            <Button colorScheme="blue" onClick={() => window.location.reload()}>
              Try again
            </Button>
          </ModalFooter>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
