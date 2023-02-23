import { Button, CardActions, CardContent, TextField } from "@mui/material";

import { Card } from "./uiComponents/Card";
import { CardTitle } from "./uiComponents/CardTitle";

export const SendMessageZone = ({
  message,
  handleMessage,
  connection,
  sendMessageToPeers,
}) => {
  return (
    <Card>
      <CardContent>
        <CardTitle>Message</CardTitle>
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
