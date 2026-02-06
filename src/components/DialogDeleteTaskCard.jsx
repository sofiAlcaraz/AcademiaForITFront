import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
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
          Estás seguro de querer borrar esta tarea?
        </DialogTitle>
        <DialogContent dividers="true">
          <Typography id="alert-dialog-description">{task.title}</Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={() => setDialogDeleteTask(false)}>
            Cerrar
          </Button>
          <Button color="primary" variant="contained" onClick={deleteTask}>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
export default DialogDeleteTaskCard;
