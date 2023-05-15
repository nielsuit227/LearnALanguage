import { useState, useEffect } from "react";
import { Flex, Button, Card, Title, Divider } from "@tremor/react";
import { Table, Thead, Tbody, Th, Tr, Td } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CreateWordListModal from "./CreateWordListModal";
import WordListMenu from "./WordListMenu";

export default function WordLists() {
  const [wordLists, setWordLists] = useState<WordList[]>([]);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("wordlist")
      .then((res) => {
        setWordLists(res.data);
      })
      .catch(() => {});
  }, []);

  function onCreateWordList(name: string, words: Word[]) {
    axios
      .post("wordlist", { name, words })
      .then((response) => {
        setWordLists([...wordLists, response.data]);
      })
      .catch(() => {});
  }
  function deleteWordList(id: number) {
    axios
      .delete(`wordlist/${id}`)
      .then(() => {
        setWordLists(wordLists.filter((wordList) => wordList.id !== id));
      })
      .catch(() => {});
  }

  function wordListRow(wordList: WordList) {
    return (
      <Tr
        _hover={{ bg: "#007bff70", cursor: "pointer" }}
        onClick={() => navigate(`/practice?id=${wordList.id}`)}
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
            onEdit={() => {}}
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
      <CreateWordListModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onCreate={(name: string, words: Word[]) =>
          onCreateWordList(name, words)
        }
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
