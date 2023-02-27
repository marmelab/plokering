import { useEffect, useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Peer } from "peerjs";

import { ADMIN_CODE, ID_PREFIX, MEDIAQUERY_MOBILE_GAP } from "./constants";
import CONFIG from "./config";
import { getRandomNickname, isRegistered, isConnectionOpened } from "./tools";
import { AddPeerZone } from "./Zones/AddPeerZone";
import { ChooseCardZone } from "./Zones/ChooseCardZone";
import { ConnectionZone } from "./Zones/ConnectionZone";
import { LogoZone } from "./Zones/LogoZone";
import { MainZone } from "./Zones/MainZone";
import { SendMessageZone } from "./Zones/SendMessageZone";

export const MainPage = ({
  friendsList,
  setFriendsList,
  peerManager,
  setPeerManager,
  myPeerId,
  setMyPeerId,
}) => {
  const multiColumnDisplay = useMediaQuery(MEDIAQUERY_MOBILE_GAP);
  const [myName, setMyName] = useState(getRandomNickname());
  const [chosenCards, setChosenCards] = useState({});
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (friendsList && Object.keys(friendsList).length) {
      transmitNewConnections(friendsList);
    }
  }, [Object.keys(friendsList).length]);

  const addFriend = (connection) => {
    setFriendsList((previous) => {
      const updatedFriendsList = {
        ...previous,
        [connection.peer]: { name: `[${connection.peer}]`, connection },
      };
      return updatedFriendsList;
    });
  };

  const removeFriend = (connection) => {
    connection.close();
    setFriendsList((previous) => {
      const updatedFriendsList = {
        ...previous,
      };

      delete updatedFriendsList[connection.peer];
      return updatedFriendsList;
    });
  };

  const addMessage = (message) => {
    setMessages((previousMessages) => [...previousMessages, message]);
  };

  const chooseCard = (cardValue) => {
    Object.keys(friendsList).map((friendId) =>
      friendsList[friendId].connection.send({ name: myName, card: cardValue })
    );
    setChosenCards((previous) => ({
      ...previous,
      [`${ID_PREFIX}_${myPeerId}`]: { card: cardValue, name: myName },
    }));
  };

  const resetCards = () => {
    Object.keys(friendsList).map((friendId) =>
      friendsList[friendId].connection.send({ name: myName, resetCards: true })
    );
    setChosenCards({});
  };

  const handlePeerId = (event) => {
    setMyPeerId(event.target.value);
  };

  const handlePeerName = (event) => {
    setMyName(event.target.value);
  };

  const updateFriendName = (name, friendId) => {
    //if (friendsList[friendId].name !== name) {
    setFriendsList((previous) => ({
      ...previous,
      [friendId]: { ...previous[friendId], name },
    }));
    //}
  };

  const connectionMessage = (conn) => {
    console.log(`Connection with [${conn.peer}]`);
    addMessage({
      author: { name: ADMIN_CODE, id: ADMIN_CODE },
      text: `Connection with [${conn.peer}]`,
    });
    conn.send({ name: myName, message: `Hello, I'm new here` });
  };

  const deconnectionMessage = (conn) => {
    console.log(`Deconnection from [${conn.peer}]`);
    addMessage({
      author: { name: ADMIN_CODE, id: ADMIN_CODE },
      text: `Connection closed for: [${conn.peer}]`,
    });
  };

  const receiveData = (
    connection,
    { name, message, card, resetCards, newFriends }
  ) => {
    updateFriendName(name, connection.peer);
    if (message) {
      addMessage({ author: { name, id: connection.peer }, text: message });
    }
    if (card !== null && card !== undefined) {
      setChosenCards((previous) => ({
        ...previous,
        [connection.peer]: { card, name },
      }));
    }
    if (resetCards) {
      setChosenCards({});
    }
    if (newFriends && newFriends.length) {
      newFriends.map((newFriend) => {
        if (!friendsList[newFriend]) {
          connectToPeer(newFriend)();
        }
      });
    }
  };

  const register = () => {
    const peerManager = new Peer(
      `${ID_PREFIX}_${myPeerId}`,
      CONFIG.peerJsServer
    );
    setPeerManager(peerManager);
    peerManager.on("open", (id) => {
      console.log("Registered");
      addMessage({
        author: { name: ADMIN_CODE, id: ADMIN_CODE },
        text: `Registered, my peer ID is: [${id}]`,
      });
    });

    peerManager.on("connection", (conn) => {
      console.log("Connection received");

      conn.on("data", (data) => {
        receiveData(conn, data);
      });

      conn.on("open", () => {
        addFriend(conn);
        connectionMessage(conn);
      });

      conn.on("close", () => {
        deconnectionMessage(conn);
        removeFriend(conn);
      });
    });

    peerManager.on("error", (error) => {
      if (!peerManager?.open) {
        setPeerManager(null);
        setFriendsList({});
      }
      console.error(error);
      addMessage({
        author: { name: ADMIN_CODE, id: ADMIN_CODE },
        text: `Error : ${error.message}`,
      });
    });
  };

  const connectToPeer = (friendId) => () => {
    if (peerManager) {
      let conn = peerManager.connect(friendId);

      conn.on("data", (data) => {
        receiveData(conn, data);
      });

      conn.on("open", () => {
        addFriend(conn);
        connectionMessage(conn);
      });

      conn.on("close", () => {
        deconnectionMessage(conn);
        removeFriend(conn);
      });
    }
  };

  const unRegister = () => {
    if (peerManager) {
      peerManager.disconnect();
      peerManager.destroy();
      setPeerManager(null);
      setFriendsList({});
      setChosenCards({});
      console.log("Unregistered");
      addMessage({
        author: { name: ADMIN_CODE, id: ADMIN_CODE },
        text: `Unregistered, all connections closed`,
      });
    }
  };

  const transmitNewConnections = (friendsList) => {
    Object.keys(friendsList).map((friendId) => {
      const newFriendsList = Object.keys(friendsList).filter(
        (key) => key !== friendId
      );

      if (newFriendsList.length) {
        friendsList[friendId].connection.send({
          name: myName,
          newFriends: newFriendsList,
        });
      }
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: multiColumnDisplay ? "row" : "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignContent: "center",
          width: multiColumnDisplay ? "20%" : "100%",
        }}
      >
        {multiColumnDisplay && <LogoZone />}
        <Box>
          <ConnectionZone
            peerId={myPeerId}
            peerName={myName}
            handlePeerId={handlePeerId}
            handlePeerName={handlePeerName}
            peerManager={peerManager}
            register={register}
            unRegister={unRegister}
          />

          <AddPeerZone
            friendsList={friendsList}
            peerManager={peerManager}
            connectToPeer={connectToPeer}
          />
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: multiColumnDisplay ? "58%" : "100%",
        }}
      >
        <MainZone
          registeringOk={isRegistered(peerManager)}
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
          width: multiColumnDisplay ? "20%" : "100%",
        }}
      >
        <SendMessageZone
          myName={myName}
          myId={`${ID_PREFIX}_${myPeerId}`}
          friendsList={friendsList}
          addMessage={addMessage}
          messages={messages}
        />

        <ChooseCardZone
          friendsList={friendsList}
          chooseCard={chooseCard}
          myPeerId={myPeerId}
          chosenCards={chosenCards}
        />
      </Box>
    </Box>
  );
};
