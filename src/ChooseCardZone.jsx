import { Button, CardActions, CardContent } from "@mui/material";
import { useState } from "react";

import { isConnectionOpened } from "./isConnectionOpened";
import { Card } from "./uiComponents/Card";
import { CardTitle } from "./uiComponents/CardTitle";
import { PlanningCards } from "./PlanningCards";

export const ChooseCardZone = ({ friendsList, chooseCard }) => {
  const [cardValue, setCardValue] = useState(null);

  const sendCardToPeers = () => {
    chooseCard(cardValue);
    setCardValue(null);
  };

  return (
    <Card>
      <CardContent>
        <CardTitle>Planing poker</CardTitle>
        <PlanningCards card={cardValue} setCard={setCardValue} />
      </CardContent>
      <CardActions>
        <Button
          size="small"
          disabled={!isConnectionOpened(friendsList) || cardValue === null}
          onClick={sendCardToPeers}
        >
          Chose this card
        </Button>
      </CardActions>
    </Card>
  );
};
