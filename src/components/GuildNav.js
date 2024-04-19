import React, { useState } from "react";
import Guild from "./Guild";
import Cevron from "../assets/images/cevron.png";

function GuildNav({ guilds, updateChannel, currChannel }) {
  const [displayNav, setDisplayNav] = useState(true); // state to determin whether to display Nav on smaller screens

  // Navbar slider button.  Button will be displyed in UI on smaller screens, which will allow
  // the user to slide the guild nav in and out of the screen, keeping both the nav and
  // Message Stream elements user freindly
  const slideNav = () => {
    setDisplayNav((prev) => !prev);
  };

  return (
    <section className={`GuildNav ${displayNav ? "" : "nav-slideout"}`}>
      <h1>Discognito</h1>
      <h2>Servers</h2>
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
      <div className="GuildNav-slider" onClick={slideNav}>
        <img
          src={Cevron}
          className={`cevron ${displayNav ? "flip" : ""}`}
          alt=""
        />
      </div>
    </section>
  );
}

export default GuildNav;
