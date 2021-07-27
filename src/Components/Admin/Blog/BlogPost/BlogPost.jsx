import "./BlogPost.scss";
import { Container, Segment, Popup } from "semantic-ui-react";
import { useLocation } from "react-router";
import { useParams } from "react-router-dom";
import { SemanticToastContainer, toast } from "react-semantic-toasts";
import { useState, useEffect } from 'react';
import { getParticularBlog } from "../../../../services/blogsServices";
import Loader from '../../../Shared/Loader/Loader'
import Error404 from "../../../Shared/Error404/Error404";

const containerMargin = {
  marginTop: "5%",
};

const websitePrefix = "https://iiitv-alumni-portal.netlify.app";

const AdminBlogPost = () => {
  const location = useLocation();
  const [isLoading, setLoading] = useState(true);
  const [blog, setBlog] = useState();
  const [notFound, setNotFound] = useState(false);
  const { id } = useParams();
  const fetchData = async () => {
    let data = await getParticularBlog(id);
    if (data == null) {
      setNotFound(true);
    } else {
      setBlog(data);
    }
    setLoading(false);
  }
  useEffect(() => {
    fetchData();
  })
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
      {!isLoading && !notFound &&
        <div>
          <SemanticToastContainer>
          </SemanticToastContainer>
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
                    <h2 className="page-info-header"> {blog.heading} </h2>
                    <p className="page-info-date"> {blog.date +"  By " + blog.author}</p>
                  </div>
                  <Container textAlign="center">
                    <img
                      src={blog.img}
                      alt="news"
                      className="news-image"
                    />
                  </Container>
                  <p className="container-text">{blog.body}</p>
                  <h1 className="page-footer">@iiitv</h1>
                </Container>
              </div>
            </Segment>
          </Container>
        </div>
      }
    </div>
  );
};

export default AdminBlogPost;
