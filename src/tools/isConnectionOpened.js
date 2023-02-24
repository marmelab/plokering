export const isConnectionOpened = (friendsList) => {
  if (!friendsList || !Object.keys(friendsList).length) {
    return false;
  }
  return true;
};
