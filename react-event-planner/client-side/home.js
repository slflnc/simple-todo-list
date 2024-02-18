import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';
import { DayPilotCalendar } from "@daypilot/daypilot-lite-react";
import Calendar from './calendar';

const Home = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/events`);
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
        // to handle the error, display a message to the user, or retry the request
      }
    };

    fetchEvents();
  }, []);

  return (
    <div>
      <h1 id='title'>Upcoming Events</h1>
      <ul>
        {events.map(event => (
          <li key={event._id}>{event.title} - {event.date}</li>
        ))}
      </ul>
      {<Calendar />}
    </div>
  );
};

export default Home; 
