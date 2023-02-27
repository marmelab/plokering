import { Button } from "@mui/material";
import { useState } from "react";

import { ID_PREFIX } from "../constants";
import { isMyCardChosen, isConnectionOpened } from "../tools";
import { MobileCard } from "../uiComponents/Card";
import { PlanningCards } from "./Cards/PlanningCards";

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
    <MobileCard
      title="Planing poker"
      subtitle={`Choosen : ${cardValue || "none"}`}
      content={<PlanningCards card={cardValue} setCard={setCardValue} />}
      actions={
        <Button
          size="small"
          disabled={
            !isConnectionOpened(friendsList) ||
            isMyCardChosen(`${ID_PREFIX}_${myPeerId}`, chosenCards) ||
            cardValue === null
          }
          onClick={sendCardToPeers}
        >
          Choose this card
        </Button>
      }
    />
  );
};
