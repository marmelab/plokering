import { Card as MuiCard } from "@mui/material";

export const Card = ({ children }) => (
  <MuiCard elevation={4} sx={{ marginBottom: "20px" }}>
    {children}
  </MuiCard>
);
