import React, { useState } from "react";
import { useFormik } from "formik";
import styles from "./style.module.css";
import { Spin, Col, Row, Card, Button, Image, Input } from "antd";

import * as yup from "yup";
import instance from "api/instance";

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

  const addSong = async (song) => {
    try {
      setIsLoading(true);
      const res = await instance.request({
        url: "/upload",
        method: "POST",
        data: song,
      });
      console.log(res.data);
      alert("Thêm bài hát thành công");
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {" "}
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <div className={styles.card}>
          <label className={styles.label} style={{ color: "#fff" }}>
            Song Name:{" "}
          </label>

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
          <label className={styles.label} style={{ color: "#fff" }}>
            Author:
          </label>

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
          <label className={styles.label} style={{ color: "#fff" }}>
            Genre:
          </label>
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
          <label className={styles.label} style={{ color: "#fff" }}>
            Image:
          </label>
          <Input
            name="thumbnail"
            onChange={(e) =>
              formik.setFieldValue("thumbnail", e.target.files[0])
            }
            onBlur={formik.handleBlur}
            className={styles.input}
            type="file"
            placeholder="Image"
          />
        </div>
        {formik.touched.thumbnail && formik.errors.thumbnail && (
          <p className={styles.errorText}>{formik.errors.thumbnail}</p>
        )}

        <div className={styles.card}>
          <label className={styles.label} style={{ color: "#fff" }}>
            Audio:
          </label>
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
          <label className={styles.label} style={{ color: "#fff" }}>
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
            value={formik.values.updateAt}
          />
        </div>

        <Button htmlType="submit" className={styles.button} type="primary">
          Add Song
        </Button>

      </form>
    </div>
  );
}

export default AddSong;
