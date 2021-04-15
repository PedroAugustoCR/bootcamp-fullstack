import { Dispatch, SetStateAction } from "react";

import { Button } from "@chakra-ui/button";
import { Flex } from "@chakra-ui/layout";

interface ResetButtonProps {
  setCurrentYear: Dispatch<SetStateAction<string>>;
  setCurrentMonth: Dispatch<SetStateAction<number>>;
  setMaxItems: Dispatch<SetStateAction<number>>;
}

export default function ResetButton({
  setCurrentYear,
  setCurrentMonth,
  setMaxItems,
}: ResetButtonProps) {
  return (
    <Flex align="center" justifyContent="center">
      <Button
        colorScheme="red"
        size="xs"
        maxW={40}
        onClick={() => {
          setCurrentMonth(0);
          setCurrentYear("");
          setMaxItems(5);
        }}
      >
        Resetar filtro
      </Button>
    </Flex>
  );
}
