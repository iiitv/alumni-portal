import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./Components/Home/index";
import NewsBlogs from "./Components/NewsBlogs/NewsBlogs";
import Header from "./Components/Shared/Header/Header";
import Footer from "./Components/Shared/Footer/Footer";
import Navbar from "./Components/Shared/Navbar/Navbar";
import { createMedia } from "@artsy/fresnel";

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
              <Route exact path="/News" component={NewsBlogs} />
            </Switch>
          </Navbar>
        </MediaContextProvider>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
