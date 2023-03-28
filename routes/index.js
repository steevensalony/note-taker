const express = require('express');

// Import modular routers for notes
const notesRouter = require('./notes');

const app = express();

app.use('/', notesRouter);

module.exports = app;