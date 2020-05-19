import React, { useState, useEffect, useRef } from 'react'
import personService from './service/persons'
import './App.css'


const Notification = ({message, type}) => {
  if (message === null)
    return null

  return (
    <div className={`notification ${type}`}>{message}</div>
  )
}

const NotificationList = ({notifications}) => (
  notifications.map(
    n => <Notification key={n.id} message={n.message} type={n.type} />)
)

const FilterForm = ({filterInput, handleFilter}) => (
  <div>
    show entries containing <input value={filterInput} onChange={handleFilter} />
  </div>
)

const NewPersonForm = ({name, number, handleName, handleNumber, handleSubmit}) => (
  <form onSubmit={handleSubmit}>
    <div>
      name: <input value={name} onChange={handleName}/>
    </div>
    <div>
      number: <input value={number} onChange={handleNumber}/>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

const Persons = ({persons, handleRemove}) => (
  persons.map(person => (
      <div key={person.name}>
        {person.name} {person.number} 
        <button onClick={handleRemove(person)}>delete</button>
      </div>
  ))
)

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterInput, setFilterInput] = useState('')
  const [notifications, setNotifications] = useState([])
  const notificationsRef = useRef(notifications)
  notificationsRef.current = notifications

  useEffect(() => {
    personService.getAll()
      .then(response => { setPersons(response) })
  }, [])

  const shownPersons = persons.filter(
    p => filterInput.length < 1 
        || p.name.toLowerCase().indexOf(filterInput.toLowerCase()) > -1
  )

  // returns first person with same name
  const getPerson = (name) => {
    const filtered = persons.filter(item => item.name === name)
    return filtered[0]
  }

  const addNotification = (message, type) => {
    const id = new Date().valueOf()
    setNotifications(notifications.concat({ message, id, type }))
    // remove notification after 5 seconds
    setTimeout(() => {
      setNotifications(notificationsRef.current.filter(n => n.id !== id))
    }, 5000) 
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const confirmPrompt = `${newName} is already in the phonebook, replace number with new one?`

    const existingPerson = getPerson(newName)
    if (existingPerson) {
      if (window.confirm(confirmPrompt)) {
        personService
          .update({...existingPerson, number: newNumber})
          .then(updatedPerson => { 
            setPersons(persons.map(p => p.id === updatedPerson.id ? updatedPerson : p)) 
            addNotification(`Number updated for ${newName}`, 'success')
          })
      }
    } else {
      personService
        .add({name: newName, number: newNumber})
        .then(newPerson => { 
          setPersons(persons.concat(newPerson))
          addNotification(`Added ${newName}`, 'success')
        })
      
    }
  }
  
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilterInput(event.target.value)
  }

  const handleRemove = (person) => () => {
    if (window.confirm(`Delete ${person.name}`))
      personService
        .remove(person)
        .then(() => {
          setPersons(persons.filter(p => p.id !== person.id))
          addNotification(`${person.name} removed from database`, 'success')
        })
        .catch(() => {
          setPersons(persons.filter(p => p.id !== person.id))
          addNotification(`${person.name} not found in database`, 'failure')
        })
  }
  

  return (
    <div>
      <h2>Phonebook</h2>
      <NotificationList notifications={notifications} />
      <FilterForm input={filterInput} handleFilter={handleFilterChange} />
      <h2>add new</h2>
      <NewPersonForm 
        name={newName} number={newNumber} 
        handleName={handleNameChange} 
        handleNumber={handleNumberChange}
        handleSubmit={handleSubmit} />
      <h2>Numbers</h2>
      <Persons persons={shownPersons} handleRemove={handleRemove} />
    </div>
  )
}

export default App