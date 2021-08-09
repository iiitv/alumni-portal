import "./AlumniPage.scss";
import { useEffect, useState } from "react";
import { Container, Segment, Popup } from "semantic-ui-react";
import { useLocation } from "react-router";
import { SemanticToastContainer, toast } from "react-semantic-toasts";
import { UserContext } from "../../../../providers/UserProvider";

const containerMargin = {
  marginTop: "5%",
};

const websitePrefix = "https://iiitv-alumni-portal.netlify.app";

const sampleText =
  "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa strong. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pedejusto, fringilla vel, aliquet nec, vulputate eget, arcu. In enimjusto, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullamdictum felis eu pede link mollis pretium. Integer tincidunt.Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequatvitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut ";
const sampleTextSecond =
  "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa strong. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pedejusto, fringilla vel, aliquet nec, vulputate eget, arcu. In enimjusto, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullamdictum felis eu pede link mollis pretium. Integer tincidunt.Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequatvitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut ";
const aboutSampleText =
  "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa strong";

const AlumniPost = (props) => {
  const location = useLocation();
  const [alumniInfo, setAlumniInfo] = useState({
    batch: "",
    name: "",
    company: "",
    description: "",
    linkedin: "",
    twitter: "",
    image: null,
  });

  useEffect(() => {
    setAlumniInfo({
      batch: props.location.alumni.batch,
      name: props.location.alumni.name,
      company: props.location.alumni.company,
      description: props.location.alumni.description,
      linkedin: props.location.alumni.linkedin,
      twitter: props.location.alumni.twitter,
      image: props.location.alumni.image,
    });
  }, []);

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
          <div className="alumni-info">
            <Container fluid style={containerMargin}>
              <div className="alumni-profile">
                <img
                  src={alumniInfo.image}
                  alt="news"
                  className="profile-image"
                />
                <div className="alumni-profile-desc">
                  <h1 className="alumni-name"> {alumniInfo.name} </h1>
                  <h3 className="alumni-designation">
                    Batch {alumniInfo.batch} | {alumniInfo.company}
                  </h3>
                  <hr />
                  {/* <p> {aboutSampleText} </p> */}
                </div>
              </div>
              <p className="alumni-info-description">{alumniInfo.description}</p>
              {/* <p className="alumni-info-description">{sampleText}</p> */}
            </Container>
          </div>
          <div className="alumni-footer">
            <div className="alumni-footer-social">
              {!!alumniInfo.linkedin ? (
                  <a href={alumniInfo.twitter}>
                <img
                  src="/asset/images/Home/HeaderNFooter/linkedin.png"
                  className="social-icon"
                  alt="linkedin handle"
                />
                </a>
              ) : null}
              {!!alumniInfo.twitter ? ( 
                  <a href={alumniInfo.twitter}>
                <img
                  src="/asset/images/Home/HeaderNFooter/twitter.png"
                  className="social-icon"
                  alt="twitter handle"
                />
                  </a>
              ) : null}
            </div>
            <h1 className="alumni-footer-tag">@iiitv</h1>
          </div>
        </Segment>
      </Container>
    </div>
  );
};

export default AlumniPost;
