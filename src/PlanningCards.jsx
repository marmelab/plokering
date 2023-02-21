import { Box } from "@mui/material";

import { PlaningCard } from "./PlanningCard";

export const PlaningCards = ({ card, setCard }) => {
  const values = [0, 0.5, 1, 2, 3, 5];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: "15px",
      }}
    >
      {values.map((item, index) => (
        <PlaningCard
          key={index}
          value={item}
          index={index}
          totalNumber={values.length}
          selected={card === item}
          selectCard={() => setCard(item)}
        />
      ))}
    </Box>
  );
};
