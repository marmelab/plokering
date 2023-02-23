import { Button, CardActions, CardContent, TextField } from "@mui/material";

import { Card } from "./uiComponents/Card";
import { CardTitle } from "./uiComponents/CardTitle";

export const AddPeerZone = ({
  friendId,
  friendName,
  handleFriendId,
  peer,
  connection,
  connectToPeer,
}) => {
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
        <TextField label="Friend nickname" value={friendName} disabled />
      </CardContent>
      <CardActions>
        <Button
          size="small"
          disabled={!peer || !!connection}
          onClick={connectToPeer}
        >
          Connect to peer
        </Button>
      </CardActions>
    </Card>
  );
};
