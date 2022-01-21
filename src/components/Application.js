import "components/Application.scss";
import DayList from "components/DayList";
import React, { useState, useEffect } from "react";
import "components/Appointment";
import Appointment from "components/Appointment";
import axios from "axios";
import getAppointmentsForDay from "../helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {},
  });
  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const setDay = (day) => setState({ ...state, day });

  useEffect(() => {
    Promise.all([axios.get("/api/days"), axios.get("/api/appointments")]).then(
      (all) => {
        const [first, second] = all;

        console.log(first, second);
        console.log("DAYS AND APPTS", {
          days: first.data,
          appointments: second.data,
        });
        setState((prev) => ({
          ...prev,
          days: first.data,
          appointments: second.data,
        }));
      }
    );
  }, []);

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} value={state.day} onChange={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {dailyAppointments.map((appointment) => (
          <Appointment key={appointment.id} {...appointment} />
        ))}
      </section>
    </main>
  );
}
