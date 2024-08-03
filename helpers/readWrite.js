const notes = require('../db/db.json');

const fs = require ('fs');
const util = require('util');
//generate unique ID (uuid) for each note:
const { v4: uuidv4 } = require('uuid');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

//create new note with title and text in req.body:
const createNote = async (req, res) => {
  const { title, text } = req.body;

  if (title && text) {
    const newNote = {
        title,
        text,
        id: uuidv4()
    };
    
    //read notes already stored in DB:
    try {
        const data = await readFile('./db/db.json', 'utf8');
        notes.push(newNote);

        //writes updated note to DB; displays updated note to user
        await writeFile('./db/db.json', JSON.stringify(notes, null, 4));
        res.status(201).json(notes);
    } catch (error) {
        console.log('Error, please try again');
    }
  } else {
    res.status(400).json({error: 'Title and text required'});
  }
}

//delete note referenced by unique ID:
const deleteNote = async (req, res) => {
    const data = await readFile('./db/db.json', 'utf8');
    const { id } = req.params;
    
    //search for note with uuid:
    const index = notes.findIndex(note => note.id === id);

    //remove note index from array:
    if (index !== -1) {
        notes.splice(index, 1);
        //writes updated db.json file
        await writeFile('./db/db.json', JSON.stringify(notes, null, 4));

        //message for note success or error if not found
        res.status(204).json(notes);
    } else {
        res.status(404).json({error: 'No note found'});
    }
}

module.exports = { createNote, deleteNote };