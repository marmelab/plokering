import { Box, CardContent, IconButton, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";

import { SELF_CODE } from "./constants";
import { isConnectionOpened } from "./isConnectionOpened";
import { Card } from "./uiComponents/Card";
import { CardTitle } from "./uiComponents/CardTitle";
import { MessagesZone } from "./MessagesZone";

export const SendMessageZone = ({
  myName,
  friendsList,
  addMessage,
  messages,
}) => {
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
        <CardTitle>Chat here</CardTitle>
        <MessagesZone messages={messages} />
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <TextField
            label="My message"
            value={message}
            disabled={!isConnectionOpened(friendsList)}
            onChange={handleMessage}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                return sendMessageToPeers();
              }
            }}
            fullWidth
          />
          <IconButton
            size="small"
            disabled={!isConnectionOpened(friendsList) || !message}
            onClick={sendMessageToPeers}
            title="Send message"
          >
            <SendIcon />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};
