import { Box, Typography } from "@mui/material";

import {
  ADMIN_CODE,
  SELF_CODE,
  MY_COLOR,
  MY_BACK_COLOR,
  FRIEND_COLOR,
  FRIEND_BACK_COLOR,
} from "./constants";

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
      <Typography
        sx={{
          fontWeight: "bold",
          paddingTop: "50px",
        }}
        color="text.primary"
        gutterBottom
      >
        Messages:
      </Typography>
      <Box
        sx={{
          maxHeight: "255px",
          maxWidth: "500px",
          overflowY: "auto",
          padding: "0 10px",
        }}
      >
        {messages.map((message, index) => {
          return (
            <Message
              key={index}
              author={message.author}
              message={message.text}
              isAdmin={message.author === ADMIN_CODE}
              isMe={message.author === SELF_CODE}
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
      {!isAdmin && (
        <Box
          sx={{
            display: "inline-flex",
            fontWeight: "bold",
            overflowAnchor: "none",
            backgroundColor: isMe ? MY_BACK_COLOR : FRIEND_BACK_COLOR,
            color: isMe ? MY_COLOR : FRIEND_COLOR,
            borderRadius: "4px",
            border: "solid 4px",
            borderColor: isMe ? MY_BACK_COLOR : FRIEND_BACK_COLOR,
          }}
        >
          {author}
        </Box>
      )}
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
