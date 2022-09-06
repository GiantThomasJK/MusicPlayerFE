import React, { useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Spin, Col, Row, Card, Button, Image, Input } from "antd";
import { actionTypes, fetchSongDetailAction } from "../../action";
import SongAudio from "../../../../common/components/audio";
import { useFormik } from "formik";
import * as yup from "yup";
import styles from "./style.module.css";
import SongDetail from "../SongDetail";
import instance from "api/instance";
import { useState } from "react";
const moment = require("moment");

const schema = yup.object().shape({
  name: yup.string().required("*Trường này bắt buộc nhập"),
  author: yup.string().required("*Trường này bắt buộc nhập"),
  genre: yup
    .string()
    .required("Trường này bắt buộc nhập")
    .matches(/^[A-Za-z ]+$/g, "*Họ tên phải nhập chữ"),
});

function Detail() {
  const match = useRouteMatch();
  const songId = match.params.id;
  const [isLoading, setIsLoading] = useState(false);

  const selectedSong = useSelector((state) => state.musicPlayer.songDetail);
  // console.log(selectedSong);

  const dispatch = useDispatch();

  const fetchSongDetail = async () => {
    await dispatch(fetchSongDetailAction(songId));
  };

  useEffect(() => {
    fetchSongDetail();
  }, []);

  const formik =  useFormik({
    initialValues: {
      id: songId,
      name: "",
      author: "",
      genre: "",
    },

    onSubmit: (values) => {
      console.log(values);
      updateSong(values);
    },

    validationSchema: schema,
  });

  console.log(formik.values.id);

  const updateSong = async (song) => {
    try {
      setIsLoading(true);
      const res = await instance.request({
        url: "/update",
        method: "PUT",
        data: song,
      });

      alert("Update thành công")

      dispatch({
        type: actionTypes.SET_UPDATE_SONG,
        payload: res.data,
      });

      console.log(res.data);
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
    <div className="container">
      <Row style={{ textAlign: "center", marginTop: 20 }}>
        <Col xs={6} sm={12}>
          {/* <Image
            style={{ borderRadius: 20 }}
            width={300}
            height={400}
            src="https://res.cloudinary.com/thinhdoan/image/upload/v1661180798/Chillies_qwfdcc.jpg"
          /> */}

          <SongDetail selectedSong={selectedSong} />
        </Col>

        <Col xs={12}>
          <form onSubmit={formik.handleSubmit} className={styles.form}>
            <div className={styles.card}>
              <label className={styles.label} >
                Song Name:{" "}
              </label>

              <Input
                name="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={styles.input}
                type="text"
                placeholder={selectedSong.name}
                value={formik.values.name}
              />
            </div>
            {formik.touched.name && formik.errors.name && (
              <p className={styles.errorText}>{formik.errors.name}</p>
            )}

            <div className={styles.card}>
              <label className={styles.label} >
                Author:
              </label>

              <Input
                name="author"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={styles.input}
                type="text"
                placeholder={selectedSong.author}
                value={formik.values.author}
              />
            </div>
            {formik.touched.author && formik.errors.author && (
              <p className={styles.errorText}>{formik.errors.author}</p>
            )}
            <div className={styles.card}>
              <label className={styles.label} >
                Genre:
              </label>
              <Input
                name="genre"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={styles.input}
                type="text"
                placeholder={selectedSong.genre}
                value={formik.values.genre}
              />
            </div>
            {formik.touched.genre && formik.errors.genre && (
              <p className={styles.errorText}>{formik.errors.genre}</p>
            )}
            {/*
            <div className={styles.card}>
              <label className={styles.label} >
                Thumbnail:
              </label>
              <Input
                name="thumbnail"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={styles.input}
                type="text"
                placeholder="Thumbnail"
                disabled
                value={selectedSong.thumbnail}
              />
            </div>
            {formik.touched.thumbnail && formik.errors.thumbnail && (
              <p className={styles.errorText}>{formik.errors.thumbnail}</p>
            )} */}

            {/* <div className={styles.card}>
              <label className={styles.label} style={{ color: "#fff" }}>
                Audio:
              </label>
              <Input
                name="src"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={styles.input}
                type="text"
                placeholder="Thumbnail"
                disabled
                value={selectedSong.src}
              />
            </div>
            {formik.touched.thumbnail && formik.errors.thumbnail && (
              <p className={styles.errorText}>{formik.errors.thumbnail}</p>
            )} */}

            <div className={styles.card}>
              <label className={styles.label}>
                Last update :{" "}
              </label>
              {/* <label  style={{ color: "#fff" }}>{selectedSong.updateAt}</label> */}
              <Input
                name="updateAt"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={styles.input}
                type="text"
                placeholder="Last Update"
                disabled
                value={moment(selectedSong.updateAt).format("YYYY-MM-DD")}
              />
            </div>

            <Button loading={isLoading} htmlType="submit" className={styles.button} type="primary">
              Update
            </Button>
          </form>
        </Col>
      </Row>
    </div>
  );
}

export default Detail;
