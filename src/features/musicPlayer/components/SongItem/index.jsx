import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import SongList from "../SongList";
import { Button, Card, Table, Image } from "antd";
import SongAudio from "common/components/audio";

function SongItem(props) {
  const history = useHistory();

  const goToDetail = (id) => {
    history.push("/detail/" + id);
  };


  const column = [
    {
      title: "Name",
      dataIndex: "name",
      render: (_, songs) => {
        return (
          <div className="d-flex align-items-center">
          <img src={songs.thumbnail} className="rounded-circle" alt="" style={{width: 45, height: 45}} />
          <div className="ms-3">
            <p className="fw-bold mb-1">{songs.name}</p>
          </div>
        </div>
        )
      }
    },
    {
      title: "Author",
      dataIndex: "author",
    },
    {
      title: "Gerne",
      dataIndex: "genre",
    },
    {
      title: "Audio",
      dataIndex: "src",
      render: (_, songs) => {
        return (
          <SongAudio songs={songs} />
        );
      },
    },

    {
      title: "Action",
      key: "action",
      render: (_, songs) => {
        return (
          <>
            <Button style={{marginRight: 10}} onClick={() => goToDetail(songs.id)} type="primary">
              Update
            </Button>
            <Button type="primary" danger>
              Delete
            </Button>
          </>
        );
      },
    },
  ];

  return (
    <Card
      title="Song List"
      headStyle={{ backgroundColor: "#000000", color: "#ffffff" }}
    >
      <Table
        dataSource={props.songList.map((song) => {
          return { ...song, key: song.id };
        })}
        columns={column}
      ></Table>
    </Card>
  );
}

export default SongItem;
