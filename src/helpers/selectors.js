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

export function getInterview(state, interview) {
  if (interview) {
    const interviewerId = interview.interviewer
    return {
      student: interview.student,
      interviewer: {
        id: state.interviewers[interviewerId].id,
        name: state.interviewers[interviewerId].name,
        avatar: state.interviewers[interviewerId].avatar
      }
    }
  }
  if (!interview) {
    return null;
  }
}

export function getInterviewersForDay(state, day) {
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
  let interviewersArray = [];
  appointmentsArray.forEach(appointment => {
    if (appointment.interview) {
      interviewersArray.push(state.interviewers[appointment.interview.interviewer]);
    }
  })
  return interviewersArray;
};