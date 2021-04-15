import { Box, Flex, Text } from "@chakra-ui/layout";

interface SummaryProps {
  tasksSummary: {
    tasksTotal: number;
    tasksDone: number;
    tasksUndone: number;
  };
}

export default function Summary({ tasksSummary }: SummaryProps) {
  return (
    <Flex align="center" justifyContent="space-between">
      <Box p="6" bg="gray.500" align="center" borderRadius="base" w="30%">
        <Text>Total: {tasksSummary.tasksTotal}</Text>
      </Box>
      <Box p="6" bg="gray.500" align="center" borderRadius="base" w="30%">
        <Text>Completas: {tasksSummary.tasksDone}</Text>
      </Box>
      <Box p="6" bg="gray.500" align="center" borderRadius="base" w="30%">
        <Text>Incompletas: {tasksSummary.tasksUndone}</Text>
      </Box>
    </Flex>
  );
}
