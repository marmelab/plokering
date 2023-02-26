import { Box, IconButton, Typography } from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export const CardTitle = ({ title, subtitle, show, handleShow }) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      padding: "10px",
    }}
  >
    <Typography sx={{ fontSize: 20, fontWeight: "bold" }} color="text.primary">
      {title}
    </Typography>
    {!show && !!subtitle && (
      <Typography sx={{ fontSize: 20 }} color="text.primary">
        {`[${subtitle}]`}
      </Typography>
    )}
    <IconButton
      size="small"
      onClick={handleShow}
      title={show ? "Hide" : "Show"}
    >
      {show ? <ExpandLessIcon /> : <ExpandMoreIcon />}
    </IconButton>
  </Box>
);
