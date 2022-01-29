import { useEffect, useState } from "react";
import axios from "axios";

export default function useApplicationData() {
  // initial state
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });
  const setDay = (day) => setState({ ...state, day });

  //get the available spots for a particular day
  const getSpotsForDay = function (day, appointments) {
    let spots = 0;
    for (const id of day.appointments) {
      const appointment = appointments[id];
      if (!appointment.interview) {
        spots++;
      }
    }
    return spots;
  };
  // function to update the spots for a specific day
  const updateSpots = function (state, appointments, id) {
    const dayObj = state.days.find((day) => day.name === state.day);
    const spots = getSpotsForDay(dayObj, appointments);
    dayObj.spots = spots;
    const day = { ...dayObj, spots };
    return state.days.map((d) => (d.name === state.day ? day : d));
  };
  // booking interview function
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    //update spots , then set state
    const days = updateSpots(state, appointments, id);

    return axios.put(`/api/appointments/${id}`, appointment).then(() => {
      setState({
        ...state,
        appointments,
        days: days,
      });
    });
  }
  // function to delete an interview
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    // increases spots by 1
    const days = updateSpots(state, appointments, id);

    return axios.delete(`/api/appointments/${id}`, appointment).then(() => {
      setState({
        ...state,
        appointments,
        days: days,
      });
    });
  }
  // api calls to server
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      const [first, second, third] = all;
      setState((prev) => ({
        ...prev,
        days: first.data,
        appointments: second.data,
        interviewers: third.data,
      }));
    });
  }, []);
  return { state, setDay, bookInterview, cancelInterview };
}
