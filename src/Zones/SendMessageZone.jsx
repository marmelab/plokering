import { Box, IconButton, TextField, useMediaQuery } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";

import { MEDIAQUERY_MOBILE_GAP, SELF_CODE } from "../constants";
import { isConnectionOpened } from "../tools";
import { MobileCard } from "../uiComponents/Card";
import { MessagesList } from "./MessagesList";

export const SendMessageZone = ({
  myName,
  myId,
  friendsList,
  addMessage,
  messages,
}) => {
  const visibleDefault = useMediaQuery(MEDIAQUERY_MOBILE_GAP);
  const [message, setMessage] = useState("");

  const handleMessage = (event) => {
    setMessage(event.target.value);
  };

  const sendMessageToPeers = () => {
    console.log("Send a message to peer");
    addMessage({ author: { name: SELF_CODE, id: myId }, text: message });
    Object.keys(friendsList).map((friendId) =>
      friendsList[friendId].connection.send({
        name: myName,
        message: message,
      })
    );
    setMessage("");
  };

  return (
    <MobileCard
      title="Chat"
      shouldBeHidden={!visibleDefault}
      content={
        <>
          <MessagesList messages={messages} />
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
        </>
      }
    />
  );
};
