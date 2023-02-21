import { useState } from "react";
import { Box } from "@mui/material";
import { Peer } from "peerjs";

import CONFIG from "./config";
import { AddPeerZone } from "./AddPeerZone";
import { ChooseCardZone } from "./ChooseCardZone";
import { ConnectionZone } from "./ConnectionZone";
import { LogoZone } from "./LogoZone";
import { MainZone } from "./MainZone";
import { SendMessageZone } from "./SendMessageZone";

function App() {
  const [peer, setPeer] = useState(null);
  const [connection, setConnection] = useState(null);
  const [peerId, setPeerId] = useState("choose_my_id");
  const [peerName, setPeerName] = useState("Michel");
  const [friendId, setFriendId] = useState("my_friend_id");
  const [friendName, setFriendName] = useState("my friend name");
  const [newMessage, setNewMessage] = useState("");
  const [myCard, setMyCard] = useState(null);
  const [chosenCards, setChosenCards] = useState({});
  const [messages, setMessages] = useState("");

  const addMessage = (data) => {
    setMessages((previous) => previous + "\n\r" + data);
  };

  const handlePeerId = (event) => {
    setPeerId(event.target.value);
  };

  const handlePeerName = (event) => {
    setPeerName(event.target.value);
  };

  const handleFriendId = (event) => {
    setFriendId(event.target.value);
  };

  const handleNewMessage = (event) => {
    setNewMessage(event.target.value);
  };

  const connectionMessage = (conn) => {
    console.log(`Connection with ${conn.peer}`);
    addMessage(`Connection with ${conn.peer}`);
    conn.send({ name: peerName, message: `Hello, I'm new here` });
  };

  const receiveData = (connection, { name, message, card }) => {
    //console.log("Message received", message || card);
    setFriendName(name);
    if (message) {
      addMessage(`${name} : ${message}`);
    }
    if (card !== null && card !== undefined) {
      console.log(chosenCards, connection.peer, card);
      setChosenCards((previous) => ({ ...previous, [connection.peer]: card }));
    }
  };

  const register = () => {
    const peer = new Peer(peerId, CONFIG.peerJsServer);
    setPeer(peer);
    peer.on("open", (id) => {
      console.log("Registered");
      addMessage(`Registered, my peer ID is: {${id}}`);
    });

    peer.on("connection", (conn) => {
      console.log("Connection");

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
      addMessage(`Error : ${error.message}`);
    });
  };

  const connectToPeer = () => {
    let conn = peer.connect(friendId);
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
      addMessage(`Unregistered, all connections closed`);
    }
  };

  const sendMessageToPeers = () => {
    console.log("Send a message to peer");
    addMessage(`Me : ${newMessage}`);
    connection.send({ name: peerName, message: newMessage });
    setNewMessage("");
  };

  const sendCardToPeers = () => {
    console.log("Send a message to peer");
    addMessage(`I choose card ${myCard}`);
    connection.send({ name: peerName, card: myCard });
    setChosenCards((previous) => ({
      ...previous,
      [peerId]: myCard,
    }));
    setMyCard(null);
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
            peerId={peerId}
            peerName={peerName}
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
        <MainZone messages={messages} chosenCards={chosenCards} />
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
}

export default App;
