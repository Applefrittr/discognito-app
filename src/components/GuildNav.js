import React, { useEffect, useRef } from "react";
import Guild from "./Guild";
import Cevron from "../assets/images/cevron.png";

function GuildNav({ guilds, updateChannel, currChannel }) {
  const navRef = useRef();
  const cevronRef = useRef();

  // Navbar slider button.  Button will be displyed in UI on smaller screens, whihc will allow
  // the user to slide the guild nav in and out of the screen, keeping both the nav and
  // Message Stream elements user freindly
  const slideNav = () => {
    if (navRef.current.classList.contains("nav-slideout")) {
      navRef.current.classList.remove("nav-slideout");
      cevronRef.current.classList.add("flip");
    } else {
      navRef.current.classList.add("nav-slideout");
      cevronRef.current.classList.remove("flip");
    }
  };

  return (
    <section className="GuildNav" ref={navRef}>
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
        <img src={Cevron} className="cevron" ref={cevronRef} />
      </div>
    </section>
  );
}

export default GuildNav;
