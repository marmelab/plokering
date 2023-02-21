import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";

import { PlaningCards } from "./PlanningCards";

export const ChooseCardZone = ({
  card,
  setCard,
  connection,
  sendCardToPeers,
}) => {
  return (
    <Card elevation={4} sx={{ marginBottom: "20px" }}>
      <CardContent>
        <Typography
          sx={{ fontSize: 20, fontWeight: "bold", paddingBottom: "15px" }}
          color="text.primary"
          gutterBottom
        >
          Planing poker
        </Typography>
        <PlaningCards card={card} setCard={setCard} />
      </CardContent>
      <CardActions>
        <Button
          size="small"
          disabled={!connection || card === null}
          onClick={sendCardToPeers}
        >
          Chose this card
        </Button>
      </CardActions>
    </Card>
  );
};
