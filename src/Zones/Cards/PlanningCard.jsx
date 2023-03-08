import { Box, Card, useMediaQuery } from "@mui/material";

import {
  MY_COLOR,
  MY_BACK_COLOR,
  FRIEND_COLOR,
  FRIEND_BACK_COLOR,
  MEDIAQUERY_MOBILE_GAP,
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
  const desktopDisplay = useMediaQuery(MEDIAQUERY_MOBILE_GAP);
  const middleNumber = totalNumber / 2;

  return (
    <Card
      sx={{
        ...sx,
        display: "flex",
        width: bigCard ? (desktopDisplay ? "120px" : "70px") : "40px",
        minWidth: bigCard ? (desktopDisplay ? "120px" : "70px") : "40px",
        lineHeight: bigCard ? (desktopDisplay ? "195px" : "110px") : "65px",
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
        borderColor: selected ? MY_COLOR : "white",
        boxShadow: "5px 5px 5px grey",
        cursor: selectCard ? "pointer" : "inherit",
        transform: `rotateZ(${
          11 * (index - middleNumber + 0.5)
        }deg)  translateY(${
          Math.pow(index - middleNumber + 0.5, 2) * (bigCard ? 12 : 4)
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
          sx={{
            position: "absolute",
            fontSize: "15px",
            top: desktopDisplay ? "-97.5px" : "-58px",
          }}
        >
          {isMe ? "Me" : playerName}
        </Box>
      )}
    </Card>
  );
};
