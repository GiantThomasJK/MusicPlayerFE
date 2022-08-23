import React, { useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Spin, Col, Row, Card, Button } from "antd";

function Detail() {
  const match = useRouteMatch();
  const songId = match.params.id;

  const selectedSong = useSelector((state) => state.musicPlayer.songDetail);

  const dispatch = useDispatch();

  const fetchSongDetail = async () => {
    await dispatch(fetchSongDetail(songId));
  };

  useEffect(() =>{
    fetchSongDetail();
  })

  if (!selectedSong) {
    return <Spin />;
  }
  return <div></div>;
}

export default Detail;
