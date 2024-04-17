import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../API/socket";
import GuildNav from "./GuildNav";
import MessageStream from "./MessageStream";
import AnimatePage from "./AnimatePage";
import "../styles/App.css";

function App() {
  const [guilds, setGuilds] = useState(null);
  const [currChannel, setCurrChannel] = useState();
  const [renderConnErr, setRenderConnErr] = useState(false);
  const [reconnCount, setReconnCount] = useState(0);
  const [elipsis, setElipsis] = useState(".");
  const navigate = useNavigate();

  const updateChannel = (channel) => {
    setCurrChannel(channel);
  };

  useEffect(() => {
    socket.connect();

    /*
     * Connection error, a bit of a catch all when related to API.  If the server crashes, client can't connect due to bad connection, etc., an error message will
     * render in the client UI and will try to reconnect.  If client fails to reconnect, a button to route the client back to the home page
     * will appear.
     */
    socket.on("connect_error", () => {
      setRenderConnErr(true);
      setReconnCount((prev) => prev + 1);
    });

    socket.on("get channels", (channels) => {
      /* consolidate channels data (array of channels) recieved from Discognito API into a Map with guild name as key and value set as an object with guild ID, icon, channels, 
        channel info, etc. to be consumed and rendered by ChannelNav component
        example: 
        guilds (Map): {
           guildName1 --> {
              guildID : guild's ID,
              guildIcon : guild's Icon
              channels: [
                {
                  ID: channel ID,
                  name: channel name,
                  topic: channel topic/description
                },
                ...
              ]
           },
           guildName2 --> { ... },
           ...
        }

      */
      const guilds = channels.reduce((prev, curr) => {
        if (!prev.get(curr.guildName)) {
          prev.set(curr.guildName, {
            guildID: curr.guildID,
            guildIcon: curr.guildIcon,
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

      setGuilds(guilds);
    });

    return () => {
      socket.off("connect");
      socket.off("get channels");
      socket.off("connect_error");
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (elipsis.length >= 3) setElipsis(".");
      else setElipsis((prev) => prev + ".");
    }, 1000);
  }, [elipsis.length]);

  return (
    <AnimatePage>
      <section className="App">
        <GuildNav
          guilds={guilds}
          updateChannel={updateChannel}
          currChannel={currChannel}
        />
        <MessageStream currChannel={currChannel} />
        {renderConnErr && (
          <section className="modal-overlay">
            <div className="err-modal">
              <p>
                Connection Error. Reconnect attempt{" "}
                {reconnCount > 3 ? 3 : reconnCount}
                {reconnCount < 3 && elipsis}
              </p>
              {reconnCount >= 3 && (
                <div>
                  <p>Please try again later</p>
                  <button onClick={() => navigate("/")}>Return</button>
                </div>
              )}
            </div>
          </section>
        )}
      </section>
    </AnimatePage>
  );
}

export default App;
