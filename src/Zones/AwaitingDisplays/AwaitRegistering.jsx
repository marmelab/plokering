import { Box } from "@mui/material";

import { Container } from "./Container";

export const AwaitRegistering = () => {
  return (
    <Container text="Please choose an id and register">
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <img src="/login.svg" width="30%" />
      </Box>
    </Container>
  );
};
