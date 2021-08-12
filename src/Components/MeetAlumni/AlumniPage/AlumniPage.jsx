import "./AlumniPage.scss";
import { useEffect, useState } from "react";
import { Container, Segment, Popup } from "semantic-ui-react";
import { useLocation, useParams } from "react-router";
import { Link } from "react-router-dom";
import { SemanticToastContainer, toast } from "react-semantic-toasts";
import { getParticularAlumniInfo } from "../../../services/alumniServices"
import Loader from "../../../Components/Shared/Loader/Loader"

const containerMargin = {
  marginTop: "5%",
};

const websitePrefix = "https://iiitv-alumni-portal.netlify.app";

const AlumniPost = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [alumniInfo, setAlumniInfo] = useState({});
  const [notFound, setNotFound] = useState(false);
  const { id } = useParams();
  const { batch } = useParams();
  const getLink = (link) => {
    if(link.includes("http//:") || link.includes("https//:")) return link;
    else return "https//:" + link;
  }

  const fetchData = async () => {
    let data = await getParticularAlumniInfo(batch, id);
    if (data == null) {
      setNotFound(true);
    } else {
      setAlumniInfo(data);
    }
    setLoading(false);
  }
  useEffect(() => {
      fetchData();
  },[]);

  const copyLink = () => {
    let link = websitePrefix + location.pathname;
    console.log(link);
    navigator.clipboard.writeText(link);
    toast({
      description: <p>Blog Link Copied to Clipboard</p>,
    });
  };

  return (
    <div>
      {loading && <Loader />}
      <SemanticToastContainer></SemanticToastContainer>
      {!loading && !notFound &&
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
          <div className="alumni-info">
            <Container fluid style={containerMargin}>
              <div className="alumni-profile">
                <img
                  src={alumniInfo.image ? alumniInfo.image :  "/asset/images/MeetAlumni/male.png"}
                  alt="alumni"
                  className="profile-image"
                />
                <div className="alumni-profile-desc">
                  <h1 className="alumni-name">
                     {alumniInfo.name}
                      </h1>
                  <h3 className="alumni-designation">
                    Batch
                     {alumniInfo.batch} | {alumniInfo.company}
                  </h3>
                  <hr />
                </div>
              </div>
              <p className="alumni-info-description"> 
              {alumniInfo.description}
              </p>
            </Container>
          </div>
          <div className="alumni-footer">
            <div className="alumni-footer-social">
              {!!alumniInfo.linkedin ? (
                <Link to={{ pathname: getLink(alumniInfo.linkedin) }} target="_blank" >
                <img
                  src="/asset/images/Home/HeaderNFooter/linkedin.png"
                  className="social-icon"
                  alt="linkedin handle"
                />
                </Link>
              ) : null}
              {!!alumniInfo.twitter ? ( 
                <Link to={{ pathname: getLink(alumniInfo.twitter) }} target="_blank" >
                <img
                  src="/asset/images/Home/HeaderNFooter/twitter.png"
                  className="social-icon"
                  alt="twitter handle"
                />
                </Link>
              ) : null}
            </div>
            <h1 className="alumni-footer-tag">@iiitv</h1>
          </div>
        </Segment>
      </Container> }
    </div>
  );
};

export default AlumniPost;
