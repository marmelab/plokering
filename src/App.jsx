import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { Peer } from "peerjs";

import CONFIG from "./config";
import { PlaningCards } from "./PlanningCards";

function App() {
  const [peer, setPeer] = useState(null);
  const [connection, setConnection] = useState(null);
  const [peerId, setPeerId] = useState("choose my id");
  const [peerName, setPeerName] = useState("choose my name");
  const [friendId, setFriendId] = useState("my friend id");
  const [friendName, setFriendName] = useState("my friend name");
  const [newMessage, setNewMessage] = useState("");
  const [card, setCard] = useState(null);
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

  const receiveData = ({ name, message, card }) => {
    console.log("Message received", message || card);
    setFriendName(name);
    if (message) {
      addMessage(`${name} : ${message}`);
    }
    if (card) {
      addMessage(`${name} choose card ${card}`);
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
        receiveData(data);
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
      receiveData(data);
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
    addMessage(`I choose card ${card}`);
    connection.send({ name: peerName, card });
    setCard(null);
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
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <img src="/icon.svg" width="20%" />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Typography
            sx={{ fontSize: 30, fontWeight: "bold", paddingBottom: "15px" }}
            color="text.primary"
            gutterBottom
          >
            Plockering
          </Typography>
        </Box>
        <Box>
          <Card elevation={4} sx={{ marginBottom: "20px" }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 20, fontWeight: "bold", paddingBottom: "15px" }}
                color="text.primary"
                gutterBottom
              >
                Connection
              </Typography>
              <TextField
                sx={{ marginBottom: "15px" }}
                label="My Id"
                value={peerId}
                onChange={handlePeerId}
              />
              <TextField
                label="My nickname"
                value={peerName}
                onChange={handlePeerName}
              />
            </CardContent>
            <CardActions sx={{ justifyContent: "space-between" }}>
              <Button size="small" disabled={!!peer} onClick={register}>
                Register to server
              </Button>
              <Button size="small" disabled={!peer} onClick={unRegister}>
                Unregister
              </Button>
            </CardActions>
          </Card>

          <Card elevation={4} sx={{ marginBottom: "20px" }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 20, fontWeight: "bold", paddingBottom: "15px" }}
                color="text.primary"
                gutterBottom
              >
                Add peer
              </Typography>
              <TextField
                sx={{ marginBottom: "15px" }}
                label="Friend Id"
                value={friendId}
                onChange={handleFriendId}
              />
              <TextField label="Friend nickname" value={friendName} disabled />
            </CardContent>
            <CardActions>
              <Button
                size="small"
                disabled={!peer || !!connection}
                onClick={connectToPeer}
              >
                Connect to peer
              </Button>
            </CardActions>
          </Card>
        </Box>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", width: "58%" }}>
        Messages:
        <br />
        <Box component="p" sx={{ whiteSpace: "pre-line" }}>
          {messages}
        </Box>
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
        <Card elevation={4} sx={{ marginBottom: "20px" }}>
          <CardContent>
            <Typography
              sx={{ fontSize: 20, fontWeight: "bold", paddingBottom: "15px" }}
              color="text.primary"
              gutterBottom
            >
              Message
            </Typography>
            <TextField
              label="My message"
              value={newMessage}
              onChange={handleNewMessage}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  return sendMessageToPeers();
                }
              }}
              fullWidth
            />
          </CardContent>
          <CardActions>
            <Button
              size="small"
              disabled={!connection}
              onClick={sendMessageToPeers}
            >
              Send message
            </Button>
          </CardActions>
        </Card>

        <Card elevation={4} sx={{ marginBottom: "20px" }}>
          <CardContent>
            <Typography
              sx={{ fontSize: 20, fontWeight: "bold", paddingBottom: "15px" }}
              color="text.primary"
              gutterBottom
            >
              Planing poker
            </Typography>
            <PlaningCards card={card} setCard={setCard} />
          </CardContent>
          <CardActions>
            <Button
              size="small"
              disabled={!connection || card === null}
              onClick={sendCardToPeers}
            >
              Chose card
            </Button>
          </CardActions>
        </Card>
      </Box>
    </Box>
  );
}

export default App;
