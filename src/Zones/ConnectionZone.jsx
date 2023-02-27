import { Button, TextField } from "@mui/material";

import { isRegistered } from "../tools";
import { MobileCard } from "../uiComponents/Card";

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
    <MobileCard
      title="Connection"
      subtitle={`My id: ${peerId}`}
      content={
        <>
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
        </>
      }
      actions={
        //sx={{ justifyContent: "space-between" }}
        <>
          <Button size="small" disabled={isRegisteredOk} onClick={register}>
            Register to server
          </Button>
          <Button size="small" disabled={!isRegisteredOk} onClick={unRegister}>
            Unregister
          </Button>
        </>
      }
    ></MobileCard>
  );
};
