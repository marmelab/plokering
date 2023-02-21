import { Box } from "@mui/material";

export const MainZone = ({ chosenCards, messages }) => {
  return (
    <>
      Cards:
      <br />
      {areAllCardsChosen(2, chosenCards)
        ? JSON.stringify(chosenCards)
        : "Waiting"}
      <br />
      <br />
      Messages:
      <br />
      <Box component="p" sx={{ whiteSpace: "pre-line" }}>
        {messages}
      </Box>
    </>
  );
};

const areAllCardsChosen = (playersNumber, chosenCards) => {
  const players = Object.keys(chosenCards);
  if (
    players.length === playersNumber &&
    !players.find((player) => {
      chosenCards[player] === null || chosenCards[player] === undefined;
    })
  ) {
    return true;
  }
  return false;
};
