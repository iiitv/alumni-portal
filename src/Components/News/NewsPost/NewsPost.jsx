import "./NewsPost.scss";
import { Container, Segment, Popup } from "semantic-ui-react";
import { useLocation } from "react-router";
import { useParams } from "react-router-dom";
import { SemanticToastContainer, toast } from "react-semantic-toasts";
import { useState, useEffect } from "react";
import { getParticularNews } from "../../../services/newsServices";
import Loader from "../../Shared/Loader/Loader";
import Error404 from "../../Shared/Error404/Error404";

const containerMargin = {
  marginTop: "5%",
};

const websitePrefix = "https://iiitv-alumni-portal.netlify.app";

const NewsBlogsPost = () => {
  const location = useLocation();
  const [isLoading, setLoading] = useState(true);
  const [news, setNews] = useState();
  const [notFound, setNotFound] = useState(false);
  const { id } = useParams();
  const fetchData = async () => {
    let data = await getParticularNews(id);
    if (data == null) {
      setNotFound(true);
    } else {
      setNews(data);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchData();
  });
  const copyLink = () => {
    let link = websitePrefix + location.pathname;
    navigator.clipboard.writeText(link);
    toast({
      description: <p>Blog Link Copied to Clipboard</p>,
    });
  };

  return (
    <div>
      {isLoading && <Loader />}
      {!isLoading && notFound && <Error404 />}
      {!isLoading && !notFound && (
        <div>
          <SemanticToastContainer></SemanticToastContainer>
          <Container style={containerMargin}>
            <Segment>
              <Popup
                content="Copy blog link"
                trigger={
                  <img
                    className="share"
                    src="/asset/svg/share.svg"
                    alt="share"
                    onClick={() => copyLink()}
                  />
                }
              />
              <div className="page">
                <Container fluid style={containerMargin}>
                  <div className="page-info">
                    <h2 className="page-info-header"> {news.heading} </h2>
                    <p className="page-info-date">
                      {news.date + "  " + news.place}
                    </p>
                  </div>
                  <Container textAlign="center">
                    <img src={news.img} alt="news" className="news-image" />
                  </Container>
                  <p className="container-text">{news.body}</p>
                  <h1 className="page-footer">@iiitv</h1>
                </Container>
              </div>
            </Segment>
          </Container>
        </div>
      )}
    </div>
  );
};

export default NewsBlogsPost;
