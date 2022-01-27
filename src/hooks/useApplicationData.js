import { useEffect, useState } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });
  const setDay = (day) => setState({ ...state, day });

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const currentDay = state.days.find((day) => day.appointments.includes(id));
    const bookedAppointments = Object.values(appointments).filter(
      (appointment) => {
        return (
          currentDay.appointments.includes(appointment.id) &&
          appointment.interview
        );
      }
    );
    const newDay = { ...currentDay, spots: 5 - bookedAppointments.length };

    const newDays = state.days.map((day) => {
      return day.name === state.day ? newDay : day;
    });

    return axios
      .put(`http://localhost:8001/api/appointments/${id}`, appointment)
      .then(() => {
        setState({
          ...state,
          appointments,
          days: newDays,
        });
      });
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const currentDay = state.days.find((day) => day.appointments.includes(id));
    const newDay = { ...currentDay, spots: currentDay.spots + 1 };

    const newDays = state.days.map((day) => {
      return day.name === state.day ? newDay : day;
    });

    return axios
      .delete(`http://localhost:8001/api/appointments/${id}`, appointment)
      .then(() => {
        setState({
          ...state,
          appointments,
          days: newDays,
        });
      });
  }

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
