import { Box, CircularProgress, useMediaQuery } from "@mui/material";

import { MEDIAQUERY_MOBILE_GAP } from "../../constants";
import { Container } from "./Container";
import { PlanningCard } from "../Cards/PlanningCard";
import { NameChip } from "../../uiComponents/NameChip";

export const AwaitVoters = ({ myCardValue, myName, playersAwaited }) => {
  const desktopDisplay = useMediaQuery(MEDIAQUERY_MOBILE_GAP);
  return (
    <Container text="Waiting for remaining players' cards:">
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        . . . . .
        {playersAwaited.map((playerName) => {
          return (
            <NameChip
              sx={{ margin: "0 5px" }}
              key={playerName}
              name={playerName}
            />
          );
        })}
        . . . . .
      </Box>
      <Box
        sx={{ display: "flex", justifyContent: "center", position: "relative" }}
      >
        <img src="/time.svg" width="30%" />
        <CircularProgress
          sx={{
            position: "absolute",
            top: desktopDisplay ? "49%" : "30%",
            left: desktopDisplay ? "48.5%" : "45.5%",
          }}
        />
        <PlanningCard
          sx={{
            position: "absolute",
            top: "calc(50% - 30px)",
            right: desktopDisplay ? "37%" : "28%",
          }}
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
