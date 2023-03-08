import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";

import { ID_PREFIX } from "../constants";
import { getRandomId, isRegistered } from "../tools";
import { MobileCard } from "../uiComponents/Card";
import { NameChip } from "../uiComponents/NameChip";

export const AddPeerZone = ({
  friendsList,
  peerManager,
  connectToPeer,
  isHost,
}) => {
  const [friendId, setFriendId] = useState(getRandomId());

  const handleFriendId = (event) => {
    setFriendId(event.target.value);
  };

  const friendsNumber = Object.keys(friendsList).length;

  return (
    <MobileCard
      title="Peers"
      subtitle={`Number: ${friendsNumber}`}
      content={
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <TextField
            sx={{ marginBottom: "15px" }}
            type="number"
            step="1"
            label={isHost ? "New peers Id" : "Host id"}
            value={friendId}
            onChange={handleFriendId}
            disabled={!isHost && !!Object.keys(friendsList).length}
            onFocus={(event) => {
              event.target.select();
            }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              margin: "0 10px",
              alignContent: "flex-end",
              justifyContent: "between-start",
            }}
          >
            {Object.keys(friendsList).map((friendId, index) => {
              return (
                <NameChip
                  key={index}
                  name={friendsList[friendId].name || `[${friendId}]`}
                  id={friendId}
                />
              );
            })}
          </Box>
        </Box>
      }
      actions={
        <Button
          size="small"
          disabled={
            !isRegistered(peerManager) ||
            !friendId ||
            (!isHost && !!Object.keys(friendsList).length)
          }
          onClick={connectToPeer(`${ID_PREFIX}_${friendId}`)}
        >
          {isHost ? "Connect a peer" : "Connect to host"}
        </Button>
      }
    />
  );
};
