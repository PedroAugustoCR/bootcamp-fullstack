import { Dispatch, SetStateAction } from "react";

import { Button } from "@chakra-ui/button";
import { SimpleGrid } from "@chakra-ui/layout";

interface MonthsProps {
  months: string[];
  setCurrentMonth: Dispatch<SetStateAction<number>>;
  isLoading: boolean;
}

export default function Months({
  months,
  setCurrentMonth,
  isLoading,
}: MonthsProps) {
  return (
    <SimpleGrid columns={6} columnGap={2} rowGap={2}>
      {months.map((month, index) => (
        <Button
          key={index}
          colorScheme="purple"
          size="xs"
          isLoading={isLoading}
          onClick={() => setCurrentMonth(months.indexOf(month) + 1)}
        >
          {month}
        </Button>
      ))}
    </SimpleGrid>
  );
}
