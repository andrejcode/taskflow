import { useEffect, useState } from 'react';
import { socket } from './socket';

function App() {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    const onConnect = () => {
      setIsConnected(true);
    };

    const onDisconnect = () => {
      setIsConnected(false);
    };

    const onMessage = (message: string) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    const onWelcome = (message: string) => {
      console.log(message);
    };

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('message', onMessage);

    socket.on('welcome', onWelcome);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('message', onMessage);
    };
  }, []);

  const sendMessage = () => {
    if (input) {
      socket.emit('message', input);
      setInput('');
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold underline">Welcome to TaskFlow!</h1>
      <p>You are {isConnected ? 'connected' : 'disconnected'}</p>
      <div>
        <div>
          {messages.map((msg, index) => (
            <p key={index}>{msg}</p>
          ))}
        </div>
        <input
          className="rounded border border-gray-500"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </>
  );
}

export default App;
