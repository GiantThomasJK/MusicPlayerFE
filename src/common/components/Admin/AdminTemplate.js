import React, { Fragment } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, Select } from "antd";
import { useState, useNavigate } from "react";
import { NavLink, Redirect, Route, useHistory } from "react-router-dom";
import SubMenu from "antd/lib/menu/SubMenu";
import { useDispatch, useSelector } from "react-redux";
import { SET_PROFILE } from "../../../features/authentication/action";

function AdminTemplate(props) {
  const { Header, Content, Footer, Sider } = Layout;
  const { Component, ...restProps } = props;
  let user = {};
  const userProfile = useSelector((state) => state.auth.profile);
  const history = useHistory();
  const dispatch = useDispatch();
  const { Option } = Select;

  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("USER_LOGIN");


    dispatch({
      type: SET_PROFILE,
      payload: null,
    });

    history.push("/Signin");
  };

  const renderUserProfile = () => {
    if (localStorage.getItem("USER_LOGIN")) {
      user = JSON.parse(localStorage.getItem("USER_LOGIN"));
      return (
        <>
          <a className="ml-3" style={{ color: "white" }} href="#">
            Hi, {user[0]}
            {user[1]}
            {user[2]}
            {user[3]}
            {user[4]}
          </a>
          <a
            style={{ color: "white" }}
            className="mr-5 pointer-events-auto ml-8 rounded-md bg-indigo-600 py-2 px-3 text-[0.8125rem] font-semibold leading-5 text-white hover:bg-indigo-500"
            href="#"
            onClick={handleLogout}
          >
            Log out
          </a>
        </>
      );
    }

    return (
      <>
        <NavLink
          className="mr-5 pointer-events-auto ml-8 rounded-md bg-indigo-600 py-2 px-3 text-[0.8125rem] font-semibold leading-5 text-white hover:bg-indigo-500"
          to="/Signin"
        >
          Sign in
        </NavLink>
      </>
    );
  };

  return (
    <Route
      {...restProps}
      render={(propsRoute) => {
        return (
          <Fragment>
            <Layout
              style={{
                minHeight: "100vh",
              }}
            >
              <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
              >
                <div className="flex align-item-center justify-items-center items-center logo p-4">
                  <img
                    className=" h-6 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="logo"
                  />
                  <h3 className="text-xl mx-2 text-white mb-0">MusicPlayer</h3>
                </div>
                <Menu
                  style={{ marginTop: 23 }}
                  onClick={({ key }) => {
                    history.push(key);
                  }}
                  theme="dark"
                  defaultSelectedKeys={["1"]}
                  mode="inline"
                >
                  <SubMenu key="sub1" icon={<FileOutlined />} title="Song">
                    <Menu.Item key="/" icon={<VideoCameraOutlined />}>
                      <NavLink to="/">Song</NavLink>
                    </Menu.Item>
                    <Menu.Item key="/addSong" icon={<VideoCameraOutlined />}>
                      <NavLink to="/addSong">Add Song</NavLink>
                    </Menu.Item>
                  </SubMenu>
                </Menu>
              </Sider>
              <Layout className="site-layout">
                <Header
                  className="text-right"
                  style={{
                    padding: 0,
                  }}
                >
                  {renderUserProfile()}
                </Header>
                <Content>
                  <div
                    className="site-layout-background"
                    style={{
                      padding: 24,
                      minHeight: 360,
                    }}
                  >
                    <Component {...propsRoute} />
                  </div>
                </Content>
              </Layout>
            </Layout>
          </Fragment>
        );
      }}
    />
  );
}

export default AdminTemplate;
