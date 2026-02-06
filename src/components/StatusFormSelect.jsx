import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

function StatusFormSelect({ handleChange, status }) {
  return (
    <FormControl fullWidth>
      <InputLabel id="status-form">Estado</InputLabel>
      <Select
        labelId="status-form"
        id="status-form-id"
        name="Estado"
        required
        value={status}
        label="Estado"
        onChange={handleChange}
      >
        <MenuItem value={"Pendiente"}>Pendiente</MenuItem>
        <MenuItem value={"En Progreso"}>En progreso</MenuItem>
        <MenuItem value={"Terminado"}>Terminado</MenuItem>
      </Select>
    </FormControl>
  );
}
export default StatusFormSelect;
