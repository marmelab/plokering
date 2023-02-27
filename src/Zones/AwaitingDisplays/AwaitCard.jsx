import { Box } from "@mui/material";

import { Container } from "./Container";

export const AwaitCard = () => {
  return (
    <Container text="Please choose a card, the others are waiting for you">
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <img src="/cards.svg" width="30%" />
      </Box>
    </Container>
  );
};
