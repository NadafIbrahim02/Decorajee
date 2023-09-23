import React, { useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { DesktopOutlined } from "@ant-design/icons";
import { ConfigProvider, Layout, Menu } from "antd";
import { BsFillDropletFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { GiDeadWood, GiFoam, GiRolledCloth } from "react-icons/gi";
import { FaList, FaListCheck } from "react-icons/fa6";
import "../App.css";
const { Sider } = Layout;

function getItem(label, key, icon, children, onClick) {
  return {
    key,
    icon,
    children,
    label,
    onClick,
  };
}

const Sidebar = ({ setCollapeValue }) => {
  const navigate = useNavigate();
  const { activeMenu, setActiveMenu, screenSize } = useStateContext();
  const [collapsed, setCollapsed] = useState(false);

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const items = [
    getItem(
      "Dashboard",
      "1",
      <DesktopOutlined style={{ fontSize: "19px" }} />,
      null,
      () => navigate("/")
    ),
    getItem("Foams", "2", <GiFoam style={{ fontSize: "19px" }} />, null, () =>
      navigate("/Foam")
    ),
    getItem(
      "Woods",
      "3",
      <GiDeadWood style={{ fontSize: "19px" }} />,
      null,
      () => navigate("/Woods")
    ),
    getItem(
      "Colors",
      "4",
      <BsFillDropletFill style={{ fontSize: "19px" }} />,
      null,
      () => navigate("/Colors")
    ),
    getItem(
      "Fabric",
      "5",
      <GiRolledCloth style={{ fontSize: "19px" }} />,
      null,
      () => navigate("/Fabric")
    ),
    getItem(
      "MainCategory",
      "6",
      <FaListCheck style={{ fontSize: "19px" }} />,
      null,
      () => navigate("/MainCategory")
    ),
    getItem(
      "CustomSofaCategory",
      "7",
      <FaList style={{ fontSize: "19px" }} />,
      null,
      () => navigate("/CustomSofaCategory")
    ),
  ];

  return (
    <div className="md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <div>
          {/* <div className="text-xl">Decorajee Admin</div> */}

          <Layout
            style={{
              minHeight: "100vh",
            }}
          >
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: localStorage.getItem("colorMode") ?? "#1A97F5",
                },
              }}
            >
              <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => {
                  setCollapsed(value);
                  setCollapeValue(value);
                }}
              >
                <div className="demo-logo-vertical text-[100%] my-4 font-body text-center text-white ">
                  Decorajee Admin
                </div>
                <Menu
                  theme="dark"
                  defaultSelectedKeys={["1"]}
                  mode="inline"
                  items={items}
                />
              </Sider>
            </ConfigProvider>
          </Layout>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
