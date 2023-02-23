import { Box, Button } from "@mui/material";

import { AwaitConnection } from "./AwaitConnection";
import { AwaitVoters } from "./AwaitVoters";
import { MessagesZone } from "./MessagesZone";
import { PlanningCard } from "./PlanningCard";

export const MainZone = ({
  connectionOk,
  chosenCards,
  messages,
  peerId,
  resetCards,
}) => {
  if (!connectionOk) {
    return (
      <Container messages={messages}>
        <AwaitConnection />
      </Container>
    );
  }

  if (!areAllCardsChosen(2, chosenCards)) {
    return (
      <Container messages={messages}>
        <AwaitVoters />
      </Container>
    );
  }

  return (
    <Container messages={messages}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
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
        <Button
          size="small"
          disabled={!areAllCardsChosen(2, chosenCards)}
          onClick={resetCards}
        >
          Next estimation
        </Button>
      </Box>
    </Container>
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

const Container = ({ children, messages }) => {
  return (
    <>
      {children}
      <MessagesZone messages={messages} />
    </>
  );
};
