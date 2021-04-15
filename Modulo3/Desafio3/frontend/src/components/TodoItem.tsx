import { Flex, Text } from "@chakra-ui/layout";

import { Button } from "@chakra-ui/button";
import Icon from "@chakra-ui/icon";
import { MdDone } from "react-icons/md";
import { Todo } from "../App";

interface TodoItemProps {
  todo: Todo;
  handleCheckTodo: (todo: Todo) => void;
}

export default function TodoItem({ todo, handleCheckTodo }: TodoItemProps) {
  return (
    <Flex
      key={todo.id}
      align="center"
      justifyContent="space-between"
      bg="gray.700"
      p="4"
      borderRadius="full"
    >
      <Button
        bg="gray.900"
        w={10}
        h={10}
        borderRadius="full"
        onClick={(event) => handleCheckTodo(todo)}
      >
        <Icon
          as={MdDone}
          color={todo.done ? "green" : "gray"}
          fontSize="25"
          pointerEvents="none"
        />
      </Button>
      <Text>{todo.description}</Text>
      <Text>{todo.date}</Text>
    </Flex>
  );
}
