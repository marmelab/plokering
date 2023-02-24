import { Box } from "@mui/material";

import {
  MY_COLOR,
  MY_BACK_COLOR,
  FRIEND_COLOR,
  FRIEND_BACK_COLOR,
} from "../constants";

export const NameChip = ({ isMe, name, id }) => (
  <Box
    sx={{
      display: "inline-flex",
      textAlign: "center",
      justifyContent: "center",
      fontWeight: "bold",
      overflowAnchor: "none",
      backgroundColor: isMe ? MY_BACK_COLOR : FRIEND_BACK_COLOR,
      color: isMe ? MY_COLOR : FRIEND_COLOR,
      borderRadius: "4px",
      border: "solid 4px",
      borderColor: isMe ? MY_BACK_COLOR : FRIEND_BACK_COLOR,
      marginBottom: "2px",
    }}
    title={id}
  >
    {name}
  </Box>
);
