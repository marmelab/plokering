import { useState } from 'react';
import { Box, Button, Card, CardActions, CardContent, TextField, Typography} from '@mui/material'
import { Peer } from "peerjs";
import CONFIG from './config';

function App() {
    const [peer, setPeer] = useState(null);
    const [connection, setConnection] = useState(null);
    const [peerId, setPeerId] = useState('choose my id');
    const [peerName, setPeerName] = useState('choose my name');
    const [friendId, setFriendId] = useState('my friend id');
    const [friendName, setFriendName] = useState('my friend name');
    const [newMessage, setNewMessage] = useState('');
    const [card, setCard] = useState(null);
    const [messages, setMessages] = useState('');

    const addMessage = (data) => {
        setMessages(previous => previous + '\n\r' + data)
    }

    const handlePeerId = (event) => {
        setPeerId(event.target.value);
    }

    const handlePeerName = (event) => {
        setPeerName(event.target.value);
    }

    const handleFriendId = (event) => {
        setFriendId(event.target.value);
    }

    const handleNewMessage = (event) => {
        setNewMessage(event.target.value);
    }

    const connectionMessage = (conn) => {
        console.log(`Connection with ${conn.peer}`);
        addMessage(`Connection with ${conn.peer}`);
        conn.send({name: peerName, message: `Hello, I'm new here`});
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
        peer.on('open', (id) => {
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

        peer.on('error', (error) => {
            if(!peer?.open){
                setPeer(null);
                setConnection(null);
            }
            console.error(error);
            addMessage(`Error : ${error.message}`);
        });
    }

    const connectToPeer = () => {
        let conn = peer.connect(friendId);
        setConnection(conn);

        conn.on("data", (data) => {
            receiveData(data);
        });

        conn.on("open", () => {
            connectionMessage(conn);
        });
    }

    const unRegister = () => {
        if (peer) {
            peer.disconnect();
            peer.destroy();
            setPeer(null);
            setConnection(null);
            console.log("Unregistered");
            addMessage(`Unregistered, all connections closed`);
        }
    }

    const sendMessageToPeers = () => {
        console.log("Send a message to peer");
        addMessage(`Me : ${newMessage}`);
        connection.send({name: peerName, message: newMessage});
        setNewMessage('');
    }

    const sendCardToPeers = () => {
        console.log("Send a message to peer");
        addMessage(`I choose card ${card}`);
        connection.send({name: peerName, card});
        setCard(null);
    }

    return (
        <Box sx={{display:"flex", flexDirection:"row" }}>
            <Box sx={{display:"flex", flexDirection:"column", justifyContent:"center", alignContent: "center", maxWidth: "30%"}}>
                <Box sx={{display:"flex",justifyContent:"center"}}>
                    <img src="/icon.svg" width="20%" />
                </Box>
                <Box sx={{display:"flex",justifyContent:"center"}}>
                    <Typography sx={{ fontSize: 30, fontWeight: "bold", paddingBottom: "15px" }} color="text.primary" gutterBottom>
                        Plockering
                    </Typography>
                </Box>
                <Box>
                    <Card elevation={4} sx={{marginBottom: "20px"}}>
                        <CardContent>
                            <Typography sx={{ fontSize: 20, fontWeight: "bold", paddingBottom: "15px" }} color="text.primary" gutterBottom>
                                Connection
                            </Typography>
                            <TextField label="My Id" value={peerId} onChange={handlePeerId}/>
                            <TextField label="My nickname" value={peerName} onChange={handlePeerName}/>
                        </CardContent>
                        <CardActions sx={{justifyContent:"space-between"}}>
                            <Button size="small" disabled={!!peer} onClick={register}>Register to server</Button>
                            <Button size="small" disabled={!peer} onClick={unRegister}>Unregister</Button>
                        </CardActions>
                    </Card>

                    <Card elevation={4} sx={{marginBottom: "20px"}}>
                        <CardContent>
                            <Typography sx={{ fontSize: 20, fontWeight: "bold", paddingBottom: "15px" }} color="text.primary" gutterBottom>
                                Add peer
                            </Typography>
                            <TextField label="Friend Id" value={friendId} onChange={handleFriendId}/>
                            <TextField label="Friend nickname" value={friendName} disabled/>
                        </CardContent>
                        <CardActions>
                            <Button size="small" disabled={!peer || !!connection} onClick={connectToPeer}>Connect to peer</Button>
                        </CardActions>
                    </Card>

                    <Card elevation={4} sx={{marginBottom: "20px"}}>
                        <CardContent>
                            <Typography sx={{ fontSize: 20, fontWeight: "bold", paddingBottom: "15px" }} color="text.primary" gutterBottom>
                                Message
                            </Typography>
                            <TextField label="My message" value={newMessage} onChange={handleNewMessage} onKeyDown={(event) => { if (event .key === 'Enter') { event.preventDefault(); return sendMessageToPeers(); } }} fullWidth/>
                        </CardContent>
                        <CardActions>
                            <Button size="small" disabled={!connection} onClick={sendMessageToPeers}>Send message</Button>
                        </CardActions>
                    </Card>

                    <Card elevation={4} sx={{marginBottom: "20px"}}>
                        <CardContent>
                            <Typography sx={{ fontSize: 20, fontWeight: "bold", paddingBottom: "15px" }} color="text.primary" gutterBottom>
                                Planing poker
                            </Typography>
                            <PlaningCards card={card} setCard={setCard} />
                        </CardContent>
                        <CardActions>
                            <Button size="small" disabled={!connection || card === null} onClick={sendCardToPeers}>Chose card</Button>
                        </CardActions>
                    </Card>
                </Box>
            </Box>
            <Box sx={{display:"flex", flexDirection:"column"}}>
                Messages:
                <br/>
                <Box component="p" sx={{whiteSpace: "pre-line"}}>
                    {messages}
                </Box>
            </Box>
        </Box>
    )
}

const PlaningCards = ({card, setCard}) => {
const values = [0,0.5,1,2,3,5];

    return (
        <Box sx={{display:"flex", flexDirection:"row"}}>
            {values.map((item, index) =>
                 <PlaningCard value={item} index={index} totalNumber={values.length} selected={card === item} selectCard={() => setCard(item)} />
            )}
        </Box>
    );
}

const PlaningCard = ({value, index, totalNumber, selected, selectCard}) => {
    const middleNumber = totalNumber/2;

    return (
        <Card
            sx={{
                    display:"flex",
                    width: "40px",
                    height: "65px",
                    lineHeight: "65px",
                    fontFamily: "Verdana",
                    fontSize: "25px",
                    fontWeight: "bold",
                    marginRight:"-5px",
                    justifyContent:"center",
                    alignContent:"center",
                    backgroundColor: "orange",
                    color: "indigo",
                    border: "solid 4px",
                    borderColor: selected ? "indigo" : "orange",
                    cursor: "pointer",
                    transform: `rotateZ(${15*(index - middleNumber + 0.5)}deg) translateY(${Math.abs(index - middleNumber + 0.5) * 4}px)`,
                    "& :hover": {
                        zIndex: 100,
                    }

            }}
            onClick={selectCard}
        >
            {value}
        </Card>
    );
}

export default App
