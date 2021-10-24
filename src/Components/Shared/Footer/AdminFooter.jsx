import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "./AdminFooter.scss";

const AdminFooter = () => {
  const items = [
    { content: "Home", key: "Home", link: "/" },
    {
      content: "Meet the Alumni",
      key: "Meet the Alumni",
      link: "/alumni",
    },
    { content: "News", key: "News", link: "/news" },
    { content: "Events", key: "Events", link: "/events" },
    { content: "Blogs", key: "Blogs", link: "/blogs" },
  ];

  const disclaimerText =
    "The contents in the website are for information purpose only. IIIT Vadodara regularly monitors and updates the information on this website. We attempt to ensure that the information on this website is correct, however, we do not warrant its completeness or accuracy. No rights can be derived from the information contained in the IIIT Vadodara website. The website may contain links to websites of third party organizations. IIIT Vadodara cannot be held responsible for any consequences arising from the use of information obtained from these websites.";

  return (
    <>
      <div className="brand-logo-div">
        <img
          src="/asset/images/Home/HeaderNFooter/logo.png"
          alt="iiitv-logo"
          className="brand-logo-img"
        />
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
          Disclaimer <br />
          {disclaimerText}
        </p>
      </div>
    </>
  );
};

export default AdminFooter;
