import { Box, CircularProgress, Typography } from "@mui/material";

import { PlanningCard } from "./PlanningCard";

export const AwaitVoters = ({ myCardValue, myName }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <Typography
        sx={{
          fontSize: 20,
          fontWeight: "bold",
          paddingTop: "50px",
          paddingBottom: "50px",
          textAlign: "center",
        }}
        color="text.primary"
        gutterBottom
      >
        Waiting for others players card
      </Typography>
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
    </Box>
  );
};
