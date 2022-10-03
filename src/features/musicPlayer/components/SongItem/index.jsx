import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import SongList from "../SongList";
import { Button, Card, Table, Image } from "antd";
import SongAudio from "common/components/audio";
import { deleteSongAction } from "features/musicPlayer/action";
import swal from "sweetalert";

function SongItem(props) {
  const history = useHistory();

  const goToDetail = (id) => {
    history.push("/detail/" + id);
  };

  const dispatch = useDispatch();

  const deleteSong = async (songId) => {
    await dispatch(deleteSongAction(songId));
  };

  const column = [
    {
      title: "Name",
      dataIndex: "name",
      render: (_, songs) => {
        return (
          <div className="d-flex align-items-center">
            <img
              src={songs.thumbnail}
              className="rounded-circle"
              alt=""
              style={{ width: 45, height: 45 }}
            />
            <div className="ms-3">
              <p className="fw-bold mb-1">{songs.name}</p>
            </div>
          </div>
        );
      },
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
        return <SongAudio songs={songs} />;
      },
    },

    {
      title: "Action",
      key: "action",
      render: (_, songs) => {
        return (
          <>
            <NavLink
              style={{ marginRight: 10 }}
              onClick={() => {
                goToDetail(songs.id);
                localStorage.setItem("songDetail", JSON.stringify(songs));
              }}
              type="primary"
              className="mr-5 pointer-events-auto ml-8 rounded-md bg-indigo-600 py-2 px-3 text-[0.8025rem] font-semibold leading-5 text-white hover:bg-indigo-500"
              to={`/detail/${songs.id}`}
            >
              Update
            </NavLink>
            <Button
              type="primary"
              onClick={() =>
                swal({
                  title: "Are you sure?",
                  text: "Are you sure that you want to delete this song?",
                  icon: "warning",
                  dangerMode: true,
                }).then((willDelete) => {
                  if (willDelete) {
                    deleteSong(songs.id);
                  }
                })
              }
              danger
            >
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
