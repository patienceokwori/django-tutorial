import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note";
import "../styles/Home.css";


function Home() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = () => {
    api
      .get("/api/notes/")
      .then((res) => {
        setNotes(res.data);
        console.log(res.data);
      })
      .catch((err) => alert("Error fetching notes: " + err));
  };

  const createNote = (e) => {
    e.preventDefault();
    api
      .post("/api/notes/", { title, content })
      .then((res) => {
        if (res.status === 201) {
          alert("Note created!");
          setTitle("");
          setContent("");
          getNotes();
        }
      })
      .catch((err) => alert("Error creating note: " + err));
  };

  const deleteNote = (id) => {
    api
      .delete(`/api/notes/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) {
          alert("Note deleted!");
          getNotes();
        } else {
          alert("Failed to delete note.");
        }
      })
      .catch((error) => alert("Error deleting note: " + error));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Notes</h2>

      {/* Form to Create Note */}
      <form onSubmit={createNote}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ display: "block", marginBottom: "10px", width: "300px" }}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          style={{ display: "block", marginBottom: "10px", width: "300px", height: "100px" }}
        />
        <button type="submit">Add Note</button>
      </form>

      {/* Display Notes Using <Note /> */}
      <div style={{ marginTop: "30px" }}>
        {notes.length === 0 ? (
          <p>No notes found.</p>
        ) : (
          notes.map((note) => (
            <Note key={note.id} note={note} onDelete={deleteNote} />
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
