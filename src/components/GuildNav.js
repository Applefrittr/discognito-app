import React, { useEffect } from "react";
import Guild from "./Guild";

function GuildNav({ guilds, updateChannel, currChannel }) {
  useEffect(() => {
    if (guilds) console.log(Array.from(guilds));
  }, [guilds]);

  return (
    <section className="GuildNav">
      <h1 className="App-header">Discognito Client</h1>
      <h2>Channels</h2>
      <div className="guild-list">
        {guilds !== null &&
          Array.from(guilds).map((guild, index) => {
            return (
              <React.Fragment key={index}>
                <Guild
                  guild={guild}
                  updateChannel={updateChannel}
                  currChannel={currChannel}
                />
              </React.Fragment>
            );
          })}
      </div>
    </section>
  );
}

export default GuildNav;
