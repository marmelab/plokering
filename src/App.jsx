import { useState } from "react";

import { getRandomId } from "./tools";
import { MainPage } from "./MainPage";

const App = () => {
  const [myPeerId, setMyPeerId] = useState(getRandomId());
  const [peerManager, setPeerManager] = useState(null);
  const [friendsList, setFriendsList] = useState({});
  const [cardsSet, setCardsSet] = useState([0, 0.5, 1, 2, 3, 5, 7, 12]);

  return (
    <MainPage
      friendsList={friendsList}
      setFriendsList={setFriendsList}
      peerManager={peerManager}
      setPeerManager={setPeerManager}
      myPeerId={myPeerId}
      setMyPeerId={setMyPeerId}
      cardsSet={cardsSet}
      setCardsSet={setCardsSet}
    />
  );
};

export default App;
