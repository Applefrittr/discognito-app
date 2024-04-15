import { motion } from "framer-motion";

function Guild({ updateChannel, currChannel, guild }) {
  const [guildName, guildData] = [...guild];

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

  return (
    <motion.div
      className="Guild"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="guild-header">
        <div className="guild-icon">
          {guildData.guildIcon && <img src={guildData.guildIcon} alt="Icon" />}
          {!guildData.guildIcon && (
            <div className="default-icon">{defaultIcon}</div>
          )}
        </div>
        <b>{guildName}</b>
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
    </motion.div>
  );
}

export default Guild;
