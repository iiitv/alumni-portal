import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import NewsBlogsPost from "./Components/NewsBlogs/NewsBlogsPost/NewsBlogsPost";
import Header from "./Components/Shared/Header/Header";
import Footer from "./Components/Shared/Footer/Footer";
import Navbar from "./Components/Shared/Navbar/Navbar";
import Event from './Components/Events/Event';
import AdminLogin from './Components/AdminLogin/AdminLogin'
import EventPage from './Components/Events/EventPage/EventPage'
import AddNews from './Components/Admin/News/AddNews/AddNews'
import { createMedia } from "@artsy/fresnel";
import "semantic-ui-css/components/reset.min.css";
import "semantic-ui-css/components/site.min.css";
import "semantic-ui-css/components/container.min.css";
import "semantic-ui-css/components/icon.min.css";
import "semantic-ui-css/components/message.min.css";
import "semantic-ui-css/components/header.min.css";
import "react-semantic-toasts/styles/react-semantic-alert.css";
import NewsBlogsCard from "./Components/NewsBlogs/NewsBlogsCards/NewsBlogsCard";
import Error404 from "./Components/Shared/Error404/Error404";
import AlumniPage from "./Components/MeetAlumni/AlumniPage/AlumniPage";

const AppMedia = createMedia({
  breakpoints: {
    mobile: 320,
    tablet: 768,
    computer: 992,
    largeScreen: 1200,
    widescreen: 1920,
  },
});

const mediaStyles = AppMedia.createMediaStyle();
const { MediaContextProvider } = AppMedia;

const App = () => {
  return (
    <div>
      <Router>
        <Header />
        <style>{mediaStyles}</style>
        <MediaContextProvider>
          <Navbar>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/news" component={NewsBlogsCard} />
                <Route exact path="/news/:id" component={NewsBlogsPost} />
                <Route exact path="/events" component={Event} />
                <Route exact path="/event/:id" component={EventPage} />
                <Route exact path="/blogs" component={NewsBlogsCard} />
                <Route exact path="/blogs/:id" component={NewsBlogsPost} />
                <Route exact path="/admin-login" component={AdminLogin} />
                <Route exact path="/admin/add-news" component={AddNews} />
                <Route exact path="/meet-the-alumni" component={AlumniPage} />
                <Route component={Error404}/>
            </Switch>
          </Navbar>
        </MediaContextProvider>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
