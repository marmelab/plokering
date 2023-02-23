import { Button, CardActions, CardContent, TextField } from "@mui/material";
import { useState } from "react";

import { SELF_CODE } from "./constants";
import { isConnectionOpened } from "./isConnectionOpened";
import { Card } from "./uiComponents/Card";
import { CardTitle } from "./uiComponents/CardTitle";

export const SendMessageZone = ({ myName, friendsList, addMessage }) => {
  const [message, setMessage] = useState("");

  const handleMessage = (event) => {
    setMessage(event.target.value);
  };

  const sendMessageToPeers = () => {
    console.log("Send a message to peer");
    addMessage({ author: SELF_CODE, text: message });
    Object.keys(friendsList).map((friendId) =>
      friendsList[friendId].connection.send({
        name: myName,
        message: message,
      })
    );
    setMessage("");
  };

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
          disabled={!isConnectionOpened(friendsList) || !message}
          onClick={sendMessageToPeers}
        >
          Send message
        </Button>
      </CardActions>
    </Card>
  );
};
