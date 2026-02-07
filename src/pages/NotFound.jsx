import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        flexDirection: "column",
      }}
    >
      <Typography color="primary" variant="h6">
        Aqui no hay nada...
      </Typography>
      <Link to="/">Home</Link>
    </Box>
  );
}
export default NotFound;
