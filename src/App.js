import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./Components/Home/index";
import NewsBlogs from "./Components/News/NewsBlogs/NewsBlogs";
import Header from "./Components/Shared/Header/Header";
import Footer from "./Components/Shared/Footer/Footer";
import Navbar from "./Components/Shared/Navbar/Navbar";
import Event from './Components/Events/Event'
import { createMedia } from "@artsy/fresnel";
import 'semantic-ui-css/components/reset.min.css';
import 'semantic-ui-css/components/site.min.css';
import 'semantic-ui-css/components/container.min.css';
import 'semantic-ui-css/components/icon.min.css';
import 'semantic-ui-css/components/message.min.css';
import 'semantic-ui-css/components/header.min.css';
import 'react-semantic-toasts/styles/react-semantic-alert.css';
import News from "./Components/News/News";

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
              <Route exact path="/" component={HomePage} />
              <Route exact path="/news" component={News} />
              <Route exact path="/news/:id" component={NewsBlogs} />
              <Route exact path="/events" component={Event} />
              <Route exact path="/event/:id" component={Event} />
            </Switch>
          </Navbar>
        </MediaContextProvider>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
