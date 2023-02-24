export const isRegistered = (peerManager) => {
  if (!peerManager || peerManager.disconnected || peerManager.destroyed) {
    return false;
  }
  return true;
};
