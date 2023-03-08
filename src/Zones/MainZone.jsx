import { Box, Button } from "@mui/material";

import { isMyCardChosen } from "../tools";
import { AwaitCard } from "./AwaitingDisplays/AwaitCard";
import { AwaitFriend } from "./AwaitingDisplays/AwaitFriend";
import { AwaitRegistering } from "./AwaitingDisplays/AwaitRegistering";
import { AwaitVoters } from "./AwaitingDisplays/AwaitVoters";
import { PlanningCard } from "./Cards/PlanningCard";

export const MainZone = ({
  registeringOk,
  connectionOk,
  friendsList,
  chosenCards,
  peerId,
  resetCards,
}) => {
  if (!registeringOk) {
    return <AwaitRegistering />;
  }

  if (!connectionOk) {
    return <AwaitFriend />;
  }

  if (!isMyCardChosen(peerId, chosenCards)) {
    return <AwaitCard />;
  }

  const playersAwaited = getPlayersAwaited(friendsList, chosenCards);
  if (playersAwaited.length) {
    return (
      <AwaitVoters
        myCardValue={chosenCards[peerId].card}
        myName={chosenCards[peerId].name}
        playersAwaited={playersAwaited}
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
        marginBottom: "10px",
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
        disabled={!!getPlayersAwaited(friendsList, chosenCards).length}
        onClick={resetCards}
      >
        Next estimation
      </Button>
    </Box>
  );
};

const getPlayersAwaited = (friendsList, chosenCards) => {
  const allPlayers = Object.keys(friendsList);
  const playersOk = Object.keys(chosenCards);

  const awaitedPlayers = allPlayers.filter(
    (player) => !playersOk.includes(player)
  );

  return awaitedPlayers.map((player) => {
    return friendsList[player].name;
  });
};
