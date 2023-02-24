import { Button, CardActions, CardContent, TextField } from "@mui/material";

import { isRegistered } from "./tools";
import { Card } from "./uiComponents/Card";
import { CardTitle } from "./uiComponents/CardTitle";

export const ConnectionZone = ({
  peerId,
  peerName,
  handlePeerId,
  handlePeerName,
  peerManager,
  register,
  unRegister,
}) => {
  const isRegisteredOk = isRegistered(peerManager);

  return (
    <Card>
      <CardContent>
        <CardTitle>Connection</CardTitle>
        <TextField
          sx={{ marginBottom: "15px" }}
          type="number"
          step="1"
          label="My Id"
          disabled={isRegisteredOk}
          value={peerId}
          onChange={handlePeerId}
        />
        <TextField
          label="My nickname"
          value={peerName}
          onChange={handlePeerName}
        />
      </CardContent>
      <CardActions sx={{ justifyContent: "space-between" }}>
        <Button size="small" disabled={isRegisteredOk} onClick={register}>
          Register to server
        </Button>
        <Button size="small" disabled={!isRegisteredOk} onClick={unRegister}>
          Unregister
        </Button>
      </CardActions>
    </Card>
  );
};
