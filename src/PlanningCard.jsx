import { Card } from "@mui/material";

export const PlaningCard = ({
  value,
  index,
  totalNumber,
  selected,
  selectCard,
}) => {
  const middleNumber = totalNumber / 2;

  return (
    <Card
      sx={{
        display: "flex",
        width: "40px",
        height: "65px",
        lineHeight: "65px",
        fontFamily: "Verdana",
        fontSize: "25px",
        fontWeight: "bold",
        marginRight: "-5px",
        justifyContent: "center",
        alignContent: "center",
        backgroundColor: "orange",
        color: "indigo",
        border: "solid 4px",
        borderColor: selected ? "indigo" : "orange",
        cursor: "pointer",
        transform: `rotateZ(${
          15 * (index - middleNumber + 0.5)
        }deg)  translateY(${Math.pow(index - middleNumber + 0.5, 2) * 5}px)`,
        "&:hover": {
          zIndex: 100,
        },
      }}
      onClick={selectCard}
    >
      {value}
    </Card>
  );
};
