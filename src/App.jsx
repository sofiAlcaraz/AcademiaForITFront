import { useEffect, useState } from "react";
import "./App.css";
import { Alert, Box, Stack } from "@mui/material";
import NavBar from "./components/NavBar";
import DialogDeleteTaskCard from "./components/DialogDeleteTaskCard";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";

function App() {
  const [loading, setLoading] = useState(true);
  const [modalForm, setModalForm] = useState({ open: false, mode: null });

  const [dialogDeleteTask, setDialogDeleteTask] = useState(false);
  const [alert, setAlert] = useState({
    type: "",
    message: "",
    open: false,
  });
  const [tasksList, setTasksList] = useState([]);
  const [task, setTask] = useState({
    id: "",
    title: "",
    description: "",
    status: "Pendiente",
    createAt: "",
  });

  useEffect(() => {
    fetch("http://localhost:3000/api/tasks")
      .then((response) => response.json())
      .then((data) => setTasksList(data))
      .catch(() => {
        console.log("error");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (modalForm.mode === "create") {
      fetch("http://localhost:3000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      })
        .then((response) => response.json())
        .then((data) => {
          setTasksList((prev) => [...prev, data.newTask]);
          setAlert({
            type: "success",
            message: data.message,
            open: true,
          });
        })
        .finally(() =>
          setModalForm({
            open: false,
            mode: null,
          }),
        )
        .catch((error) => {
          setAlert({
            type: "error",
            message: error.message,
            open: true,
          });
        });
    } else {
      fetch(`http://localhost:3000/api/tasks/${task.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      })
        .then((response) => response.json())
        .then((data) => {
          setTasksList((prev) => [...prev, data.updatedTask]);
          setAlert({ type: "success", message: data.message, open: true });
        })
        .finally(() =>
          setModalForm({
            open: false,
            mode: null,
          }),
        )
        .catch((error) => {
          setAlert({ type: "error", message: error.message, open: true });
        });
    }
  };

  const deleteTask = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3000/api/tasks/${task.id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        setTasksList((prev) => prev.filter((t) => t.id !== task.id));
        setAlert({ type: "success", message: data.message, open: true });
      })
      .finally(() => setDialogDeleteTask(false))
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Box>
      {modalForm.open && (
        <TaskForm
          modalForm={modalForm}
          setModalForm={setModalForm}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          task={task}
        />
      )}
      {alert.open && (
        <Alert
          sx={{ position: "fixed", bottom: "0", right: "0", margin: "1rem" }}
          variant="filled"
          severity={alert.type}
          onClose={() =>
            setAlert({
              type: "",
              message: "",
              open: false,
            })
          }
        >
          {alert.message}
        </Alert>
      )}
      {dialogDeleteTask && (
        <DialogDeleteTaskCard
          setDialogDeleteTask={setDialogDeleteTask}
          task={task}
          deleteTask={deleteTask}
        />
      )}
      {!loading && (
        <Box>
          <NavBar setModalForm={setModalForm} handleSubmit={handleSubmit} />
          <TaskList
            tasksList={tasksList}
            setTask={setTask}
            setModalForm={setModalForm}
            setDialogDeleteTask={setDialogDeleteTask}
          />
        </Box>
      )}
    </Box>
  );
}

export default App;
