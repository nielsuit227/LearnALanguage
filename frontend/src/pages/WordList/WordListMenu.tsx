import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

export default function WordListMenu({
  onEdit,
  onDelete,
}: {
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <Menu autoSelect={false}>
      <MenuButton
        aria-label="See menu"
        _hover={{ bg: "#d4d4d4" }}
        borderRadius={9}
        p={2}
      >
        <BsThreeDotsVertical />
      </MenuButton>
      <MenuList>
        <MenuItem onClick={onEdit} icon={<AiOutlineEdit fontSize={20} />}>
          Edit
        </MenuItem>
        <MenuItem
          color="red"
          onClick={onDelete}
          icon={<AiOutlineDelete fontSize={20} />}
        >
          Remove
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
