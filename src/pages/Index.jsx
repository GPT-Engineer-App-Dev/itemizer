import { useState } from "react";
import { Box, Input, Button, List, ListItem, IconButton, Text, useToast } from "@chakra-ui/react";
import { FaPlus, FaTrash, FaCheck } from "react-icons/fa";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const toast = useToast();

  const handleAddTask = () => {
    if (inputValue.trim() === "") {
      toast({
        title: "No task entered",
        description: "Please enter a task before adding.",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    const newTask = {
      id: Date.now(),
      text: inputValue,
      isCompleted: false,
    };
    setTasks([...tasks, newTask]);
    setInputValue("");
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleCompleteTask = (id) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, isCompleted: !task.isCompleted } : task)));
  };

  return (
    <Box p={5}>
      <Box mb={4} display="flex" alignItems="center">
        <Input placeholder="Add a new task..." value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyPress={(e) => e.key === "Enter" && handleAddTask()} mr={2} />
        <Button leftIcon={<FaPlus />} colorScheme="blue" onClick={handleAddTask}>
          Add Task
        </Button>
      </Box>
      <List spacing={3}>
        {tasks.map((task) => (
          <ListItem key={task.id} display="flex" alignItems="center" justifyContent="space-between">
            <Text as={task.isCompleted ? "del" : ""}>{task.text}</Text>
            <Box>
              <IconButton icon={<FaCheck />} aria-label="Complete Task" colorScheme="green" onClick={() => handleCompleteTask(task.id)} mr={2} />
              <IconButton icon={<FaTrash />} aria-label="Delete Task" colorScheme="red" onClick={() => handleDeleteTask(task.id)} />
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Index;
