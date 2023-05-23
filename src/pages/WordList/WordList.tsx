import { useState, useEffect } from "react";
import { Flex, Button, Card, Title, Divider } from "@tremor/react";
import { Table, Thead, Tbody, Th, Tr, Td } from "@chakra-ui/react";
import {
  doc,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  collection,
} from "firebase/firestore";
import CreateEditWordListModal from "./CreateEditWordListModal";
import WordListMenu from "./WordListMenu";
import { db } from "../../firebase.config";
import StartPracticeModal from "./StartPractice";

export default function WordLists() {
  const [wordLists, setWordLists] = useState<WordList[]>([]);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [startPractice, setStartPractice] = useState<WordList>();
  const [editWordList, setEditWordList] = useState<WordList>();

  useEffect(() => {
    getDocs(collection(db, "wordLists")).then((docs) => {
      setWordLists(
        docs.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        })) as unknown as WordList[],
      );
    });
  }, []);

  async function onCreateWordList(
    name: string,
    words: Word[],
    language: string,
    translation: string,
  ) {
    if (editWordList !== undefined) {
      updateDoc(doc(db, "wordLists", editWordList.id), {
        name,
        words,
        language,
        translation,
      }).then(() => {
        setWordLists((ws) =>
          ws.map((w) =>
            w.id === editWordList.id
              ? ({
                  name,
                  words,
                  language,
                  translation,
                  id: editWordList.id,
                } as WordList)
              : w,
          ),
        );
        setEditWordList(undefined);
      });
    } else {
      addDoc(collection(db, "wordLists"), {
        name,
        words,
        language,
        translation,
      }).then((d) => {
        setWordLists((w) => [
          ...w,
          { name, words, language, translation, id: d.id } as WordList,
        ]);
      });
    }
  }
  async function deleteWordList(id: string) {
    await deleteDoc(doc(db, "wordLists", id.toString()));
    setWordLists(wordLists.filter((wordList) => wordList.id !== id));
  }

  function wordListRow(wordList: WordList) {
    return (
      <Tr
        _hover={{ bg: "#007bff70", cursor: "pointer" }}
        onClick={() => setStartPractice(wordList)}
      >
        <Td>{wordList.name}</Td>
        <Td>{wordList.words.length}</Td>
        <Td
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
        >
          <WordListMenu
            onEdit={() => {
              setEditWordList(wordList);
            }}
            onDelete={() => deleteWordList(wordList.id)}
          />
        </Td>
      </Tr>
    );
  }

  return (
    <Flex
      className="w-full h-screen p-10 bg-gradient-to-r from-cyan-500 to-blue-500"
      justifyContent="center"
      alignItems="start"
    >
      <StartPracticeModal
        isOpen={startPractice !== undefined}
        onClose={() => setStartPractice(undefined)}
        wordList={startPractice}
      />
      <CreateEditWordListModal
        isOpen={createModalOpen || editWordList !== undefined}
        onClose={() => setCreateModalOpen(false)}
        onCreate={(
          name: string,
          words: Word[],
          language: string,
          translation: string,
        ) => onCreateWordList(name, words, language, translation)}
        editWordList={editWordList}
      />
      <Card className="w-2/3">
        <Title className="text-2xl w-full text-center">Learn a Language!</Title>
        <Divider />
        <Table>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Number of words</Th>
              <Th />
            </Tr>
          </Thead>
          <Tbody>
            {wordLists.map((wordList) => wordListRow(wordList))}
            {wordLists.length === 0 && (
              <Tr>
                <Td colSpan={2}>No lists found</Td>
              </Tr>
            )}
          </Tbody>
        </Table>
        <Button className="mt-10" onClick={() => setCreateModalOpen(true)}>
          Create a new list!
        </Button>
      </Card>
    </Flex>
  );
}
