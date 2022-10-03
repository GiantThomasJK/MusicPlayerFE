import React, { useEffect } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Spin,
  Col,
  Row,
  Card,
  Button,
  Image,
  Input,
  DatePicker,
  Select,
} from "antd";
import { actionTypes, fetchSongDetailAction } from "../../action";
import SongAudio from "../../../../common/components/audio";
import { useFormik } from "formik";
import * as yup from "yup";
import swal from "sweetalert";

import styles from "./style.module.css";
import SongDetail from "../SongDetail";
import instance from "api/instance";
import { useState } from "react";
const moment = require("moment");

// const schema = yup.object().shape({
//   name: yup.string().required("*Trường này bắt buộc nhập"),
//   author: yup.string().required("*Trường này bắt buộc nhập"),
//   genre: yup
//     .string()
//     .required("Trường này bắt buộc nhập")
//     .matches(/^[A-Za-z ]+$/g, "*Họ tên phải nhập chữ"),
// });

function Detail(props) {
  const [isLoading, setIsLoading] = useState(false);
  const selectedSong = useSelector((state) => state.musicPlayer.songDetail);
  const dispatch = useDispatch();
  const history = useHistory();
  const [isEditing, setIsEditing] = useState(false);
  const { Option } = Select;
  let songDetail = {};
  let { id } = props.match.params;

  if (localStorage.getItem("songDetail")) {
    songDetail = JSON.parse(localStorage.getItem("songDetail"));
  }

  const onEdit = () => {
    setIsEditing(true);
  };
  const onSave = () => {
    setIsEditing(false);
  };

  const fetchSongDetail = async () => {
    await dispatch(fetchSongDetailAction(id));
  };

  const handleChangeAụthor = (value) => {
    formik.setFieldValue("author", value);
  };

  const handleChangeGenre = (value) => {
    formik.setFieldValue("genre", value);
  };

  const handleChangeDatePicker = (value) => {
    let currentTime = moment().format();
    formik.setFieldValue("updateAt", currentTime);
  };

  useEffect(() => {
    fetchSongDetail();
  }, []);

  const formik = useFormik({
    initialValues: {
      id: id,
      name: songDetail?.name,
      author: songDetail?.author,
      genre: songDetail?.genre,
      updateAt: songDetail?.updateAt,
    },

    onSubmit: (values) => {
      console.log(values);
      updateSong(values);
    },

    // validationSchema: schema,
  });

  const updateSong = async (song) => {
    try {
      setIsLoading(true);
      const res = await instance.request({
        url: "/update",
        method: "PUT",
        data: song,
      });

      if (res.data.status === "ok") {
        swal({
          title: "Updated!",
          text: "Song Updated Successfully",
          icon: "success",
          button: "OK",
        });
      }

      dispatch({
        type: actionTypes.SET_UPDATE_SONG,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!selectedSong) {
    return <Spin />;
  }

  return (
    <>
      <button
        onClick={() => {
          history.push("/");
        }}
        type="submit"
        className="bg-blue-400 hover:bg-blue-600 text-white p-2"
      >
        Trở về
      </button>
      <div style={{ marginTop: 20 }} className="container">
        <div className="mt-10 sm:mt-0">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <SongDetail selectedSong={selectedSong} />
              </div>
            </div>
            <div className="mt-5 md:col-span-2 md:mt-0">
              <form action="#" onSubmit={formik.handleSubmit}>
                <div className="overflow-hidden shadow sm:rounded-md">
                  <div className="bg-white px-4 py-5 sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Song name
                        </label>
                        {/* <input
                          disabled={!isEditing}
                          type="text"
                          name="name"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          placeholder={formik.values.name}
                          value={formik.values.name}
                          className="mt-1 py-2 px-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        /> */}
                        <Input
                          disabled={!isEditing}
                          value={formik.values.name}
                          name="name"
                          onChange={formik.handleChange}
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="last-name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Author
                        </label>
                        <Select
                          disabled={!isEditing}
                          defaultValue={formik.values.author}
                          onChange={handleChangeAụthor}
                          style={{ width: "100%" }}
                        >
                          <Option name="genre" value="Pop">
                            Chillies
                          </Option>
                          <Option name="genre" value="Indie">
                            Bùi Anh Tuấn
                          </Option>
                          <Option name="genre" value="Chill">
                            Trung Quân Idol
                          </Option>
                          <Option name="genre" value="Rock">
                            Grey D
                          </Option>
                          <Option name="genre" value="Ballad">
                            Min
                          </Option>
                        </Select>
                        {/* <select
                          disabled={!isEditing}
                          onChange={handleChangeAụthor}
                          onBlur={formik.handleBlur}
                          value={formik.values.author}
                          name="author"
                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        >
                          <option>{formik.values.author}</option>
                          <option>Chillies</option>
                          <option>Bùi Anh Tuấn</option>
                          <option>Trung Quân Idol</option>
                          <option>Grey D</option>
                          <option>Min</option>
                          <option>Justin Bieber</option>
                        </select> */}
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="country"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Genre
                        </label>
                        {/* <select
                        disabled={!isEditing}
                        onChange={handleChangeGenre}
                        onBlur={formik.handleBlur}
                        name="genre"
                        value={formik.values.genre}
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      >
                        <option>{formik.values.genre}</option>
                        <option>Pop</option>
                        <option>Indie</option>
                        <option>Chill</option>
                        <option>Rock</option>
                        <option>Ballad</option>
                      </select> */}
                        <Select
                          disabled={!isEditing}
                          defaultValue={formik.values.genre}
                          onChange={handleChangeGenre}
                          style={{ width: "100%" }}
                        >
                          <Option name="genre" value="Pop">
                            Pop
                          </Option>
                          <Option name="genre" value="Indie">
                            Indie
                          </Option>
                          <Option name="genre" value="Chill">
                            Chill
                          </Option>
                          <Option name="genre" value="Rock">
                            Rock
                          </Option>
                          <Option name="genre" value="Ballad">
                            Ballad
                          </Option>
                        </Select>
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="email-address"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Last update
                        </label>
                        {/* <input
                          onChange={handleChangeDatePicker}
                          onBlur={formik.handleBlur}
                          type="text"
                          name="email-address"
                          disabled="false"
                          format={"DD/MM/YYYY"}
                          value={moment(formik.values.updateAt)}
                          className="mt-1 py-2 px-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        /> */}

                        <DatePicker
                          disabled="false"
                          format={"DD/MM/YYYY"}
                          value={moment(formik.values.updateAt)}
                          onChange={handleChangeDatePicker}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                   {isLoading}
                    <div
                      className="mx-2 inline-flex justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium text-black shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={() => onEdit()}
                    >
                      Edit
                    </div>
                    <button
                      type="submit"
                      onClick={() => onSave()}
                      className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Detail;
