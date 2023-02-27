import { Box, Card } from "@mui/material";

import {
  MY_COLOR,
  MY_BACK_COLOR,
  FRIEND_COLOR,
  FRIEND_BACK_COLOR,
} from "../../constants";

export const PlanningCard = ({
  value,
  index,
  isMe,
  playerName,
  totalNumber,
  selected,
  selectCard,
  bigCard,
  sx,
}) => {
  const middleNumber = totalNumber / 2;

  return (
    <Card
      sx={{
        ...sx,
        display: "flex",
        width: bigCard ? "120px" : "40px",
        minWidth: bigCard ? "120px" : "40px",
        //height: bigCard ? "195px" : "65px",
        lineHeight: bigCard ? "195px" : "65px",
        fontFamily: "Verdana",
        fontSize: bigCard ? "75px" : "25px",
        fontWeight: "bold",
        marginRight: "-5px",
        justifyContent: "center",
        alignContent: "center",
        aspectRatio: "2 / 3",
        backgroundColor: isMe ? MY_BACK_COLOR : FRIEND_BACK_COLOR,
        color: isMe ? MY_COLOR : FRIEND_COLOR,
        border: "solid 4px",
        borderColor: selected
          ? MY_COLOR
          : isMe
          ? MY_BACK_COLOR
          : FRIEND_BACK_COLOR,
        cursor: selectCard ? "pointer" : "inherit",
        transform: `rotateZ(${
          15 * (index - middleNumber + 0.5)
        }deg)  translateY(${
          Math.pow(index - middleNumber + 0.5, 2) * (bigCard ? 15 : 5)
        }px)`,
        "&:hover": {
          zIndex: 100,
        },
      }}
      onClick={selectCard || null}
    >
      {value}
      {bigCard && playerName && (
        <Box
          component="p"
          sx={{ position: "absolute", fontSize: "15px", top: "-97.5px" }}
        >
          {isMe ? "Me" : playerName}
        </Box>
      )}
    </Card>
  );
};
