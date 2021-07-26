import React, { useState, useLayoutEffect, useEffect } from "react";
import { Menu, Icon, Sidebar } from "semantic-ui-react";
import "../Navbar/Navbar.scss";
import { Link } from "react-router-dom";

const navStyle = {
  backgroundColor: "#18535B",
  borderRadius: "0px",
};

const items = [
  { content: "Home", key: "Home", link: "/" },
  { content: "Dashboard", key: "Dashboard", link: "/admin/dashboard" },
  { content: "News", key: "News", link: "/admin/news" },
  { content: "Events", key: "Events", link: "/admin/events" },
  { content: "Slider", key: "Slider", link: "/admin/slider" },
  { content: "Blogs", key: "Blogs", link: "/admin/blogs" },
  { content: "Alumni", key: "Alumni", link: "/admin/alumni" },
  { content: "Gallery", key: "Gallery", link: "/admin/gallery" },
];

const AdminNavbar = (props) => {
  const [visible, setVisible] = useState(false);
  const [size, setSize] = useState([0, 0]);
  const [childrenMobile, setChildrenMobile] = useState(false);
  const [childrenDesktop, setChildrenDesktop] = useState(true);
  useLayoutEffect(() => {
    const updateSize = () => {
      setSize([window.innerWidth, window.innerHeight]);
    };
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    if (size[0] < 700) {
      setChildrenDesktop(false);
      setChildrenMobile(true);
    } else {
      setChildrenDesktop(true);
      setChildrenMobile(false);
    }
  }, [size]);
  const pushHandler = () => {
    if (visible) setVisible(false);
  };
  const [activeItem, setActiveItem] = useState("");
  const clickHandler = (item) => {
    setActiveItem(item.content);
    setVisible(false);
  };
  const toggleHandler = () => setVisible(!visible);

  return (
    <div>
      <div className="desktop-nav">
        <Menu inverted widths={11} style={navStyle}>
          {items.map((item) => (
            <Menu.Item
              {...item}
              name={item}
              active={activeItem === item.content}
              onClick={() => clickHandler(item)}
              className="nav-items"
              as={Link}
              to={item.link}
            ></Menu.Item>
          ))}
        </Menu>
        {childrenDesktop ? props.children : null}
      </div>
      <div className="mobile-nav">
        <Menu inverted style={navStyle} widths={4}>
          <Menu.Item onClick={toggleHandler}>
            <Icon name="sidebar" />
          </Menu.Item>
        </Menu>
        <Sidebar.Pushable className="side-push">
          <Sidebar
            as={Menu}
            animation="overlay"
            direction="top"
            icon="labeled"
            inverted
            style={navStyle}
            vertical
            visible={visible}
          >
            {items.map((item) => (
              <Menu.Item
                {...item}
                name={item}
                active={activeItem === item.content}
                onClick={() => clickHandler(item)}
                className="nav-items"
                as={Link}
                to={item.link}
              ></Menu.Item>
            ))}
          </Sidebar>
          <Sidebar.Pusher
            dimmed={visible}
            onClick={pushHandler}
            style={{ minHeight: "100vh" }}
            className="side-push"
          >
            {childrenMobile ? props.children : null}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    </div>
  );
};

export default AdminNavbar;
