import React from "react";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fecthSongsAction } from "../../action";
import SongItem from "../../components/SongItem";
import SongList from "../../components/SongList";

function Home() {
  const dispatch = useDispatch();

  const fetchSongs = async () => {
    await dispatch(fecthSongsAction);
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  return (
    <div
    style={{background: "linear-gradient(#43c6ac, #191654);" }}
    >
      <h1 style={{ textAlign: "center", fontSize: 40 }}>SONG LIST</h1>
      <SongList />
    </div>
  );
}

export default Home;
