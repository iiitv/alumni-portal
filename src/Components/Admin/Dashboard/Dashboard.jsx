import { useState, useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import "./Dashboard.scss";
import { UserContext } from "../../../providers/UserProvider";
import { Container, Grid, Segment, Image } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import Loader from "../../Shared/Loader/Loader";

const cardStyle = {
  backgroundColor: "#18535B",
  borderRadius: "10px",
};

const dashboardCards = [
  {
    name: "Gallery",
    svgSrc: "/asset/svg/AdminDashboard/gallery.svg",
    align: "left",
    to: "gallery",
  },
  {
    name: "Slider",
    svgSrc: "/asset/svg/AdminDashboard/slider.svg",
    align: "left",
    to: "slider",
  },
  {
    name: "Alumni",
    svgSrc: "/asset/svg/AdminDashboard/alumni.svg",
    align: "left",
    to: "alumni",
  },
  {
    name: "News",
    svgSrc: "/asset/svg/AdminDashboard/newsandblog.svg",
    align: "right",
    to: "add-news",
  },
  {
    name: "Blogs",
    svgSrc: "/asset/svg/AdminDashboard/newsandblog.svg",
    align: "right",
    to: "add-blogs",
  },
  {
    name: "Events",
    svgSrc: "/asset/svg/AdminDashboard/event.svg",
    align: "right",
    to: "events",
  },
];

const DashboardCard = (cardData) => {
  return (
    <Segment padded="very" style={cardStyle}>
      <NavLink strict to={cardData.to}>
        <div className="dashboard-card">
          <h3 className="dashboard-card-head"> {cardData.name} </h3>
          <Image spaced src={cardData.svgSrc} size="mini" floated="right" />
        </div>
      </NavLink>
    </Segment>
  );
};

const Dashboard = () => {
  const info = useContext(UserContext);
  const { user, isLoading } = info;
  const [redirect, setredirect] = useState(null);

  useEffect(() => {
    if (!user && !isLoading) {
      setredirect("/admin-login");
    }
  }, [user, isLoading]);

  if (redirect) {
    return <Redirect to={redirect} />;
  }

  return (
    <div>
      {isLoading && <Loader />}
      {!isLoading && (
        <div>
          <h1 className="dashboard-heading"> Dashboard </h1>
          <Container>
            <Grid stackable columns={2} padded>
              <Grid.Column>
                {dashboardCards
                  .filter((card) => card.align === "left")
                  .map((cardData) => DashboardCard(cardData))}
              </Grid.Column>
              <Grid.Column>
                {dashboardCards
                  .filter((card) => card.align === "right")
                  .map((cardData) => DashboardCard(cardData))}
              </Grid.Column>
            </Grid>
          </Container>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
