import { useState } from "react";
import { Box } from "@mui/material";
import { Peer } from "peerjs";

import { ADMIN_CODE, ID_PREFIX } from "./constants";
import CONFIG from "./config";
import { getRandomId, getRandomNickname } from "./getIdentity";
import { isConnectionOpened } from "./isConnectionOpened";
import { AddPeerZone } from "./AddPeerZone";
import { ChooseCardZone } from "./ChooseCardZone";
import { ConnectionZone } from "./ConnectionZone";
import { LogoZone } from "./LogoZone";
import { MainZone } from "./MainZone";
import { SendMessageZone } from "./SendMessageZone";

const App = () => {
  const [peer, setPeer] = useState(null);
  const [myPeerId, setMyPeerId] = useState(getRandomId());
  const [myName, setMyName] = useState(getRandomNickname());
  const [chosenCards, setChosenCards] = useState({});
  const [messages, setMessages] = useState([]);

  const [friendsList, setFriendsList] = useState({});

  const addMessage = (message) => {
    setMessages((previousMessages) => [...previousMessages, message]);
  };

  const chooseCard = (cardValue) => {
    setChosenCards((previous) => ({
      ...previous,
      [`${ID_PREFIX}_${myPeerId}`]: { card: cardValue, name: myName },
    }));
  };

  const resetCards = () => {
    setChosenCards({});
  };

  const handlePeerId = (event) => {
    setMyPeerId(event.target.value);
  };

  const handlePeerName = (event) => {
    setMyName(event.target.value);
  };

  const updateFriendName = (name, friendId) => {
    setFriendsList((previous) => ({
      ...previous,
      [friendId]: { ...previous[friendId], name },
    }));
  };

  const connectionMessage = (conn) => {
    console.log(`Connection with [${conn.peer}]`);
    addMessage({ author: ADMIN_CODE, text: `Connection with [${conn.peer}]` });
    conn.send({ name: myName, message: `Hello, I'm new here` });
  };

  const receiveData = (connection, { name, message, card }) => {
    updateFriendName(name, connection.peer);
    if (message) {
      addMessage({ author: name, text: message });
    }
    if (card !== null && card !== undefined) {
      setChosenCards((previous) => ({
        ...previous,
        [connection.peer]: { card, name },
      }));
    }
  };

  const register = () => {
    const peer = new Peer(`${ID_PREFIX}_${myPeerId}`, CONFIG.peerJsServer);
    setPeer(peer);
    peer.on("open", (id) => {
      console.log("Registered");
      addMessage({
        author: ADMIN_CODE,
        text: `Registered, my peer ID is: [${id}]`,
      });
    });

    peer.on("connection", (conn) => {
      console.log("Connection");
      setFriendsList((previous) => ({
        ...previous,
        [conn.peer]: { name: "**new**", connection: conn },
      }));

      conn.on("data", (data) => {
        receiveData(conn, data);
      });

      conn.on("open", () => {
        connectionMessage(conn);
      });
    });

    peer.on("error", (error) => {
      if (!peer?.open) {
        setPeer(null);
        setFriendsList({});
      }
      console.error(error);
      addMessage({ author: ADMIN_CODE, text: `Error : ${error.message}` });
    });
  };

  const connectToPeer = (friendId) => () => {
    let conn = peer.connect(friendId);

    conn.on("data", (data) => {
      receiveData(conn, data);
    });

    conn.on("open", () => {
      setFriendsList((previous) => ({
        ...previous,
        [conn.peer]: { name: `[${conn.peer}]`, connection: conn },
      }));
      connectionMessage(conn);
    });
  };

  const unRegister = () => {
    if (peer) {
      peer.disconnect();
      peer.destroy();
      setPeer(null);
      setFriendsList({});
      console.log("Unregistered");
      addMessage({
        author: ADMIN_CODE,
        text: `Unregistered, all connections closed`,
      });
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "row" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignContent: "center",
          width: "20%",
        }}
      >
        <LogoZone />
        <Box>
          <ConnectionZone
            peerId={myPeerId}
            peerName={myName}
            handlePeerId={handlePeerId}
            handlePeerName={handlePeerName}
            peer={peer}
            register={register}
            unRegister={unRegister}
          />

          <AddPeerZone
            friendsList={friendsList}
            peer={peer}
            connectToPeer={connectToPeer}
          />
        </Box>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", width: "58%" }}>
        <MainZone
          connectionOk={isConnectionOpened(friendsList)}
          friendsList={friendsList}
          messages={messages}
          chosenCards={chosenCards}
          peerId={`${ID_PREFIX}_${myPeerId}`}
          resetCards={resetCards}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignContent: "center",
          width: "20%",
        }}
      >
        <SendMessageZone
          myName={myName}
          friendsList={friendsList}
          addMessage={addMessage}
        />

        <ChooseCardZone
          myName={myName}
          friendsList={friendsList}
          chooseCard={chooseCard}
        />
      </Box>
    </Box>
  );
};

export default App;
