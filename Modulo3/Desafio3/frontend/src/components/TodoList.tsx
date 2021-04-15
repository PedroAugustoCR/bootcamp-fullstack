import { Flex, Stack } from "@chakra-ui/layout";

import { ReactNode } from "react";

interface TodoListProps {
  children: ReactNode;
}

export default function TodoList({ children }: TodoListProps) {
  return (
    <Flex direction="column">
      <Stack spacing="4">{children}</Stack>
    </Flex>
  );
}
