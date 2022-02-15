import React, { useContext, useState } from "react";
import notecontext from "../Context/Notes/NoteContext";

function AddNote() {
  const context = useContext(notecontext);
  const { addNote } = context;

  const [note, setnote] = useState({ title: " ", description: " ", tags: " " });
  const handleChange = (e) => {
    e.preventDefault();
    addNote(note);
    setnote({ title: " ", description: " ", tags: " " });
  };
  const addNotevalues = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div className="container my-4">
      <h1>Add your notes here</h1>
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

        <button
          disabled={note.title.length < 5 || note.description.length < 5}
          type="submit"
          onClick={handleChange}
          className="btn btn-primary"
        >
          Add Note
        </button>
      </form>
    </div>
  );
}

export default AddNote;
