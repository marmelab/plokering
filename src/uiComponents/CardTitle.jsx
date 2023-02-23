import { Typography } from "@mui/material";

export const CardTitle = ({ children }) => (
  <Typography
    sx={{ fontSize: 20, fontWeight: "bold", paddingBottom: "15px" }}
    color="text.primary"
    gutterBottom
  >
    {children}
  </Typography>
);
