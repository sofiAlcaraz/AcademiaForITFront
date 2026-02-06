import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import StatusFormSelect from "./StatusFormSelect";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function TaskForm({
  modalForm,
  setModalForm,
  handleChange,
  handleSubmit,
  task,
}) {
  return (
    <Modal
      open={true}
      onClose={() => setModalForm({ open: false, mode: null })}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          color="black"
          id="modal-modal-title"
          variant="h4"
          component="h2"
        >
          {modalForm.mode === "create" ? "Crear Tarea" : "Editar tarea"}
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            width: 300,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            m: "auto",
            mt: 4,
          }}
        >
          <TextField
            label="Título"
            name="title"
            defaultValue={task.title}
            required
            onChange={handleChange}
          />

          <TextField
            label="Descripción"
            name="description"
            defaultValue={task.decription}
            multiline
            maxRows={10}
            minRows={10}
            onChange={handleChange}
          />
          <StatusFormSelect handleChange={handleChange} status={task.status} />

          <Button type="submit" variant="contained">
            Guardar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
export default TaskForm;
