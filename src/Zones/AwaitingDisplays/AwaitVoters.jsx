import { Box, CircularProgress } from "@mui/material";

import { Container } from "./Container";
import { PlanningCard } from "../Cards/PlanningCard";

export const AwaitVoters = ({ myCardValue, myName }) => {
  return (
    <Container text="Waiting for others players card">
      <Box
        sx={{ display: "flex", justifyContent: "center", position: "relative" }}
      >
        <img src="/time.svg" width="30%" />
        <CircularProgress
          sx={{ position: "absolute", top: "49%", left: "48.5%" }}
        />
        <PlanningCard
          sx={{ position: "absolute", top: "calc(50% - 30px)", right: "37%" }}
          value={myCardValue}
          isMe
          playerName={myName}
          index={2}
          totalNumber={2}
        />
      </Box>
    </Container>
  );
};
