import { useEffect, useState } from "react";
import socket from "../API/socket";
import GuildNav from "./GuildNav";
import MessageStream from "./MessageStream";
import "../styles/App.css";

function App() {
  const [guilds, setGuilds] = useState(null);
  const [currChannel, setCurrChannel] = useState();

  const updateChannel = (channel) => {
    console.log("channel:", channel);
    setCurrChannel(channel);
  };
  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      console.log("connected to server!");
    });

    socket.on("get channels", (channels) => {
      // consolidate channels data revieved from Discognito API into a Map with guild name as key and value set as an object with guild ID, channels, channel info, etc. to be consumed and rendered by ChannelNav component
      const guilds = channels.reduce((prev, curr) => {
        if (!prev.get(curr.guildName)) {
          prev.set(curr.guildName, {
            guildID: curr.guildID,
            channels: [{ ID: curr.ID, name: curr.name, topic: curr.topic }],
          });
        } else {
          const guild = prev.get(curr.guildName);
          guild.channels.push({
            ID: curr.ID,
            name: curr.name,
            topic: curr.topic,
          });
        }
        return prev;
      }, new Map());

      //console.log(guilds);

      setGuilds(guilds);
    });

    return () => {
      console.log("disconnecting...");
      socket.off("get channels");
      socket.disconnect();
    };
  }, []);
  return (
    <div className="App">
      <GuildNav guilds={guilds} updateChannel={updateChannel} />
      <MessageStream currChannel={currChannel} />
    </div>
  );
}

export default App;
