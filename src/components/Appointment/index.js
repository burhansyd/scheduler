import React from "react";
import "components/Appointment/styles.scss"
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Status from "./Status";
import { useVisualMode } from "hooks/useVisualMode";
import Form from "./Form";
import Confirm from "./Confirm";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  )
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview);
    transition(SHOW);
  };
  function confirmer() {
    transition(CONFIRM);
  };
  function canceler() {
    transition(SHOW);
  };
  function deleter() {
    transition(DELETING);
    props.cancelInterview(props.id);
    transition(EMPTY);
  };
  function editer() {
    transition(EDIT);
  }
  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={confirmer}
          onEdit={editer}
        />
      )}
      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={() => back(EMPTY)} onSave={save}/>}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === CONFIRM && <Confirm message="Are you sure you would like to delete?" onCancel={canceler} onConfirm={deleter} />}
      {mode === EDIT && <Form interviewers={props.interviewers} interviewer={props.interview.interviewer.id} name={props.interview.student} onCancel={() => back(SHOW)} onSave={save} />}
    </article>
  )
}