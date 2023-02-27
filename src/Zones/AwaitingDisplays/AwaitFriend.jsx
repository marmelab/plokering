import { Box } from "@mui/material";

import { Container } from "./Container";

export const AwaitFriend = () => {
  return (
    <Container text="Please connect with people">
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <img src="/team.svg" width="30%" />
      </Box>
    </Container>
  );
};
