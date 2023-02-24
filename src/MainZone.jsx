import { Box, Button } from "@mui/material";

import { isMyCardChosen } from "./isMyCardChosen";
import { AwaitCard } from "./AwaitCard";
import { AwaitConnection } from "./AwaitConnection";
import { AwaitVoters } from "./AwaitVoters";
import { PlanningCard } from "./PlanningCard";

export const MainZone = ({
  connectionOk,
  friendsList,
  chosenCards,
  peerId,
  resetCards,
}) => {
  if (!connectionOk) {
    return <AwaitConnection />;
  }

  if (!isMyCardChosen(peerId, chosenCards)) {
    return <AwaitCard />;
  }

  if (!areAllCardsChosen(friendsList, chosenCards)) {
    return (
      <AwaitVoters
        myCardValue={chosenCards[peerId].card}
        myName={chosenCards[peerId].name}
      />
    );
  }

  return (
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
