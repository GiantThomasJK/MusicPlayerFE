import React, { useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Spin, Col, Row, Card, Button, Image } from "antd";
import { fetchSongDetailAction } from "../../action";
import SongAudio from "../../../../common/components/audio";

function Detail() {
  const match = useRouteMatch();
  const songId = match.params.id;

  const selectedSong = useSelector((state) => state.musicPlayer.songDetail);

  const dispatch = useDispatch();

  const fetchSongDetail = async () => {
    await dispatch(fetchSongDetailAction(songId));
  };

  useEffect(() => {
    fetchSongDetail();
  }, []);

  if (!selectedSong) {
    return <Spin />;
  }
  return (
    <div className="container">
      <Row>
        <Col xs={6} sm={12}>
          <Image
            width={200}
            height={200}
            border
            src="https://res.cloudinary.com/thinhdoan/image/upload/v1661180798/Chillies_qwfdcc.jpg"
          />
          <SongAudio />
        </Col>

        <Col xs={12}>
          <h1>{selectedSong.title}</h1>
        </Col>
      </Row>
    </div>
  );
}

export default Detail;
