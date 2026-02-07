import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Button, Paper, Typography } from "@mui/material";

function Task() {
  const inicialTask = {
    id: "",
    title: "",
    description: "",
    status: "Pendiente",
    createdAt: "",
  };
  const [task, setTask] = useState(inicialTask);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [errorMessage, setErrorMessage] = useState(null);
  const apiBaseUrl = import.meta.env.VITE_API_ACADEMIAFORITBACKEND;
  const date = new Date(task.createdAt);

  useEffect(() => {
    fetch(apiBaseUrl + id)
      .then((response) => response.json())
      .then((data) => {
        setTask(data);
        setLoading(false);
      })
      .catch((error) => setErrorMessage(error.message));
  }, [apiBaseUrl, id]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      {!loading && !errorMessage ? (
        <Box>
          <Paper
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: "2rem",
              alignItems: "flex-start",
              maxWidth: "50rem",
              margin: "1rem",
            }}
          >
            <Typography color="secondary" variant="h4">
              Titulo:
            </Typography>
            <Typography sx={{ wordBreak: "break-word" }} variant="h3">
              {task.title}
            </Typography>
            <Typography color="secondary" variant="h4">
              {" "}
              Descripción:{" "}
            </Typography>
            <Typography sx={{ wordBreak: "break-word" }} variant="h5">
              {task.description}
            </Typography>
            <Typography color="secondary" variant="h4">
              Estado:{" "}
            </Typography>
            <Typography variant="h5">{task.status}</Typography>
            <Typography color="secondary" variant="h4">
              {" "}
              Fecha creación/última modificación:{" "}
            </Typography>
            <Typography variant="h6">
              {date.getDay()}/{date.getMonth()}/{date.getFullYear()}
            </Typography>
          </Paper>
          <Button variant="outlined" href="/">
            Volver
          </Button>
        </Box>
      ) : (
        <Typography variant="h3">{errorMessage}</Typography>
      )}
    </Box>
  );
}
export default Task;
