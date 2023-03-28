const express = require('express');
const fs = require('fs');
const path = require('path');
const notes = require('./db/db.json');
const api = require('./routes/index.js')

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', api);

app.use(express.static('public'));

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`)
});
