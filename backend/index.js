
const express = require('express');
const app = express(),
      bodyParser = require("body-parser");
      port = 4000;

const fs = require('fs');
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            
   optionSuccessStatus:200,
}
app.use(cors(corsOptions))

let rawdata = fs.readFileSync('data.json');
let notes = JSON.parse(rawdata);

app.use(bodyParser.json());

app.get('/', (req,res) => {
  res.send('App Works !!!!');
});

app.get('/api/notes', (req, res) => {
  debugger;
  console.log('api/noets called!!!!')
  res.json(notes);
});

app.post('/api/addnote1', (req, res) => {
  const note = req.body.note;
  console.log('Adding note:', note);
  notes.push(note);
  fs.writeFileSync('data.json', JSON.stringify(notes,null, 2));
  res.json("noet addedd");
});

app.put('/api/editnote', (req, res) => {
  const newnote = req.body.note;
  notes.forEach((note, index) => {
      if (note.id === newnote.id) {
        notes[index].title = newnote.title
        notes[index].body = newnote.body
      }
    });
  fs.writeFileSync('data.json', JSON.stringify(notes,null, 2));
  res.json("noet editeddd");
});

app.delete('/api/deleteNote/:id', (req, res) => {
 const noteId = req.params.id;
 console.log(noteId)
  notes.forEach((note, index) => {
    console.log(note.body)
    if (note.id == noteId) {
      notes.splice(index, 1);
    }
  });
  console.log('delete user:', noteId);
  res.json("noet deleted");
  fs.writeFileSync('data.json', JSON.stringify(notes, null, 2));
});


app.listen(port, () => {
    console.log(`Server listening on the port:${port}`);
});