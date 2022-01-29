import React from "react";

import Header from "./Header";
import Show from "./Show";
import Form from "./Form";
import Empty from "./Empty";
import Status from "./Status";
import Error from "./Error";
import Confirm from "./Confirm";
import "./styles.scss";
import useVisualMode from "../../hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETE = "DELETE";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVING = "ERROR_SAVING";
const ERROR_DELETING = "ERROR_DELETING";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // when saving an edit, call book interview and set state.
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVING, true));
  }
  // delete appointment function calls cancel interview function and updates state
  function deleteAppt() {
    transition(DELETE, true);
    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETING, true));
  }

  function confirmCancel() {
    transition(CONFIRM);
  }
  function edit() {
    transition(EDIT);
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && (
        <Form interviewers={props.interviewers} onCancel={back} onSave={save} />
      )}
      {mode === SAVING && <Status message="SAVING..." />}
      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you want to delete?"
          onConfirm={deleteAppt}
          onCancel={back}
        />
      )}

      {}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={confirmCancel}
          onEdit={edit}
        />
      )}

      {mode === EDIT && (
        <Form
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === DELETE && <Status message="DELETING..." />}
      {mode === ERROR_DELETING && (
        <Error
          message="Something went wrong when trying to delete."
          onClose={back}
        />
      )}
      {mode === ERROR_SAVING && (
        <Error
          message="Something went wrong when trying to save."
          onClose={back}
        />
      )}
    </article>
  );
}
