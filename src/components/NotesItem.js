import React, { useContext } from "react";
import notecontext from "../Context/Notes/NoteContext";

function NotesItem(props) {
  const { note, updatenote } = props;
  //   alert(note.title);
  const context = useContext(notecontext);
  const { deleteNote } = context;
  return (
    <div className="col-lg-3">
      <div className="card my-2">
        <div className="card-body">
          <div className="d-flex align-items-center ">
            <h5 className="card-title">{note.title}</h5>
            <i
              className="fa-solid fa-trash-can mx-2"
              onClick={() => {
                props.showAlert("Note deleted successfully", "success");
                return deleteNote(note._id);
              }}
            ></i>
            <i
              className="fa-regular fa-pen-to-square mx-2"
              onClick={() => updatenote(note)}
            ></i>
          </div>

          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
}

export default NotesItem;
