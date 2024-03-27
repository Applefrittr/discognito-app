import React, { useEffect, useState } from "react";
import Guild from "./Guild";

function GuildNav(props) {
  useEffect(() => {
    if (props.guilds) console.log(Array.from(props.guilds));
  }, [props.guilds]);

  return (
    <section className="GuildNav">
      <h1 className="App-header">Discognito Client</h1>
      <h2>Channels</h2>
      <div className="guild-list">
        {props.guilds !== null &&
          Array.from(props.guilds).map((guild, index) => {
            return (
              <React.Fragment key={index}>
                <Guild guild={guild} updateChannel={props.updateChannel} />
              </React.Fragment>
            );
          })}
      </div>
    </section>
  );
}

export default GuildNav;
