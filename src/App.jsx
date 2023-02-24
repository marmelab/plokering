import { useState } from "react";

import { getRandomId } from "./getIdentity";
import { MainPage } from "./MainPage";

const App = () => {
  const [myPeerId, setMyPeerId] = useState(getRandomId());
  const [peer, setPeer] = useState(null);
  const [friendsList, setFriendsList] = useState({});

  return (
    <MainPage
      friendsList={friendsList}
      setFriendsList={setFriendsList}
      peer={peer}
      setPeer={setPeer}
      myPeerId={myPeerId}
      setMyPeerId={setMyPeerId}
    />
  );
};

export default App;
