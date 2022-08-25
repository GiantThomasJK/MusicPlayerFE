import React from "react";
import SongItem from "../SongItem";
import { useSelector } from "react-redux";



function SongList() {
  const songList = useSelector((state) => state.musicPlayer.songs);
  console.log(songList);
  if (!songList)
    return (
      <div style={{ textAlign: "center" }}>
        <h1>Loading...</h1>
      </div>
    );

  return (
    <div className="container">
      <SongItem key={songList.id} songList={songList} />

      {/* <SongItem songList={songList} /> */}
    </div>
  );
}

export default SongList;
