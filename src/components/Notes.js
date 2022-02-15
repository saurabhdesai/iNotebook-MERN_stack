import React, { useContext, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import notecontext from "../Context/Notes/NoteContext";
import AddNote from "./AddNote";
import NotesItem from "./NotesItem";

function Notes(props) {
  const history = useHistory();
  const context = useContext(notecontext);
  const { notes, getallNotes, editNote } = context;
  const [note, setnote] = useState({
    title: " ",
    description: " ",
    tags: "",
  });

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getallNotes();
    } else {
      history.push("/login");
    }
  }, []);
  //   alert(notes);
  const ref = useRef("");
  const refClose = useRef("");
  const updatenote = (currentnote) => {
    setnote(currentnote);
    ref.current.click();
  };
  const addNotevalues = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value });
  };
  const handleChange = () => {
    props.showAlert("Note updated successfully", "success");
    editNote(note);
    refClose.current.click();
  };
  return (
    <>
      <AddNote />

      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Modal title
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    name="title"
                    onChange={addNotevalues}
                    value={note.title}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputPassword1"
                    name="description"
                    onChange={addNotevalues}
                    value={note.description}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Tags
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="tags"
                    name="tags"
                    onChange={addNotevalues}
                    value={note.tags}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleChange}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="container">
            {notes.length === 0 && "Nothing to display"}
          </div>
          {notes.map((note) => {
            return (
              <NotesItem
                key={note._id}
                note={note}
                showAlert={props.showAlert}
                updatenote={updatenote}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Notes;
