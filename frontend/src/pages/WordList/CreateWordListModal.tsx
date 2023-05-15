import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  ModalFooter,
  ModalOverlay,
  ModalContent,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Divider,
  Input,
} from "@chakra-ui/react";
import { useState, useEffect, useRef, useCallback } from "react";

export default function CreateWordListModal({
  isOpen,
  onClose,
  onCreate,
}: {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (name: string, wordList: Word[]) => void;
}) {
  const [name, setName] = useState("");
  const [words, setWords] = useState<Word[]>([{ word: "", definition: "" }]);
  const lastInputRef = useRef<HTMLInputElement | null>(null);

  const addRow = useCallback(() => {
    setWords((w) => [...w, { word: "", definition: "" }]);
  }, []);
  function inputRow(index: number) {
    return (
      <Tr key={index}>
        <Td>
          <Input
            size="sm"
            type="text"
            value={words[index].word}
            placeholder="Word..."
            onChange={(e) =>
              setWords(
                words.map((w, i) => {
                  if (i === index) {
                    return { ...w, word: e.target.value };
                  }
                  return w;
                }),
              )
            }
          />
        </Td>
        <Td>
          <Input
            size="sm"
            type="text"
            value={words[index].definition}
            placeholder="Definition..."
            ref={index === words.length - 1 ? lastInputRef : undefined}
            onChange={(e) =>
              setWords(
                words.map((w, i) => {
                  if (i === index) {
                    return { ...w, definition: e.target.value };
                  }
                  return w;
                }),
              )
            }
          />
        </Td>
      </Tr>
    );
  }

  useEffect(() => {
    if (isOpen) {
      setName("");
      setWords([{ word: "", definition: "" }]);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (
        event.key === "Tab" &&
        document.activeElement === lastInputRef.current
      ) {
        addRow();
      }
    };
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [addRow]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxW="60%">
        <ModalCloseButton />
        <ModalHeader>Create Word List</ModalHeader>
        <ModalBody>
          <Input
            placeholder="List name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxW="50%"
          />
          <Divider my="5" />
          <Text>Words:</Text>
          <Table size="sm">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Definition</Th>
              </Tr>
            </Thead>

            <Tbody>{words.map((word, index) => inputRow(index))}</Tbody>
          </Table>
          <Button mt="4" onClick={() => addRow()}>
            Add word
          </Button>
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => onClose()} mr="5">
            Cancel
          </Button>
          <Button
            colorScheme="blue"
            onClick={() => {
              onCreate(name, words);
              onClose();
            }}
          >
            Create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
