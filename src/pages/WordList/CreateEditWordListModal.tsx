import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  ModalFooter,
  ModalOverlay,
  ModalContent,
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Divider,
  Input,
  IconButton,
} from "@chakra-ui/react";
import { useState, useEffect, useRef, useCallback } from "react";
import { ImCross } from "react-icons/im";

export default function CreateEditWordListModal({
  isOpen,
  onClose,
  onCreate,
  editWordList,
}: {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (
    name: string,
    wordList: Word[],
    language: string,
    translation: string,
  ) => void;
  editWordList?: WordList;
}) {
  const [name, setName] = useState("");
  const [words, setWords] = useState<Word[]>([{ word: "", definition: "" }]);
  const [language, setLanguage] = useState("");
  const [translation, setTranslation] = useState("");
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
        <Td>
          <IconButton
            aria-label="Delete"
            size="sm"
            icon={<ImCross />}
            onClick={() => {
              setWords(words.filter((w, i) => i !== index));
            }}
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
    if (editWordList !== undefined) {
      setName(editWordList.name);
      setWords(editWordList.words);
      setLanguage(editWordList.language);
      setTranslation(editWordList.translation);
    } else {
      setName("");
      setWords([{ word: "", definition: "" }]);
      setLanguage("");
      setTranslation("");
    }
  }, [editWordList]);

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

          {/* Languages */}
          <Text>Languages</Text>

          <Flex flexDir="row" mt={2}>
            <Input
              mx={5}
              placeholder="Language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              maxW="50%"
            />
            <Input
              mx={5}
              placeholder="Translation"
              value={translation}
              onChange={(e) => setTranslation(e.target.value)}
              maxW="50%"
            />
          </Flex>

          <Divider my="5" />

          {/* Words */}
          <Text>Words:</Text>
          <Table size="sm" maxH="50vh">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Definition</Th>
                <Th />
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
              onCreate(name, words, language, translation);
              onClose();
            }}
          >
            {editWordList === undefined ? "Create" : "Save"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
