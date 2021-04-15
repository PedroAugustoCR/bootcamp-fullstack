import { Dispatch, SetStateAction } from "react";

import { Button } from "@chakra-ui/button";
import { Flex } from "@chakra-ui/layout";

interface YearsProps {
  years: string[];
  setCurrentYear: Dispatch<SetStateAction<string>>;
  isLoading: boolean;
}

export default function Years({
  years,
  setCurrentYear,
  isLoading,
}: YearsProps) {
  return (
    <Flex align="center" justifyContent="space-evenly">
      {years.map((year, index) => {
        return (
          <Button
            key={index}
            id={String(index)}
            colorScheme="pink"
            size="sm"
            isLoading={isLoading}
            onClick={() => setCurrentYear(year)}
          >
            {year}
          </Button>
        );
      })}
    </Flex>
  );
}
