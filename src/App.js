import { useEffect } from "react";
import socket from "./API/socket";

function App() {
  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      console.log("connected to server!");
    });

    socket.on("new message", (message) => {
      console.log("new message recieved from Discord:", message);
    });

    socket.on("get channels", (channels) => {
      console.log(channels);
    });

    return () => {
      console.log("disconnecting...");
      socket.off("new message");
      socket.off("get channels");
      socket.disconnect();
    };
  }, []);
  return (
    <div className="App">
      <header className="App-header">Discognito Client</header>
    </div>
  );
}

export default App;
