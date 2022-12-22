import { useState } from "react"

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchList, setNewSearch] = useState(persons)

  const nameList = persons.map(person => person.name)

  const handleAddNewName = (event) => {
    event.preventDefault();
    if (nameList.includes(newName)) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      const personObject = {
        id: persons.length + 1,
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleSearchChange = (event) => {
    const search = event.target.value.toLowerCase()
    const res = persons.filter(person => 
      person.name.toLowerCase().includes(search) 
      )
    setNewSearch(res)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <form>
          filter shown with:
          <input onChange={handleSearchChange} />
        </form>
      </div>
      <h2>add a new</h2>
      <form onSubmit={handleAddNewName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        <ul>
          {searchList.map(person =>
            <li key={person.id}>
              {person.name}: {person.number}
            </li>)}
        </ul>
      </div>
    </div>
  )
}

export default App