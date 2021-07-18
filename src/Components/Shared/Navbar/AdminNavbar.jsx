import React, { useState } from "react";
import { Menu, Icon, Sidebar } from "semantic-ui-react";
import "../Navbar/Navbar.scss";
import { createMedia } from "@artsy/fresnel";
import { Link } from "react-router-dom";

const navStyle = {
  backgroundColor: "#18535B",
  borderRadius: "0px",
};

const AppMedia = createMedia({
  breakpoints: {
    mobile: 320,
    tablet: 768,
    computer: 992,
    largeScreen: 1200,
    widescreen: 1920,
  },
});

const { Media } = AppMedia;

const items = [
  {content: "Website", key: "Website", link: "/"}, 
  { content: "Dashboard", key: "Dashboard", link: "/admin/dashboard" },
  { content: "News", key: "News", link: "/admin/news" },
  { content: "Events", key: "Events", link: "/admin/events" },
  { content: "Slider", key: "Slider", link: "/admin/slider" },
  { content: "Blogs", key: "Blogs", link: "/admin/blogs" },
  { content: "Alumni", key: "Alumni", link: "/admin/alumni" },
  { content: "Gallery", key: "Gallery", link: "/admin/gallery" },
];

const NavBarMobile = (props) => {
  const [visible, setVisible] = useState(false);
  const pushHandler = () => {
    if(visible)
      setVisible(false);
  }
  const [activeItem, setActiveItem] = useState("");
  const clickHandler = (item) => {
    setActiveItem(item.content);
    setVisible(false);
  };
  const toggleHandler = () => setVisible(!visible);
  return (
    <>
      <Menu inverted style={navStyle} widths={4}>
          <Menu.Item onClick={toggleHandler}>
            <Icon name="sidebar" />
          </Menu.Item>
        </Menu>
      <Sidebar.Pushable className='side-push'>
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
            <Menu.Item {...item} 
              name={item}
              active={activeItem === item.content}
              onClick={() => clickHandler(item)}
              className="nav-items"
              as = { Link }
              to = {item.link}
            >
            </Menu.Item>
        ))}
        </Sidebar>
        <Sidebar.Pusher
          dimmed={visible}
          onClick={pushHandler}
          style={{ minHeight: "100vh" }}
          className='side-push'
        >
          {props.children}
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </>
  );
};

const NavBarDesktop = (props) => {
  const [activeItem, setActiveItem] = useState("");
  const clickHandler = (item) => {
    setActiveItem(item.content);
  };
  return (
    <>
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
      {props.children}
    </>
  );
};

const AdminNavbar = (props) => {
  return (
    <div>
      <Media at="mobile">
        <NavBarMobile>
            {props.children}
        </NavBarMobile>
      </Media>

      <Media greaterThan="mobile">
        <NavBarDesktop>
            {props.children}
        </NavBarDesktop>
      </Media>
    </div>
  );
};

export default AdminNavbar;
