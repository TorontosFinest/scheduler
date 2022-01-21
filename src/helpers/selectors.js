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
