import { Box, CircularProgress, Typography } from "@mui/material";

import { PlanningCard } from "./PlanningCard";

export const MainZone = ({ connection, chosenCards, messages, peerId }) => {
  return (
    <>
      {connection ? (
        <>
          {areAllCardsChosen(2, chosenCards) ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignContent: "center",
                marginTop: "50px",
              }}
            >
              {Object.keys(chosenCards).map((player, index) => {
                return (
                  <PlanningCard
                    key={index}
                    bigCard
                    value={chosenCards[player].card}
                    isMe={peerId === player}
                    playerName={chosenCards[player].name}
                    index={index}
                    totalNumber={Object.keys(chosenCards).length}
                  />
                );
              })}
            </Box>
          ) : (
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
                Waiting for others players
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress />
              </Box>
            </Box>
          )}
          <br />
          <br />
          <Typography
            sx={{
              fontWeight: "bold",
              paddingTop: "50px",
            }}
            color="text.primary"
            gutterBottom
          >
            Messages:
          </Typography>
          <Box
            component="p"
            sx={{
              whiteSpace: "pre-line",
              maxHeight: "250px",
              maxWidth: "500px",
              overflowY: "scroll",
            }}
          >
            {messages}
          </Box>
        </>
      ) : (
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
            Please connect with people
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <img src="/team.svg" width="30%" />
          </Box>
        </Box>
      )}
    </>
  );
};

const areAllCardsChosen = (playersNumber, chosenCards) => {
  const players = Object.keys(chosenCards);
  if (
    players.length === playersNumber &&
    !players.find((player) => {
      chosenCards[player] === null || chosenCards[player] === undefined;
    })
  ) {
    return true;
  }
  return false;
};
