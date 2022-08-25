import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import SongList from "../SongList";
import { Button, Card, Table, Image } from "antd";

function SongItem(props) {
  const history = useHistory();

  const goToDetail = (id) => {
    history.push("/detail/" + id);
  };


  const column = [
    {
      title: "Name",
      dataIndex: "title",
    },
    {
      title: "Author",
      dataIndex: "description",
    },
    {
      title: "Gerne",
      dataIndex: "price",
    },
    {
      title: "Image",
      dataIndex: "image",
      render: (_, songs) => {
        return (
          <Image
            width={100}
            height={150}
            src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
            alt=""
          />
        );
      },
    },

    {
      title: "Action",
      key: "action",
      render: (_, songs) => {
        return (
          <>
            <Button onClick={() => goToDetail(songs.id)} type="primary">
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
