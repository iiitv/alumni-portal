import React,{ useState } from 'react'
import {Menu} from 'semantic-ui-react'

const Footer = () => {
    const [activeItem,setActiveItem] = useState("");
    const clickHandler = (name) => {
        setActiveItem(name);
    };
    const navStyle = {
        // backgroundColor: '#006ED9',
        // borderRadius: '10px'
        color: '#006ED9'

    }
    return (
        <Menu widths={9} stackable= { true } borderless = {true} style = {{ padding: '50px 7px 50px 7px' }}>
        
        <Menu.Item
          name='About Us'
          active={activeItem === 'About Us'}
          onClick={()=>clickHandler("About Us")}
          className='nav-items'
          style= {navStyle}
        />

        <Menu.Item
          name='Meet the Alumni'
          active={activeItem === 'Meet the Alumni'}
          onClick={()=>clickHandler("Meet the Alumni")}
          className='nav-items'
          style= {navStyle}
        />

        <Menu.Item
          name='News'
          active={activeItem === 'News'}
          onClick={()=>clickHandler("News")}
          className='nav-items'
          style= {navStyle}
        />

        <Menu.Item
          name='Events'
          active={activeItem === 'Events'}
          onClick={()=>clickHandler("Events")}
          className='nav-items'
          style= {navStyle}
        />

        <Menu.Item
          name='Jobs'
          active={activeItem === 'Jobs'}
          onClick={()=>clickHandler("Jobs")}
          className='nav-items'
          style= {navStyle}
        />

        <Menu.Item
          name='Blogs'
          active={activeItem === 'Blogs'}
          onClick={()=>clickHandler("Blogs")}
          className='nav-items'
          style= {navStyle}
        />
        
      </Menu>
    )
}

export default Footer;
