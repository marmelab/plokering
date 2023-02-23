import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";

export const ConnectionZone = ({
  peerId,
  peerName,
  handlePeerId,
  handlePeerName,
  peer,
  register,
  unRegister,
}) => {
  return (
    <Card elevation={4} sx={{ marginBottom: "20px" }}>
      <CardContent>
        <Typography
          sx={{ fontSize: 20, fontWeight: "bold", paddingBottom: "15px" }}
          color="text.primary"
          gutterBottom
        >
          Connection
        </Typography>
        <TextField
          sx={{ marginBottom: "15px" }}
          type="number"
          step="1"
          label="My Id"
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
        <Button size="small" disabled={!!peer} onClick={register}>
          Register to server
        </Button>
        <Button size="small" disabled={!peer} onClick={unRegister}>
          Unregister
        </Button>
      </CardActions>
    </Card>
  );
};
