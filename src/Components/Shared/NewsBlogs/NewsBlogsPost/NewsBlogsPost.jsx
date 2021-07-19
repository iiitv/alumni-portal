import "./NewsBlogsPost.scss";
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

const NewsBlogsPost = (props) => {
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
                <h2 className="page-info-header"> Sample Heading </h2>
                <p className="page-info-date">20 June 2021 {(props.isNews) ?  "IIIT Vadodara" : "By keshav agarwal"}</p>
              </div>
              <Container textAlign="center">
                <img
                  src={"/asset/images/NewsAndBlogs/sample-news.png"}
                  alt="news"
                  className="news-image"
                />
              </Container>
              <p className="container-text">{sampleTextSecond}</p>
              <p className="container-text">{sampleText}</p>
              <h1 className="page-footer">@iiitv</h1>
            </Container>
          </div>
        </Segment>
      </Container>
    </div>
  );
};

export default NewsBlogsPost;
