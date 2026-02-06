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

function ModalCreateTask({ setModalCreateTask, handleChange, handleSubmit }) {
  return (
    <Modal
      open={true}
      onClose={() => setModalCreateTask(false)}
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
          Crear nueva tarea
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
            required
            onChange={handleChange}
          />

          <TextField
            label="Descripción"
            name="description"
            required
            multiline
            maxRows={10}
            minRows={10}
            onChange={handleChange}
          />
          <StatusFormSelect handleChange={handleChange} />

          <Button type="submit" variant="contained">
            Guardar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
export default ModalCreateTask;
