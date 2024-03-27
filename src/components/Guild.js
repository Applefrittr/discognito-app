function Guild(props) {
  const [guildName, guildData] = [...props.guild];

  const pickChannel = (e, channel) => {
    console.log(e.target);
    props.updateChannel(channel);
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
