import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import NewsPost from "./Components/News/NewsPost/NewsPost";
import BlogsPost from "./Components/Blog/BlogsPost/BlogsPost";
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
import NewsCard from "./Components/News/NewsCards/NewsCard";
import BlogsCard from "./Components/Blog/BlogsCards/BlogsCard";
import Error404 from "./Components/Shared/Error404/Error404";
import AlumniCard from "./Components/MeetAlumni/AlumniCard/AlumniCard";
import AlumniPage from "./Components/MeetAlumni/AlumniPage/AlumniPage";
import NavDecider from "./Components/Shared/Navbar/NavDecider";
import HeaderDecider from "./Components/Shared/Header/HeaderDecider";
import NewsAdminCard from "./Components/Admin/News/News/NewsDashboard";
import BlogsAdminCard from "./Components/Admin/Blog/BlogDashboard/BlogDashboard";
import AdminNewsPost from "./Components/Admin/News/NewsPost/NewsPost";
import AdminBlogPost from "./Components/Admin/Blog/BlogPost/BlogPost";
import EditNews from "./Components/Admin/News/EditNews/EditNews";
import EditBlog from "./Components/Admin/Blog/EditBlog/EditBlog";

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
                <Route exact path="/news" component={NewsCard} />
                <Route exact path="/news/:id" component={NewsPost} />
                <Route exact path="/events" component={Event} />
                <Route exact path="/event/:id" component={EventPage} />
                <Route exact path="/blogs" component={BlogsCard} />
                <Route exact path="/blogs/:id" component={BlogsPost} />
                <Route exact path="/admin-login" component={AdminLogin} />
                <Route exact path="/admin/add-news" component={AddNews} />
                <Route exact path="/admin/create-blog" component={AddBlog} />
                <Route exact path="/alumni" component={AlumniCard} />
                <Route exact path="/alumni/:id" component={AlumniPage} />
                <Route exact path="/admin/dashboard" component={Dashboard} />
                <Route exact path="/admin/gallery" component={AdminGallery}/>
                <Route exact path="/admin/slider" component={AdminSlider} />
                <Route exact path="/admin/news" component={NewsAdminCard} />
                <Route exact path="/admin/news/:id" component={AdminNewsPost} />
                <Route exact path="/admin/blogs" component={BlogsAdminCard} />
                <Route exact path="/admin/blogs/:id" component={AdminBlogPost} />
                <Route exact path="/admin/news/edit-news/:id" component={EditNews} />
                <Route exact path="/admin/blogs/edit-blog/:id" component={EditBlog} />
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
