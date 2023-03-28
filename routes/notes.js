const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const { readFile, writeFile }  = require('fs/promises');

// Get route for retrieving notes
notes.get('/api/notes', (req, res) => {
  readFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
});