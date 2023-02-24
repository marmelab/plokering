import { Button, CardActions, CardContent } from "@mui/material";
import { useState } from "react";

import { ID_PREFIX } from "./constants";
import { isMyCardChosen } from "./isMyCardChosen";
import { isConnectionOpened } from "./isConnectionOpened";
import { Card } from "./uiComponents/Card";
import { CardTitle } from "./uiComponents/CardTitle";
import { PlanningCards } from "./PlanningCards";

export const ChooseCardZone = ({
  friendsList,
  chooseCard,
  myPeerId,
  chosenCards,
}) => {
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
          disabled={
            !isConnectionOpened(friendsList) ||
            isMyCardChosen(`${ID_PREFIX}_${myPeerId}`, chosenCards) ||
            cardValue === null
          }
          onClick={sendCardToPeers}
        >
          Chose this card
        </Button>
      </CardActions>
    </Card>
  );
};
