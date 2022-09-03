import React from "react";
import SongItem from "../SongItem";
import { useSelector } from "react-redux";

function SongList(props) {
  const songList = useSelector((state) => state.musicPlayer.songs);

  if (!songList)
    return (
      <div style={{ textAlign: "center" }}>
        <h1>Loading...</h1>
      </div>
    );

  const filtered = songList.filter((item) => {
    if (props.searchTerm == "") {
      return item;
    } else if (
      item.name.toLowerCase().includes(props.searchTerm.toLowerCase()) ||
      item.author.toLowerCase().includes(props.searchTerm.toLowerCase()) ||
      item.genre.toLowerCase().includes(props.searchTerm.toLowerCase())
    ) {
      return item;
    }
  });

  console.log(filtered);

  return (
    <div>
      <SongItem key={songList.id} songList={filtered} />

      {/* <SongItem songList={songList} /> */}
    </div>
  );
}

export default SongList;
