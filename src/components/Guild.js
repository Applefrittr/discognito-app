function Guild({ updateChannel, currChannel, guild }) {
  const [guildName, guildData] = [...guild];

  const pickChannel = (e, channel) => {
    if (!currChannel) updateChannel(channel);
    else if (currChannel && currChannel.id !== channel.id)
      updateChannel(channel);
    else return;
  };

  return (
    <div className="Guild">
      {guildName}
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
