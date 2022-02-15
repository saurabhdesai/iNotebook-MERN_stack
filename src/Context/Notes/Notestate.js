import NoteContext from "./NoteContext";

import React, { useState } from "react";
import Notes from "../../components/Notes";

const Notestate = (props) => {
  const host = "http://localhost:5000";
  const noteinitial = [];
  const [notes, setNotes] = useState(noteinitial);

  const addNote = async (val) => {
    console.log(val);
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(val),
    });
    const json = await response.json();

    const note = {
      _id: json._id,
      user: "62000814a29f6878be947b9b",
      title: json.title,
      description: json.description,
      tags: json.tags,
      timestamp: "2022-02-11T12:09:37.412Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
  };
  const getallNotes = async () => {
    const response = await fetch(`${host}/api/notes/getallnotes`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setNotes(json);
  };

  const editNote = async (note) => {
    console.log(note._id);
    const response = await fetch(`${host}/api/notes/updatenote/${note._id}`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(note),
    });
    const json = await response.json();
    // console.log(json);
    console.log(note);
    let newNote = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNote.length; index++) {
      if (newNote[index]._id == note._id) {
        newNote[index].title = note.title;

        newNote[index].description = note.description;
        newNote[index].tags = note.tags;
        break;
      }
    }

    setNotes(newNote);
  };
  const deleteNote = async (note_id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${note_id}`, {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    console.log(`deleting note with id:${note_id}`);

    const newNote = notes.filter((note) => {
      return note_id !== note._id;
    });
    setNotes(newNote);
  };

  // Default options are marked with *

  return (
    <NoteContext.Provider
      value={{ notes, addNote, editNote, deleteNote, getallNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
export default Notestate;
