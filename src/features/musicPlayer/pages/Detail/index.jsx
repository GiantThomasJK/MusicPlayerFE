import React, { useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Spin, Col, Row, Card, Button, Image, Input } from "antd";
import { fetchSongDetailAction } from "../../action";
import SongAudio from "../../../../common/components/audio";
import { useFormik } from "formik";
import * as yup from "yup";
import styles from "./style.module.css";

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

  const selectedSong = useSelector((state) => state.musicPlayer.songDetail);

  const dispatch = useDispatch();

  const fetchSongDetail = async () => {
    await dispatch(fetchSongDetailAction(songId));
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      author: "",
      genre: "",
      src: "",
      thumbnail: "",
    },

    onSubmit: (values) => {
      console.log(values);
    },

    validationSchema: schema,
  });

  useEffect(() => {
    fetchSongDetail();
  }, []);

  if (!selectedSong) {
    return <Spin />;
  }
  return (
    <div style={{background: "red" }} className="container">
      <Row style={{ textAlign: "center", marginTop: 20 }}>
        <Col xs={6} sm={12}>
          <Image
            style={{ borderRadius: 20 }}
            width={300}
            height={400}
            border
            src="https://res.cloudinary.com/thinhdoan/image/upload/v1661180798/Chillies_qwfdcc.jpg"
          />
          <SongAudio />
        </Col>

        <Col xs={12}>
          <form onSubmit={formik.handleSubmit} className={styles.form}>
            <Input
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={styles.input}
              type="text"
              placeholder="Song Name"
            />
            {formik.touched.name && formik.errors.name && (
              <p className={styles.errorText}>{formik.errors.name}</p>
            )}
            <Input
              name="author"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={styles.input}
              type="text"
              placeholder="Author"
            />
            {formik.touched.author && formik.errors.author && (
              <p className={styles.errorText}>{formik.errors.author}</p>
            )}
            <Input
              name="genre"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={styles.input}
              type="text"
              placeholder="Genre"
            />
            {formik.touched.genre && formik.errors.genre && (
              <p className={styles.errorText}>{formik.errors.genre}</p>
            )}
            <Input
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={styles.input}
              type="text"
              placeholder="Email"
            />
            {formik.touched.email && formik.errors.email && (
              <p className={styles.errorText}>{formik.errors.email}</p>
            )}
            <Input
              name="soDt"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={styles.input}
              type="text"
              placeholder="Phonenumber"
            />
            <Button htmlType="submit" className={styles.input} type="primary">
              Update
            </Button>
          </form>
        </Col>
      </Row>
    </div>
  );
}

export default Detail;
