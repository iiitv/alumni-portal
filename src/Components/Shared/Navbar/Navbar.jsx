import React, { useState } from "react";
import { Menu, Container, Icon, Sidebar } from "semantic-ui-react";
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

// const mediaStyles = AppMedia.createMediaStyle();
const { Media } = AppMedia;

const items = [
  { content: "Home", key: "Home", link: "/" },
  { content: "About Us", key: "About Us", link: "/AboutUs" },
  {
    content: "Meet the Alumni",
    key: "Meet the Alumni",
    link: "/MeetTheAlumni",
  },
  { content: "News", key: "News", link: "/News" },
  { content: "Events", key: "Events", link: "/Events" },
  { content: "Jobs", key: "Jobs", link: "/Jobs" },
  { content: "Blogs", key: "Blogs", link: "/Blogs" },
];

const NavBarChildren = (props) => (
  <Container fluid={true}>{props.children}</Container>
);

const NavBarMobile = (props) => {
  const [visible, setVisible] = useState(false);
  const pushHandler = () => {
    if (visible) setVisible(false);
  };
  const toggleHandler = () => setVisible(!visible);
  return (
    <>
      <Menu inverted style={navStyle} widths={4}>
        <Menu.Item onClick={toggleHandler}>
          <Icon name="sidebar" />
        </Menu.Item>
      </Menu>
      <Sidebar.Pushable>
        <Sidebar
          as={Menu}
          animation="overlay"
          direction="top"
          icon="labeled"
          inverted
          style={navStyle}
          items={items}
          vertical
          visible={visible}
        ></Sidebar>
        <Sidebar.Pusher
          dimmed={visible}
          onClick={pushHandler}
          style={{ minHeight: "100vh" }}
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
    <Menu inverted widths={9} style={navStyle}>
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
  );
};

const Navbar = (props) => {
  return (
    <div>
      <Media at="mobile">
        <NavBarMobile>
          <NavBarChildren>{props.children}</NavBarChildren>
        </NavBarMobile>
      </Media>

      <Media greaterThan="mobile">
        <NavBarDesktop />
        <NavBarChildren>{props.children}</NavBarChildren>
      </Media>
    </div>
  );
};

export default Navbar;
