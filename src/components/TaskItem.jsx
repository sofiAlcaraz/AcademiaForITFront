import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Typography,
} from "@mui/material";

function TaskItem({ task, setTask, setModalForm, setDialogDeleteTask }) {
  return (
    <Card sx={{ minWidth: 275, position: "relative" }}>
      <CardContent>
        <Box
          sx={{
            position: "absolute",
            top: 1,
            right: 2,
          }}
        >
          <Chip
            label={task.status}
            variant="contained"
            color="secondary"
            size="small"
            sx={{ display: "flex", right: "0" }}
          />
        </Box>

        <Typography variant="h5" component="div">
          {task.title}
        </Typography>

        <Typography sx={{ color: "text.secondary", mb: 1.5 }} variant="body2">
          {task.description ? task.description : "...no hay descripción"}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={() => {
            (setModalForm({
              open: true,
              mode: "edit",
            }),
              setTask(task));
          }}
        >
          Editar
        </Button>
        <Button
          size="small"
          onClick={() => {
            setDialogDeleteTask(true);
            setTask(task);
          }}
        >
          Borrar
        </Button>
      </CardActions>
    </Card>
  );
}
export default TaskItem;
