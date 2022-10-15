// import express library
const express = require("express");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const fs = require("fs");
const notes = require("./db/db.json");

const app = express();
const PORT = 3001;

const writeToFile = (data) => {
  fs.writeFile(path.join(__dirname, "/db/db.json"), data, (err) =>
    err ? console.log(err) : console.log(`Successfully updated database!`)
  );
};

// Middleware for parsing application/json
app.use(express.json());
// serve static content from public folder
app.use(express.static("public"));

// GET Route for notes
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

app.get("/api/notes", (req, res) => {
  res.json(notes);
});

app.delete("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  // find index of note with given id
  const index = notes.findIndex((note) => note.id === id);
  if (index !== -1) {
    // remove the note at index from array
    notes.splice(index, 1);
    writeToFile(JSON.stringify(notes, null, 2));
    res.status(200).json({ status: "success" });
  } else {
    res.status(404).json({ status: `note with '${id}' not found!` });
  }
});

// start application
app.listen(PORT, () =>
  console.log(`Note taker app listening at http://localhost:${PORT}`)
);
