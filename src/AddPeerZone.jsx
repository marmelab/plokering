import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";

export const AddPeerZone = ({
  friendId,
  friendName,
  handleFriendId,
  peer,
  connection,
  connectToPeer,
}) => {
  return (
    <Card elevation={4} sx={{ marginBottom: "20px" }}>
      <CardContent>
        <Typography
          sx={{ fontSize: 20, fontWeight: "bold", paddingBottom: "15px" }}
          color="text.primary"
          gutterBottom
        >
          Add peer
        </Typography>
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
