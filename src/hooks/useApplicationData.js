import { useEffect, useState } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {},
    interviewers: {},
  });
  const setDay = (day) => setState({ ...state, day });

  function bookInterview(id, interview) {
    // console.log("bookInterview info: ", id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const currentDay = state.days.find((day) => day.appointments.includes(id));
    const newDay = { ...currentDay, spots: currentDay.spots - 1 };
    // console.log("newday:", newDay);
    // console.log("found day is", findDay);
    // console.log("days are", state.days);
    const newDays = state.days.map((day) => {
      return day.name === state.day ? newDay : day;
    });
    // console.log("new  days ", newDays);

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
    // console.log("newday:", newDay);
    // console.log("found day is", findDay);
    // console.log("days are", state.days);
    const newDays = state.days.map((day) => {
      return day.name === state.day ? newDay : day;
    });
    // console.log("new  days ", newDays);

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

      //   console.log(first, second, third);
      //   console.log("DAYS AND APPTS AND INTERVIEWERS", {
      //     days: first.data,
      //     appointments: second.data,
      //     interviewers: third.data,
      //   });
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
