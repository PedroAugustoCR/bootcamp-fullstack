import { Todo } from "../App";
import axios from "axios";

const API_URL = "http://localhost:3001";

export const getTodos = async (year?: string, month?: number) => {
  let response;

  if (year !== "" && month !== 0) {
    response = await axios.get(`${API_URL}/todos?year=${year}&month=${month}`);
  } else if (year !== "") {
    response = await axios.get(`${API_URL}/todos?year=${year}`);
  } else if (month !== 0) {
    response = await axios.get(`${API_URL}/todos?month=${year}`);
  } else {
    response = await axios.get(`${API_URL}/todos`);
  }

  const todos = response.data.map((todo: Todo) => ({
    ...todo,
    // date: new Intl.DateTimeFormat("pt-BR", {
    //   day: "numeric",
    //   month: "numeric",
    //   year: "numeric",
    // }).format(new Date(todo.date)),
  }));
  todos.sort((a: Todo, b: Todo) => b.date.localeCompare(a.date));

  return todos;
};

export const updateTodo = async (todo: Todo) => {
  const updatedTodo = {
    day: todo.day,
    month: todo.month,
    year: todo.year,
    period: todo.period,
    date: todo.date,
    description: todo.description,
    done: !todo.done,
  };
  const response = await axios.put(`${API_URL}/todos/${todo.id}`, updatedTodo);

  return response.data;
};

export const createHeaderData = (todos: Todo[]) => {
  const years = ["2019", "2020", "2021"];
  const months = [
    "JAN",
    "FEV",
    "MAR",
    "ABR",
    "MAI",
    "JUN",
    "JUL",
    "AGO",
    "SET",
    "OUT",
    "NOV",
    "DEZ",
  ];

  const tasksSummary = todos.reduce(
    (acc, todo) => {
      if (todo.done) {
        acc.tasksDone++;
      } else {
        acc.tasksUndone++;
      }

      acc.tasksTotal++;

      return acc;
    },
    { tasksTotal: 0, tasksDone: 0, tasksUndone: 0 }
  );

  return { years, months, tasksSummary };
};
