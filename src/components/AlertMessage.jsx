import { Alert } from "@mui/material";
function AlertMessage({ setAlert, alert }) {
  return (
    <Alert
      sx={{
        position: "fixed",
        bottom: "0",
        right: "0",
        margin: "1rem",
        zIndex: "100",
      }}
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
  );
}
export default AlertMessage;
