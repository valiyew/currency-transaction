import { useEffect, useState } from "react";
import {
  HomeOutlined,
  ScheduleOutlined,
  RetweetOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";

import { Button, Layout, Menu } from "antd";
import { Routes } from "../routes";
import { useNavigate } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const LayoutComponent = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const getKey = localStorage.getItem("Key");

  const SiderMenu = [
    {
      key: "1",
      icon: <HomeOutlined />,
      label: "Dashboard",
    },
    {
      key: "2",
      icon: <RetweetOutlined />,
      label: "Current-Conversion",
    },
    {
      key: "3",
      icon: <RetweetOutlined />,
      label: "Convert",
    },

  ];

  const setNavigation = (e: any) => {
    const clickedItem = SiderMenu.find((item) => item.key === e.key);

    navigate(
      `${
        clickedItem?.label === "Dashboard"
          ? "/"
          : `${clickedItem?.label.toLowerCase()}`
      }`
    );

    localStorage.setItem("Key", e.key);
  };

  return (
    <Layout style={{ width: "100%", height: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          style={{ background: "rgba(42, 63, 84, 255)", height: "100%" }}
          theme="dark"
          defaultSelectedKeys={[`${getKey}`]}
          items={SiderMenu}
          onClick={setNavigation}
        />
      </Sider>
      <Layout style={{ background: "rgba(237, 237, 237, 255)" }}>
        <Header
          style={{
            padding: 0,
            margin: "10px 10px 0px 10px",
            borderRadius: "5px",
            background: "#fff",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "15px 10px",
            padding: 10,
            background: "#fff",
            borderRadius: "5px",
          }}
        >
          <Routes />
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutComponent;
