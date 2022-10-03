import React, { useState } from "react";
import { useFormik } from "formik";
import styles from "./style.module.css";
import { Spin, Col, Row, Card, Button, Image, Input, DatePicker } from "antd";
import swal from "sweetalert";

import * as yup from "yup";
import instance from "api/instance";
import { useHistory } from "react-router-dom";
const moment = require("moment");

const schema = yup.object().shape({
  name: yup.string().required("*Trường này bắt buộc nhập"),
  author: yup.string().required("*Trường này bắt buộc nhập"),
  genre: yup
    .string()
    .required("Trường này bắt buộc nhập")
    .matches(/^[A-Za-z ]+$/g, "*Họ tên phải nhập chữ"),
});

function AddSong() {
  const [isLoading, setIsLoading] = useState(false);
  const [img, setImg] = useState(null);
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      name: "",
      author: "",
      genre: "",
      src: "",
      thumbnail: "",
      updateAt: "",
    },

    onSubmit: (values, resetForm) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("author", values.author);
      formData.append("genre", values.genre);
      formData.append("src", values.src);
      formData.append("thumbnail", values.thumbnail);
      formData.append("updateAt", values.updateAt);

      addSong(formData);

      resetForm.resetForm();
    },

    validationSchema: schema,
  });

  const handleChangeFile = (e) => {
    let file = e.target.files[0];
    if (
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/png"
    ) {
      let reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = (e) => {
        setImg(e.target.result);
      };
    }
    formik.setFieldValue("thumbnail", file);
  };

  const handleChangeDatePicker = (value) => {
    let currentTime = moment().format();
    formik.setFieldValue("updateAt", currentTime);
  };

  const addSong = async (song) => {
    try {
      setIsLoading(true);
      const res = await instance.request({
        url: "/upload",
        method: "POST",
        data: song,
      });
      console.log(res.data);
      if (res.data.status === "ok") {
        swal({
          title: "Uploaded!",
          text: "Song Uploaded Successfully",
          icon: "success",
          button: "OK",
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

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
      <div>
        <form onSubmit={formik.handleSubmit} className={styles.form}>
          <div className={styles.card}>
            <label className={styles.label}>Song Name: </label>

            <Input
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={styles.input}
              type="text"
              placeholder="Song Name"
              value={formik.values.name}
            />
          </div>
          {formik.touched.name && formik.errors.name && (
            <p className={styles.errorText}>{formik.errors.name}</p>
          )}

          <div className={styles.card}>
            <label className={styles.label}>Author:</label>

            <Input
              name="author"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={styles.input}
              type="text"
              placeholder="Author"
              value={formik.values.author}
            />
          </div>
          {formik.touched.author && formik.errors.author && (
            <p className={styles.errorText}>{formik.errors.author}</p>
          )}
          <div className={styles.card}>
            <label className={styles.label}>Genre:</label>
            <Input
              name="genre"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={styles.input}
              type="text"
              placeholder="Genre"
              value={formik.values.genre}
            />
          </div>
          {formik.touched.genre && formik.errors.genre && (
            <p className={styles.errorText}>{formik.errors.genre}</p>
          )}

          <div className={styles.card}>
            <label className={styles.label}>Image:</label>
            <Input
              name="thumbnail"
              onChange={handleChangeFile}
              onBlur={formik.handleBlur}
              className={styles.input}
              type="file"
              placeholder="Image"
            />
            <br />
          </div>
          <img
            style={{ width: 150, height: 200, marginLeft: 105, marginTop: 10 }}
            src={img}
            alt=""
          />

          {formik.touched.thumbnail && formik.errors.thumbnail && (
            <p className={styles.errorText}>{formik.errors.thumbnail}</p>
          )}

          <div className={styles.card}>
            <label className={styles.label}>Audio:</label>
            <Input
              name="src"
              onChange={(e) => formik.setFieldValue("src", e.target.files[0])}
              onBlur={formik.handleBlur}
              className={styles.input}
              type="file"
              placeholder="Audio"
            />
          </div>
          {formik.touched.src && formik.errors.src && (
            <p className={styles.errorText}>{formik.errors.src}</p>
          )}

          <div className={styles.card}>
            <label className={styles.label}>Last update : </label>
            {/* <label  style={{ color: "#fff" }}>{selectedSong.updateAt}</label> */}
            {/* <Input
            name="updateAt"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={styles.input}
            type="text"
            placeholder="Last Update"
            value={formik.values.updateAt}
          /> */}
            <DatePicker
              style={{ width: "100%" }}
              className={styles.input}
              format={"DD/MM/YYYY"}
              onChange={handleChangeDatePicker}
            />
          </div>

          <Button
            loading={isLoading}
            htmlType="submit"
            className={styles.button}
            type="primary"
          >
            Add Song
          </Button>
        </form>
      </div>
    </>
  );
}

export default AddSong;
