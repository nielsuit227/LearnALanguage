import {
  Button,
  Box,
  Flex,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  ModalFooter,
  ModalOverlay,
  ModalContent,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

export default function StartPracticeModal({
  isOpen,
  onClose,
  wordList,
}: {
  isOpen: boolean;
  onClose: () => void;
  wordList?: WordList;
}) {
  const [reverse, setReverse] = useState(false);
  const navigate = useNavigate();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader>Start a test</ModalHeader>
        <ModalBody textAlign="center">
          <Text mb={4}>Select which direction you want to test:</Text>
          <Flex flexDir="row" justify="center" w="100%">
            <Box flex="1">
              {reverse ? wordList?.language : wordList?.translation}
            </Box>
            <Box flex="0">
              <IconButton
                mx={5}
                aria-label="switch"
                onClick={() => setReverse(!reverse)}
                icon={<HiOutlineSwitchHorizontal />}
                size="sm"
              />
            </Box>
            <Box flex="1">
              {reverse ? wordList?.translation : wordList?.language}
            </Box>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={() =>
              navigate(`practice?id=${wordList?.id}&reverse=${reverse}`)
            }
          >
            Start!
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
