// import express library
const express = require("express");

const app = express();
const PORT = 3001;

// serve static content from public folder
app.use(express.static("public"));

// start application
app.listen(PORT, () =>
  console.log(`Note taker app listening at http://localhost:${PORT}`)
);
