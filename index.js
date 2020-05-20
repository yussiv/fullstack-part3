require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')

class InputError extends Error {}

const app = express()
let phonebook = [
  {
    name: 'Arto Hellas',
    number: '040-123456',
    id: 1
  },
  {
    name: 'Ada Lovelace',
    number: '39-44-523523',
    id: 2
  },
  {
    name: 'Dan Abramov',
    number: '12-43-234345',
    id: 3
  },
  {
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
    id: 4
  }
]

morgan.token('body', (req, res) => {
  if (req.method === 'POST')
    return JSON.stringify(req.body)
  else
    return ' '
})

app.use(express.json())
app.use(express.static('ui/build'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = phonebook.find(entry => entry.id === id)
  if (!person)
    res.status(404).end()
  else
    res.json(person)
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch(error => { next(error) })
})

app.put('/api/persons/:id', (req, res, next) => {
  const {name, number} = req.body
  Person.findByIdAndUpdate(req.params.id, { name, number }, { new: true })
    .then(entry => { res.json(entry) })
    .catch(error => { next(error) })
})

app.get('/api/persons', (req, res, next) => {
  Person.find({})
    .then(response => {
      res.json(response)
    })
    .catch(error => { next(error) })
})

app.post('/api/persons', (req, res, next) => {
  const name = req.body.name
  const number = req.body.number

  if (!name || !number)
    return next(new InputError("name and number are required fields"))

  // const existing = phonebook.find(entry => entry.name === name)
  // if (existing)
  //   return res.status(400).json({
  //     error: "name must be unique"
  //   })
  const person = new Person({name, number})
  person.save()
    .then(response => {
      res.json(response)
    })
    .catch(error => { next(error) })
})

app.get('/info', (req, res) => {
  res.send(`
    <p>Phonebook contains ${phonebook.length} entries</p>
    <p>${new Date()}</p>`)
})

const errorHandler = (error, req, res, next) => {
  console.log(error)

  if (error instanceof InputError)
    return res.status(400).json({ error: error.message })
  
  if (error.name === 'CastError')
    return res.status(400).json({ error: 'Invalid ID' })

  res.status(500).json({ error: 'This is fine' })
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`)
})