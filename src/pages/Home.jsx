import { useCallback, useEffect, useState } from "react";
import "../App.css";
import NavBar from "../components/NavBar";
import DialogDeleteTaskCard from "../components/DialogDeleteTaskCard";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";
import AlertMessage from "../components/AlertMessage";
import { Box } from "@mui/material";

function Home() {
  const apiBaseUrl = import.meta.env.VITE_API_ACADEMIAFORITBACKEND;
  const [loading, setLoading] = useState(true);
  const [modalForm, setModalForm] = useState({ open: false, mode: null });
  const [dialogDeleteTask, setDialogDeleteTask] = useState(false);
  const [alert, setAlert] = useState({
    type: "",
    message: "",
    open: false,
  });
  const [tasksList, setTasksList] = useState([]);
  const inicialTask = {
    id: "",
    title: "",
    description: "",
    status: "Pendiente",
    createdAt: "",
  };
  const [task, setTask] = useState(inicialTask);

  const getTasks = useCallback(async () => {
    fetch(apiBaseUrl)
      .then((response) => response.json())
      .then((data) => setTasksList(data))
      .catch((error) => {
        setAlert({
          type: "error",
          message: error.message,
          open: true,
        });
      })
      .finally(() => setLoading(false));
  }, [apiBaseUrl]);

  useEffect(() => {
    getTasks();
  }, [getTasks]);

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (modalForm.mode === "create") {
      fetch(apiBaseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      })
        .then((response) => response.json())
        .then((data) => {
          getTasks();
          setTask(inicialTask);
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
      fetch(apiBaseUrl + task.id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      })
        .then((response) => response.json())
        .then((data) => {
          getTasks();
          setTask(inicialTask);
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
    fetch(apiBaseUrl + task.id, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        getTasks();
        setTask(inicialTask);
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
      {alert.open && <AlertMessage alert={alert} setAlert={setAlert} />}
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

export default Home;
