import { Card, Title } from "@tremor/react";
import {
  Flex,
  Text,
  Divider,
  Input,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FinishedModal from "./FinishedModal";

function shuffle(array: Word[]) {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    // eslint-disable-next-line no-param-reassign
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export default function Practice() {
  const [wordList, setWordList] = useState<WordList>();
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [progress, setProgress] = useState(0);
  const [input, setInput] = useState("");
  const [finishedOpen, setFinishedOpen] = useState(false);
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    axios
      .get(`wordlist/${queryParams.get("id")}`)
      .then((response) => {
        setWordList({ ...response.data, words: shuffle(response.data.words) });
      })
      .catch(() => {});
  }, []);

  const submit = useCallback(() => {
    if (wordList === undefined) {
      return;
    }
    if (input === wordList.words[progress].definition) {
      setCorrect((c) => c + 1);
      toast.success("Jeej, that's correct!");
      if (progress + 1 === wordList.words.length) {
        setFinishedOpen(true);
        return;
      }
    } else if (formError.length > 0) {
      setWordList({
        ...wordList,
        words: [...wordList.words, wordList.words[progress]],
      });
    } else {
      setWrong((w) => w + 1);
      setFormError(
        `Sorry, that's incorrect. It should be: ${wordList.words[progress].definition}`,
      );
    }
    setProgress((p) => p + 1);
    setInput("");
  }, [input, progress, wordList, formError]);
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        submit();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [submit]);

  return (
    <Flex
      className="w-full h-screen p-10 bg-gradient-to-r from-cyan-500 to-blue-500"
      justifyContent="center"
      alignItems="start"
    >
      <FinishedModal
        isOpen={finishedOpen}
        correct={correct}
        wrong={wrong}
        navigate={navigate}
      />
      <Card className="w-2/3">
        <Flex flexDir="row">
          <Button mx={2} size="sm" onClick={() => navigate("/")}>
            Back
          </Button>
          <Title>Practicing: {wordList?.name}</Title>
        </Flex>
        <Divider my="5" />
        <Flex flexDir="row">
          <Text mr={10}>
            Progress: {progress} / {wordList?.words.length}
          </Text>
          <Text>
            Correct: {correct}, Wrong: {wrong}
          </Text>
        </Flex>
        <Flex flexDir="row" justifyContent="center" alignItems="center" mt={5}>
          <Flex w="30%" mx={2}>
            <Text fontSize={24}>{wordList?.words[progress].word}</Text>
          </Flex>
          <Flex w="60%" mx={2}>
            <FormControl isInvalid={formError.length > 0}>
              <FormLabel>Enter the meaning</FormLabel>
              <FormErrorMessage>{formError}</FormErrorMessage>
              <Input
                placeholder="Meaning..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </FormControl>
          </Flex>
        </Flex>
        <Button mt={5} onClick={() => submit()}>
          {formError.length === 0 ? "Check!" : "Continue"}
        </Button>
      </Card>
    </Flex>
  );
}
