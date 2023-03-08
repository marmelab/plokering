import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";

import { ID_PREFIX } from "../constants";
import { getRandomId, isRegistered } from "../tools";
import { MobileCard } from "../uiComponents/Card";
import { NameChip } from "../uiComponents/NameChip";

export const AddPeerZone = ({ friendsList, peerManager, connectToPeer }) => {
  const [friendId, setFriendId] = useState(getRandomId());

  const handleFriendId = (event) => {
    setFriendId(event.target.value);
  };

  const friendsNumber = Object.keys(friendsList).length;

  return (
    <MobileCard
      title="Friends"
      subtitle={`Number: ${friendsNumber}`}
      content={
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <TextField
            sx={{ marginBottom: "15px" }}
            type="number"
            step="1"
            label="Friend Id"
            value={friendId}
            onChange={handleFriendId}
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
          disabled={!isRegistered(peerManager) || !friendId}
          onClick={connectToPeer(`${ID_PREFIX}_${friendId}`)}
        >
          Connect to peer
        </Button>
      }
    />
  );
};
