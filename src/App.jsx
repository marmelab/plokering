import { useState } from "react";
import { Box } from "@mui/material";
import { Peer } from "peerjs";

import { ADMIN_CODE, SELF_CODE, ID_PREFIX } from "./constants";
import CONFIG from "./config";
import { getRandomId, getRandomNickname } from "./getIdentity";
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
  const [newMessage, setNewMessage] = useState("");
  const [myCard, setMyCard] = useState(null);
  const [chosenCards, setChosenCards] = useState({});
  const [messages, setMessages] = useState([]);

  const [connection, setConnection] = useState(null);
  const [friendId, setFriendId] = useState(getRandomId());
  const [friendName, setFriendName] = useState("My friend name");

  const addMessage = (message) => {
    setMessages((previousMessages) => {
      return [...previousMessages, message];
    });
  };

  const handlePeerId = (event) => {
    setMyPeerId(event.target.value);
  };

  const handlePeerName = (event) => {
    setMyName(event.target.value);
  };

  const handleFriendId = (event) => {
    setFriendId(event.target.value);
  };

  const handleNewMessage = (event) => {
    setNewMessage(event.target.value);
  };

  const connectionMessage = (conn) => {
    console.log(`Connection with [${conn.peer}]`);
    addMessage({ author: ADMIN_CODE, text: `Connection with [${conn.peer}]` });
    conn.send({ name: myName, message: `Hello, I'm new here` });
  };

  const receiveData = (connection, { name, message, card }) => {
    //console.log("Message received", message || card);
    setFriendName(name);
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
      setConnection(conn);

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
        setConnection(null);
      }
      console.error(error);
      addMessage({ author: ADMIN_CODE, text: `Error : ${error.message}` });
    });
  };

  const connectToPeer = () => {
    let conn = peer.connect(`${ID_PREFIX}_${friendId}`);
    setConnection(conn);

    conn.on("data", (data) => {
      receiveData(conn, data);
    });

    conn.on("open", () => {
      connectionMessage(conn);
    });
  };

  const unRegister = () => {
    if (peer) {
      peer.disconnect();
      peer.destroy();
      setPeer(null);
      setConnection(null);
      console.log("Unregistered");
      addMessage({
        author: ADMIN_CODE,
        text: `Unregistered, all connections closed`,
      });
    }
  };

  const sendMessageToPeers = () => {
    console.log("Send a message to peer");
    addMessage({ author: SELF_CODE, text: newMessage });
    connection.send({ name: myName, message: newMessage });
    setNewMessage("");
  };

  const sendCardToPeers = () => {
    console.log("Send a message to peer");
    connection.send({ name: myName, card: myCard });
    setChosenCards((previous) => ({
      ...previous,
      [myPeerId]: { card: myCard, name: myName },
    }));
    setMyCard(null);
  };

  const resetCards = () => {
    setMyCard(null);
    setChosenCards({});
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
            friendId={friendId}
            friendName={friendName}
            handleFriendId={handleFriendId}
            peer={peer}
            connection={connection}
            connectToPeer={connectToPeer}
          />
        </Box>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", width: "58%" }}>
        <MainZone
          connection={connection}
          messages={messages}
          chosenCards={chosenCards}
          peerId={myPeerId}
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
          message={newMessage}
          handleMessage={handleNewMessage}
          connection={connection}
          sendMessageToPeers={sendMessageToPeers}
        />

        <ChooseCardZone
          card={myCard}
          setCard={setMyCard}
          connection={connection}
          sendCardToPeers={sendCardToPeers}
        />
      </Box>
    </Box>
  );
};

export default App;
