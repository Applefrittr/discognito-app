import { useRef } from "react";

function Guild({ updateChannel, currChannel, guild }) {
  const [guildName, guildData] = [...guild];
  const snapRef = useRef();

  // create a default icon using the first letters of each word in the guild's name, in the same style as Discord
  // Then conditional render this or the guild's icon pulled from the API
  let defaultIcon = "";

  if (!guildData.guildIcon) {
    const words = guildName.split(" ");

    words.forEach((word) => {
      defaultIcon += word[0];
    });

    // limit deafultIcon to 4 characters to fit in div element
    defaultIcon = defaultIcon.substring(0, 4);
  }

  const pickChannel = (e, channel) => {
    if (!currChannel) updateChannel(channel);
    else if (currChannel && currChannel.id !== channel.id)
      updateChannel(channel);
    else return;
  };

  // const toggleSnapShot = () => {
  //   if (snapRef.current.classList.contains("display-snapshot")) {
  //     snapRef.current.classList.toggle("show-snapshot");
  //     setTimeout(() => {
  //       snapRef.current.classList.toggle("display-snapshot");
  //     }, 500);
  //   } else {
  //     snapRef.current.classList.toggle("display-snapshot");
  //     setTimeout(() => {
  //       snapRef.current.classList.toggle("show-snapshot");
  //     }, 100);
  //   }
  // };

  return (
    <div className="Guild">
      <div className="guild-header">
        <div className="guild-icon">
          {guildData.guildIcon && <img src={guildData.guildIcon} alt="Icon" />}
          {!guildData.guildIcon && (
            <div className="default-icon">{defaultIcon}</div>
          )}
        </div>
        <b>{guildName}</b>
        {/* 
        <section className="guild-snapshot" ref={snapRef}>
          <div className="snapshot-icon">
            {guildData.guildIcon && (
              <img src={guildData.guildIcon} alt="Icon" />
            )}
            {!guildData.guildIcon && <div>{defaultIcon}</div>}
          </div>
          <b>
            <i>{guildName}</i>
          </b>
          <p>Created: ???</p>
          <div>
            <b>Members: 10</b>
            <b>Online:2</b>
          </div>
        </section> */}
      </div>
      <div className="channel-list">
        {guildData.channels.map((channel) => {
          return (
            <button
              key={channel.ID}
              onClick={(e) =>
                pickChannel(e, {
                  guildName,
                  name: channel.name,
                  id: channel.ID,
                  topic: channel.topic,
                })
              }
              className="channel-button"
            >
              #{channel.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Guild;
