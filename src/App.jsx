import { useState } from "react";

import { getRandomId } from "./tools";
import { MainPage } from "./MainPage";

const App = () => {
  const [myPeerId, setMyPeerId] = useState(getRandomId());
  const [peerManager, setPeerManager] = useState(null);
  const [friendsList, setFriendsList] = useState({});

  return (
    <MainPage
      friendsList={friendsList}
      setFriendsList={setFriendsList}
      peerManager={peerManager}
      setPeerManager={setPeerManager}
      myPeerId={myPeerId}
      setMyPeerId={setMyPeerId}
    />
  );
};

export default App;
