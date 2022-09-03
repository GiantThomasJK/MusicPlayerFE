import React from "react";

function SongAudio(props) {
  return (
    <div>
      <audio
        src={props.songs.src}
        controls
      />
    </div>
  );
}

export default SongAudio;
