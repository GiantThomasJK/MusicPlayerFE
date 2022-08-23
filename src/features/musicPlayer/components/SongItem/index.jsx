import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import SongList from "../SongList";
import { Button, Card, Table, Image } from "antd";

function SongItem(props) {
  const { title, price, description, image, id } = props.item;
  const songFetch = [];
  console.log(props.item.title);
  const history = useHistory();

  console.log(props.item);
  const goToDetail = () => {
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
            <Button onClick={goToDetail} type="primary">
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
        key={props.item.id}
        dataSource={props.item.map((song) => {
          return ({...song,})
        })}
        columns={column}
      ></Table>
    </Card>
  );
}

export default SongItem;
