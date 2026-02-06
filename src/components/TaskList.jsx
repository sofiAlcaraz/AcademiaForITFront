import { Box, Stack } from "@mui/material";
import TaskItem from "./TaskItem";

function TaskList({ tasksList, setTask, setModalForm, setDialogDeleteTask }) {
  return (
    <Box
      sx={{
        margin: "2rem",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Stack spacing={2}>
        {tasksList.map((task, index) => (
          <TaskItem
            key={index}
            task={task}
            setTask={setTask}
            setModalForm={setModalForm}
            setDialogDeleteTask={setDialogDeleteTask}
          />
        ))}
      </Stack>
    </Box>
  );
}
export default TaskList;
