export default function getAppointmentsForDay(state, day) {
  var result = [];
  for (const key of state.days) {
    if (key.name === day) {
      for (const key2 of key.appointments) {
        if (state.appointments[key2]) {
          result.push(state.appointments[key2]);
        }
      }
    }
  }
  return result;
}

function getInterview(state, interview) {
  const object = {};
  if (!interview) {
    return null;
  } else {
    object["student"] = interview.student;
    object["interviewer"] = state.interviewers[interview.interviewer];
  }
  return object;
}

function getInterviewersForDay(state, day) {
  var result = [];
  for (const key of state.days) {
    if (key.name === day) {
      for (const key2 of key.interviewers) {
        if (state.interviewers[key2]) {
          result.push(state.interviewers[key2]);
        }
      }
    }
  }
  return result;
}
export { getInterviewersForDay, getInterview };
