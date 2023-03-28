const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const { readFile, writeFile }  = require('fs/promises');

// Get route for retrieving notes
notes.get('/api/notes', (req, res) => {
  readFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
});

// Post route for adding new notes
notes.post('/api/notes', (req, res) => {
  console.log(req.body);

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuidv4().slice()
    };

    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        const parsedData = JSON.parse(data);
        parsedData.push(newNote);
        fs.writeFile('./db/db.json', JSON.stringify(parsedData, null, 4), (err) =>
          err ? console.error(err) : console.info(`\nData written to db.json file.`)
        )
      } 
      res.status(200).json('Your note was successfully added')
    })

  } else {
    res.status(400).json('There was an error while trying to add the recent note')
  }
})

notes.delete('/api/notes/:id', (req, res) => {
  const noteID = req.params.id
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.error (err);
    } else {
      const oldNotes = JSON.parse(data);
      const updatedNotes = oldNotes.filter(function (note) {
        if (noteID === note.id) {
          return false
        } else {
          return true;
        }
      })
    }
  })
})

module.exports = notes;