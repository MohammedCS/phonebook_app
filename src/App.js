import Note from './components/Note'
import { useState, useEffect } from 'react'
import axios from 'axios'

import noteService from './services/note'

const App = () => {
  const [ notes, setNotes ] = useState([])
  const [ newNote, setNewNotes ] = useState('')
  const [ showAll, setShowAll ] = useState(true)

  useEffect(() => {
    noteService
      .getAll()
      .then(intialNotes => {
        setNotes(intialNotes)
      })
  }, [])

  const notesToShow = showAll
  ? notes
  : notes.filter(note => note.important === true)

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
    }

    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNotes('')
      })
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNotes(event.target.value)
  }

  const toggleImportance = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = {...note, important: !note.important}

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(n => n.id !== id ? n : returnedNote))
    })
      .catch(error => {
        alert(
          `the note '${note.content}' was already deleted from server`
        )
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          Show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        { notesToShow.map(note =>
          <Note 
            key={note.id}
            note={note}
            toggleImportance = {
              () => toggleImportance(note.id)
            }
            />
          )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange}/>
        <button type="submit">Save</button>
      </form>
    </div>
  )
}

export default App