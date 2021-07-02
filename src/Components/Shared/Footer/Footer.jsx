import { Menu } from "semantic-ui-react"
import { Link } from "react-router-dom"
import "./Footer.scss"

const Footer = () => {
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
  
  return (
    <>
      <div className="brand-logo-div">
        <img src="asset/images/Home/HeaderNFooter/logo.png" alt="iiitv-logo" className="brand-logo-img" />
      </div>
      <div className="brand-name-div">
        <p className="brand-name-p">Alumni Portal, IIIT Vadodara</p>
      </div>
      <Menu
        widths={9}
        stackable={true}
        borderless={true}
        style={{ padding: "50px 7px 50px 7px" }}
      >
        {items.map((item) => (
          <Menu.Item
            {...item}
            name={item}
            as={Link}
            to={item.link}
            className="footer-items"
          ></Menu.Item>
        ))}
      </Menu>
      <div className="disclaimer-div">
          <p className="disclaimer">
          Disclaimer <br/>
          The contents in the website are for information purpose only. IIIT Vadodara regularly monitors and updates the information on this website. We attempt to ensure that the information on this website is correct, however, we do not warrant its completeness or accuracy. No rights can be derived from the information contained in the IIIT Vadodara website. The website may contain links to websites of third party organizations. IIIT Vadodara cannot be held responsible for any consequences arising from the use of information obtained from these websites.
          </p>
      </div>
    </>
  );
};

export default Footer;