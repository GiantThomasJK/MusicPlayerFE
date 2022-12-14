import React from "react";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fecthSongsAction } from "../../action";
import SongItem from "../../components/SongItem";
import SongList from "../../components/SongList";
import { Button, Space, Input } from "antd";
import { AudioOutlined } from "@ant-design/icons";

import Search from "antd/lib/transfer/search";
import styles from "./style.module.css";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Home() {
  const dispatch = useDispatch();
  const onSearch = (value) => console.log(value);
  const [searchTerm, setSearchTerm] = useState("");
  const history = useHistory();
  const { Search } = Input;
  const { t, i18n } = useTranslation();
  let language = localStorage.getItem("i18nextLng");

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);
  const goToAddSong = () => {
    history.push("/addSong");
  };
  const fetchSongs = async () => {
    await dispatch(fecthSongsAction);
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  return (
    <div className="container">
      <h1
        style={{
          textAlign: "center",
          fontSize: 40,
          marginTop: 20,
        }}
      >
        {t("Song List")}
      </h1>
      <div className={styles.features}>
        <button
          onClick={goToAddSong}
          htmlType="submit"
          className={styles.button}
        >
          <span className={styles.buttonText}>{t("Add song")}</span>
          <span className={styles.buttonIcon}>
            <ion-icon name="add-circle-outline"></ion-icon>
          </span>
        </button>

        <Space className={styles.search}>
          <Search
            style={{ fontSize: 25, width: 400 }}
            placeholder={t("Search song")}
            allowClear
            enterButton={t("Search")}
            size="large"
            onSearch={onSearch}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
        </Space>
      </div>
      <SongList searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
    </div>
  );
}

export default Home;
