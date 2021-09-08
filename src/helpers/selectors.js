export function getAppointmentsForDay(state, day) {
  let appointmentsArray = [];
  const dayObject = state.days.filter(dayOb => dayOb.name === day);
  if (dayObject.length === 0) {
    return [];
  }
  let appointments = dayObject[0].appointments;
  Object.keys(state.appointments).forEach(id => {
    let numId = Number(id);
    if (appointments.includes(numId)) {
      appointmentsArray.push(state.appointments[id])
    }
  })
  return appointmentsArray;
}