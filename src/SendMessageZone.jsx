import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";

export const SendMessageZone = ({
  message,
  handleMessage,
  connection,
  sendMessageToPeers,
}) => {
  return (
    <Card elevation={4} sx={{ marginBottom: "20px" }}>
      <CardContent>
        <Typography
          sx={{ fontSize: 20, fontWeight: "bold", paddingBottom: "15px" }}
          color="text.primary"
          gutterBottom
        >
          Message
        </Typography>
        <TextField
          label="My message"
          value={message}
          onChange={handleMessage}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              return sendMessageToPeers();
            }
          }}
          fullWidth
        />
      </CardContent>
      <CardActions>
        <Button
          size="small"
          disabled={!connection}
          onClick={sendMessageToPeers}
        >
          Send message
        </Button>
      </CardActions>
    </Card>
  );
};
