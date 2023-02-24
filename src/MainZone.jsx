import { Box, Button } from "@mui/material";

import { AwaitCard } from "./AwaitCard";
import { AwaitConnection } from "./AwaitConnection";
import { AwaitVoters } from "./AwaitVoters";
import { MessagesZone } from "./MessagesZone";
import { PlanningCard } from "./PlanningCard";

export const MainZone = ({
  connectionOk,
  friendsList,
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

  if (!isMyCardChosen(peerId, chosenCards)) {
    return (
      <Container messages={messages}>
        <AwaitCard />
      </Container>
    );
  }

  if (!areAllCardsChosen(friendsList, chosenCards)) {
    return (
      <Container messages={messages}>
        <AwaitVoters
          myCardValue={chosenCards[peerId].card}
          myName={chosenCards[peerId].name}
        />
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
            margin: "50px 0",
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
          disabled={!areAllCardsChosen(friendsList, chosenCards)}
          onClick={resetCards}
        >
          Next estimation
        </Button>
      </Box>
    </Container>
  );
};

const areAllCardsChosen = (friendsList, chosenCards) => {
  const playersNumber = 1 + Object.keys(friendsList || {}).length;
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

const isMyCardChosen = (myPeerId, chosenCards) => {
  if (chosenCards[myPeerId] === null || chosenCards[myPeerId] === undefined) {
    return false;
  }
  return true;
};

const Container = ({ children, messages }) => {
  return (
    <>
      {children}
      <MessagesZone messages={messages} />
    </>
  );
};
