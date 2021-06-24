import React,{ useState } from 'react'
import {Menu,Dropdown} from 'semantic-ui-react'
import "./Navbar.scss"

const Navbar = () => {
    const [activeItem,setActiveItem] = useState("");
    const clickHandler = (name) => {
        setActiveItem(name);
    };
    return (
        <Menu inverted color='teal' stackable= { true } widths={7}>
        <Menu.Item
          name='About Us'
          active={activeItem === 'About Us'}
          onClick={()=>clickHandler("About Us")}
          className='nav-items'
        />

        <Menu.Item
          name='Meet the Alumni'
          active={activeItem === 'Meet the Alumni'}
          onClick={()=>clickHandler("Meet the Alumni")}
          className='nav-items'
        />

        <Menu.Item
          name='News'
          active={activeItem === 'News'}
          onClick={()=>clickHandler("News")}
          className='nav-items'
        />

        <Menu.Item
          name='Events'
          active={activeItem === 'Events'}
          onClick={()=>clickHandler("Events")}
          className='nav-items'
        />

        <Menu.Item
          name='Jobs'
          active={activeItem === 'Jobs'}
          onClick={()=>clickHandler("Jobs")}
          className='nav-items'
        />

        <Menu.Item
          name='Blogs'
          active={activeItem === 'Blogs'}
          onClick={()=>clickHandler("Blogs")}
          className='nav-items'
        />

        <Dropdown item text='More'>
            <Dropdown.Menu>
                <Dropdown.Item text='something more' />
                <Dropdown.Item text='nothing more' />
                <Dropdown.Item text='everything more' />
            </Dropdown.Menu>
        </Dropdown>
        
      </Menu>
    )
}

export default Navbar
