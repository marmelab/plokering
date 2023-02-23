import { Button, CardActions, CardContent } from "@mui/material";

import { Card } from "./uiComponents/Card";
import { CardTitle } from "./uiComponents/CardTitle";
import { PlanningCards } from "./PlanningCards";

export const ChooseCardZone = ({
  card,
  setCard,
  connectionOk,
  sendCardToPeers,
}) => {
  return (
    <Card>
      <CardContent>
        <CardTitle>Planing poker</CardTitle>
        <PlanningCards card={card} setCard={setCard} />
      </CardContent>
      <CardActions>
        <Button
          size="small"
          disabled={!connectionOk || card === null}
          onClick={sendCardToPeers}
        >
          Chose this card
        </Button>
      </CardActions>
    </Card>
  );
};
