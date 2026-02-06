import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

function DialogDeleteTaskCard({ setDialogDeleteTask, deleteTask, task }) {
  return (
    <Box>
      <Dialog
        open={true}
        onClose={() => setDialogDeleteTask(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Estas seguro de querer borrar esta tarea?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {task.title}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={deleteTask}>Confirmar</Button>
          <Button onClick={() => setDialogDeleteTask(false)}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
export default DialogDeleteTaskCard;
