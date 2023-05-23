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
import { useEffect, useState, useCallback, useMemo } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import FinishedModal from "./FinishedModal";
import { db } from "../../firebase.config";

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
  const queryParams = useMemo(() => {
    return new URLSearchParams(window.location.search);
  }, []);
  const reverse = queryParams.get("reverse") === "true";

  useEffect(() => {
    const id = queryParams.get("id");
    if (id !== null) {
      getDoc(doc(db, "wordLists", id)).then((d) => {
        const list = { id: d.id, ...d.data() } as unknown as WordList;
        list.words = shuffle(list.words);
        setWordList(list);
      });
    }
  }, [queryParams]);

  const submit = useCallback(() => {
    if (wordList === undefined) {
      return;
    }
    const correctWord = reverse
      ? wordList.words[progress].word
      : wordList.words[progress].definition;
    // Correct
    if (input === correctWord) {
      setCorrect((c) => c + 1);
      toast.success("Jeej, that's correct!");

      // Only when last one is success, we exit
      if (progress + 1 === wordList.words.length) {
        setFinishedOpen(true);
        return;
      }

      // Wrong
    } else {
      setWrong((w) => w + 1);
      setWordList({
        ...wordList,
        words: [...wordList.words, wordList.words[progress]],
      });
      setFormError(`Sorry, that's incorrect. It should be: ${correctWord}`);
      return;
    }
    setProgress((p) => p + 1);
    setInput("");
    setFormError("");
  }, [input, progress, wordList, reverse]);
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
        <Flex flexDir="row" justifyContent="center" alignItems="center" my={10}>
          <Flex w="30%" mx={2} flexDir="column">
            <FormLabel>
              {reverse ? wordList?.language : wordList?.translation}
            </FormLabel>
            <Text fontSize={24}>
              {reverse
                ? wordList?.words[progress].definition
                : wordList?.words[progress].word}
            </Text>
          </Flex>
          <Flex w="60%" mx={2}>
            <FormControl isInvalid={formError.length > 0}>
              <FormLabel>
                {reverse ? wordList?.translation : wordList?.language}
              </FormLabel>
              <Input
                placeholder="Meaning..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <FormErrorMessage>{formError}</FormErrorMessage>
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
