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
  { content: "About Us", key: "About Us", link: "/aboutus" },
  {
    content: "Meet the Alumni",
    key: "Meet the Alumni",
    link: "/MeetTheAlumni",
  },
  { content: "News", key: "News", link: "/news" },
  { content: "Events", key: "Events", link: "/events" },
  { content: "Jobs", key: "Jobs", link: "/jobs" },
  { content: "Blogs", key: "Blogs", link: "/blogs" },
];

const NavBarChildren = (props) => (
  <Container fluid>{props.children}</Container>
);

const NavBarMobile = (props) => {
  const [visible, setVisible] = useState(false);
  const pushHandler = () => {
    if(visible)
      setVisible(false);
  }
  const [activeItem, setActiveItem] = useState("");
  const clickHandler = (item) => {
    setActiveItem(item.content);
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
          
           {/* <NavBarChildren /> */}
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
            {props.children}
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
