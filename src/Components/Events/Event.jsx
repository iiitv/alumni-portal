import './Event.scss'
import {NavLink} from 'react-router-dom';
import { Popup } from 'semantic-ui-react'
import 'semantic-ui-css/components/reset.min.css';
import 'semantic-ui-css/components/site.min.css';
import 'semantic-ui-css/components/container.min.css';
import 'semantic-ui-css/components/icon.min.css';
import 'semantic-ui-css/components/message.min.css';
import 'semantic-ui-css/components/header.min.css';
import { SemanticToastContainer, toast } from 'react-semantic-toasts';
import 'react-semantic-toasts/styles/react-semantic-alert.css';
const Event = () => {
    let events = [
        {
            month: "July",
            date: 15,
            name: "Alumni Speaks : Getting the funds",
            timeline: "Future",
            id:1
        },
        {
            month: "June",
            date: 21,
            name: "Alumni Speaks : Getting the funds",
            timeline: "Future",
            id:2
        },
        {
            month: "May",
            date: 10,
            name: "Lorem Ipsum is simply dummy text",
            timeline: "Past",
            id:3
        },
        {
            month: "December",
            date: 20,
            name: "Alumni Speaks : Getting the funds",
            timeline: "Past",
            id:4
        },
    ];
    const copyLink = (id)=>{
        let link = `http://localhost:3000/event/${id}`;
        navigator.clipboard.writeText(link)
        toast(
            {
                description: <p>Event Link Copied to Clipboard</p>
            },
        );
    }
    const renderEvent = (event) => {
        return (
            <div className="particular-event">
                <div className="event-time-info">
                    <p className="event-month">{event.month.toUpperCase()}</p>
                    <p className="event-date">{event.date}</p>
                </div>
                <div className="event-info">
                    <p className="event-timeline">{event.timeline}</p>
                    <p className="event-name"><NavLink to={`/event/${event.id}`}>{event.name}</NavLink></p>
                    <button className="register-event-btn">Register</button>
                </div>
                <Popup content='Copy Event Link' trigger={<img className="share-event-btn" src={"asset/svg/share.svg"} onClick={()=>{copyLink(event.id)}} alt="" />} />
            </div>
        );
    };
    return (
        <div className="all-event-info">
        <SemanticToastContainer />
            {events.map((event, index) => (
                <div key={index}>{renderEvent(event)}</div>
            ))}
        </div>
    );
}

export default Event;