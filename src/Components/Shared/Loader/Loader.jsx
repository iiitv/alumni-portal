import React from 'react'
import { Segment, Dimmer, Loader, Image } from 'semantic-ui-react'
const image = 'https://react.semantic-ui.com/images/wireframe/short-paragraph.png';

const Spinner = () => <Segment style={{height: "100vh" }} > <Dimmer active inverted> <Loader inverted>Loading</Loader> </Dimmer> <Image src={image} /> </Segment>;

export default Spinner;