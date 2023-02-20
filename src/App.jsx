import { useState } from 'react'
import { Box, Button, Card, CardActions, CardContent, TextField, Typography} from '@mui/material'
import { Peer } from "peerjs";
import CONFIG from './config';

function App() {
    const [peer, setPeer] = useState(null);
    const [connection, setConnection] = useState(null);
    const [peerId, setPeerId] = useState('peer id');
    const [peerName, setPeerName] = useState('peer name');
    const [friendId, setFriendId] = useState('my friend');
    const [newMessage, setNewMessage] = useState('');
    const [messages, setMessages] = useState('');
    const addMessage = (data) => {
        setMessages(messages + '\n\r' + data)
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

    const register = () => {
        const peer = new Peer(peerId, CONFIG.peerJsServer);
        setPeer(peer);
        peer.on('open', (id) => {
            console.log("Registered");
            addMessage(`Registered, my peer ID is: {${id}}`);
        });

        /*peer.on("connection", (conn) => {
            console.log("peer.on(connection)");

            conn.on("open", () => {
                console.log(`Connection with ${conn.peer}`);
                addMessage(`Connection with ${conn.peer}`);
                conn.send(`Hello, I'm ${peerId}`);
            });
        });*/

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
            console.log("Message received", data);
            addMessage(`${conn.peer} : ${data}`);
        });

        conn.on("open", () => {
            console.log(`Connection with ${conn.peer}`);
            addMessage(`Connection with ${conn.peer}`);
            conn.send(`Hello, I'm new here`);
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

    const sendToPeers = () => {
        console.log("Send a message to peer");
        addMessage(`Me : ${newMessage}`);
        connection.send(newMessage);
    }

    return (
        <Box sx={{display:"flex", flexDirection:"row" }}>
            <Box sx={{display:"flex", flexDirection:"column", justifyContent:"center", alignContent: "center", maxWidth: "30%"}}>
                <Box sx={{display:"flex",justifyContent:"center"}}>
                    <img src="/icon.svg" width="30%" />
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
                            <TextField label="My name" value={peerName} onChange={handlePeerName}/>
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
                            <TextField label="my message" value={newMessage} onChange={handleNewMessage} fullWidth/>
                        </CardContent>
                        <CardActions>
                            <Button size="small" disabled={!connection} onClick={sendToPeers}>Send message</Button>
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

export default App
