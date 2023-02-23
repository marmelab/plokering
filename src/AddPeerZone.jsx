import {
  Box,
  Button,
  CardActions,
  CardContent,
  TextField,
} from "@mui/material";
import { useState } from "react";

import { ID_PREFIX } from "./constants";
import { getRandomId } from "./getIdentity";
import { Card } from "./uiComponents/Card";
import { CardTitle } from "./uiComponents/CardTitle";

export const AddPeerZone = ({ friendsList, peer, connectToPeer }) => {
  const [friendId, setFriendId] = useState(getRandomId());

  const handleFriendId = (event) => {
    setFriendId(event.target.value);
  };
  return (
    <Card>
      <CardContent>
        <CardTitle>Add peer</CardTitle>
        <TextField
          sx={{ marginBottom: "15px" }}
          type="number"
          step="1"
          label="Friend Id"
          value={friendId}
          onChange={handleFriendId}
        />
        {Object.keys(friendsList).map((friendId, index) => {
          return (
            <Box key={index}>
              {friendsList[friendId].name || `[${friendId}]`}
            </Box>
          );
        })}
      </CardContent>
      <CardActions>
        <Button
          size="small"
          disabled={!peer || !!Object.keys(friendsList).length}
          onClick={connectToPeer(`${ID_PREFIX}_${friendId}`)}
        >
          Connect to peer
        </Button>
      </CardActions>
    </Card>
  );
};
