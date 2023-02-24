import { Box } from "@mui/material";

import { NameChip } from "./uiComponents/NameChip";
import { ADMIN_CODE, SELF_CODE } from "./constants";

export const MessagesZone = ({ messages }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <Box
        sx={{
          height: "255px",
          maxWidth: "500px",
          overflowY: "scroll",
          padding: "0 10px",
        }}
      >
        {messages.map((message, index) => {
          return (
            <Message
              key={index}
              author={message.author}
              message={message.text}
              isAdmin={message.author.id === ADMIN_CODE}
              isMe={message.author.name === SELF_CODE}
            />
          );
        })}
        <Box
          sx={{
            overflowAnchor: "auto",
            height: "1px",
          }}
          id="anchor"
        ></Box>
      </Box>
    </Box>
  );
};

const Message = ({ author, message, isAdmin, isMe }) => {
  return (
    <Box
      sx={{
        textAlign: isAdmin ? "center" : isMe ? "right" : "left",
        overflowAnchor: "none",
      }}
    >
      {!isAdmin && <NameChip isMe={isMe} name={author.name} id={author.id} />}
      <Box
        component="p"
        sx={{
          overflowAnchor: "none",
          whiteSpace: "pre-line",
        }}
      >
        {message}
      </Box>
    </Box>
  );
};
