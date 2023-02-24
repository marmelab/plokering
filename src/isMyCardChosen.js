export const isMyCardChosen = (myPeerId, chosenCards) => {
  if (chosenCards[myPeerId] === null || chosenCards[myPeerId] === undefined) {
    return false;
  }
  return true;
};
