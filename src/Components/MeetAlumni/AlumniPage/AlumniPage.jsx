import "./AlumniPage.scss";
import { Container, Segment, Popup } from "semantic-ui-react";
import { useLocation } from "react-router";
import { SemanticToastContainer, toast } from "react-semantic-toasts";

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

const NewsBlogsPost = () => {
  const location = useLocation();
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
                  src={"/asset/images/MeetAlumni/man.png"}
                  alt="news"
                  className="profile-image"
                />
                <div className="alumni-profile-desc">
                  <h1 className="alumni-name"> Anvaya shah </h1>
                  <h3 className="alumni-designation">
                    Batch 2020 | Mtech IIT Ropar
                  </h3>
                  <hr />
                  <p> {aboutSampleText} </p>
                </div>
              </div>
              <p className="alumni-info-description">{sampleTextSecond}</p>
              <p className="alumni-info-description">{sampleText}</p>
            </Container>
          </div>
          <div className="alumni-footer">
            <div className="alumni-footer-social">
              <img
                src="/asset/images/Home/HeaderNFooter/facebook.png"
                className="social-icon"
                alt="facebook handle"
              />
              <img
                src="/asset/images/Home/HeaderNFooter/linkedin.png"
                className="social-icon"
                alt="linkedin handle"
              />
              <img
                src="/asset/images/Home/HeaderNFooter/twitter.png"
                className="social-icon"
                alt="twitter handle"
              />
            </div>
            <h1 className="alumni-footer-tag">@iiitv</h1>
          </div>
        </Segment>
      </Container>
    </div>
  );
};

export default NewsBlogsPost;
