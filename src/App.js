import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import NewsCards from "./Components/News/NewsCard/NewsCard";
import NewsPost from "./Components/News/NewsPost/NewsPost"
import BlogCards from "./Components/Blog/BlogCard/BlogCard";
import BlogPost from './Components/Blog/BlogPost/BlogPost'
import Header from "./Components/Shared/Header/Header";
import Footer from "./Components/Shared/Footer/Footer";
import Event from './Components/Events/Event';
import AdminLogin from './Components/AdminLogin/AdminLogin'
import EventPage from './Components/Events/EventPage/EventPage'
import AddNews from './Components/Admin/News/AddNews/AddNews'
import AddBlog from './Components/Admin/Blog/AddBlog/AddBlog'
import AdminGallery from './Components/Admin/Gallery/Gallery';
import AdminSlider from './Components/Admin/Slider/Slider'
import Dashboard from "./Components/Admin/Dashboard/Dashboard";
import { createMedia } from "@artsy/fresnel";
import 'semantic-ui-css/components/reset.min.css';
import 'semantic-ui-css/components/site.min.css';
import 'semantic-ui-css/components/container.min.css';
import 'semantic-ui-css/components/icon.min.css';
import 'semantic-ui-css/components/message.min.css';
import 'semantic-ui-css/components/header.min.css';
import 'react-semantic-toasts/styles/react-semantic-alert.css';
import UserProvider from './providers/UserProvider';
// import NewsBlogsCard from "./Components/NewsBlogs/NewsBlogsCards/NewsBlogsCard";
import Error404 from "./Components/Shared/Error404/Error404";
import AlumniCard from "./Components/MeetAlumni/AlumniCard/AlumniCard";
import AlumniPage from "./Components/MeetAlumni/AlumniPage/AlumniPage";
import NavDecider from "./Components/Shared/Navbar/NavDecider";
import HeaderDecider from "./Components/Shared/Header/HeaderDecider";
import NewsBlogsAdminCard from "./Components/Admin/News/NewsBlogsDashboard/NewsBlogsDashboard";

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
      <UserProvider>
        <Router>
          <HeaderDecider />
          <style>{mediaStyles}</style>
          <MediaContextProvider>
            <NavDecider>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/news" component={NewsCards} />
                <Route exact path="/news/:id" component={NewsPost} />
                <Route exact path="/events" component={Event} />
                <Route exact path="/event/:id" component={EventPage} />
                <Route exact path="/blogs" component={BlogCards} />
                <Route exact path="/blogs/:id" component={BlogPost} />
                <Route exact path="/admin-login" component={AdminLogin} />
                <Route exact path="/admin/add-news" component={AddNews} />
                <Route exact path="/admin/add-blogs" component={AddBlog} />
                <Route exact path="/alumni" component={AlumniCard} />
                <Route exact path="/alumni/:id" component={AlumniPage} />
                <Route exact path="/admin/dashboard" component={Dashboard} />
                <Route exact path="/admin/gallery" component={AdminGallery}/>
                <Route exact path="/admin/slider" component={AdminSlider} />
                <Route exact path="/admin/news" component={NewsBlogsAdminCard} />
                <Route exact path="/admin/blogs" component={NewsBlogsAdminCard} />
                <Route component={Error404} />
              </Switch>
            </NavDecider>
          </MediaContextProvider>
          <Footer />
        </Router>
      </UserProvider>
    </div>
  );
};

export default App;
