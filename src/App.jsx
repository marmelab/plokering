import { useState } from 'react'
import { Peer } from "peerjs";
import CONFIG from './config';

function App() {
    const [count, setCount] = useState(0);
    const [peer, setPeer] = useState(null);
    const [peerId, setPeerId] = useState('tutu');
    const [peerConnect, setPeerConnect] = useState('toto');
    const [message, setMessage] = useState('');
    const addMessage = (data) => {
        setMessage(message + '\n\r' + data)
    }

    const handlePeerId = (event) => {
        setPeerId(event.target.value);
    }

    const handlePeerConnect = (event) => {
        setPeerConnect(event.target.value);
    }

    const register = () => {
        const peer = new Peer(peerId, CONFIG.peerJsServer);
        setPeer(peer);
        console.log("peer : ", peer);
        peer.on('open', (id) => {
            console.log("peer.on(open)");
            addMessage('peer.on open', 'My peer ID is: ' + id);
        });

        peer.on("connection", (conn) => {
            console.log("peer.on(connection)");
            conn.on("data", (data) => {
                console.log("conn.on(data)");
                // Will print 'hi!'
                console.log(data);
                addMessage(data);
            });
            conn.on("open", () => {
                console.log("conn.on(open)");
                conn.send("hello!");
            });
        });

        peer.on('error', (error) => {
            console.error(error);
            addMessage('peer.on error',error)
        });
    }

    const connectToPeer = () => {
        console.log("connectToPeer");
        console.log("peer : ", peer);
        let conn = peer.connect(peerConnect);
        conn.on('data', (data) => {
            console.log(`received: ${data}`);
            addMessage(`received: ${data}`)
        });
        conn.on("open", () => {
            conn.send("hi!");
        });
    }

    const unRegister = () => {
        peer.disconnect();
        peer.destroy();
        setPeer(null);
    }

    const sendToPeers = () => {

    }

    return (
        <div className="App">
        <h1>Plockering</h1>
        <div className="card">
            <button onClick={() => setCount((count) => count + 1)}>
                count is {count}
            </button>
            <p>
                <input type="text" value={peerId} onChange={handlePeerId}/>
                <input type="text" value={peerConnect} onChange={handlePeerConnect}/>
            </p>
            <p>
                <button onClick={register}>
                    Register to server
                </button>
                <button onClick={unRegister}>
                    Unregister
                </button>
                <button onClick={connectToPeer}>
                    Connect to peer
                </button>
                <button onClick={sendToPeers}>
                    send to peers
                </button>
                {message}
            </p>
        </div>
        </div>
    )
}

export default App
