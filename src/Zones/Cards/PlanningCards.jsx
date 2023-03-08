import { Box } from "@mui/material";

import { PlanningCard } from "./PlanningCard";

export const PlanningCards = ({ card, setCard, cardsSet }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: "15px",
      }}
    >
      {cardsSet.map((item, index) => (
        <PlanningCard
          isMe
          key={index}
          value={item}
          index={index}
          totalNumber={cardsSet.length}
          selected={card === item}
          selectCard={() => setCard(item)}
        />
      ))}
    </Box>
  );
};
