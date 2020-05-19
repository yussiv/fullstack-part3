const express = require('express')
const morgan = require('morgan')

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

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  phonebook = phonebook.filter(entry => entry.id !== id)
  res.status(204).end()
})

app.get('/api/persons', (req, res) => {
  res.json(phonebook)
})

app.post('/api/persons', (req, res) => {
  const name = req.body.name
  const number = req.body.number

  if (!name || !number)
    return res.status(400).json({
      error: "name and number are required fields"
    })

  const existing = phonebook.find(entry => entry.name === name)
  if (existing)
    return res.status(400).json({
      error: "name must be unique"
    })
  
  const id = Math.floor(Math.random() * 99999)
  const entry = {name, number, id }
  phonebook = phonebook.concat(entry)
  res.json(entry)
})

app.get('/info', (req, res) => {
  res.send(`
    <p>Phonebook contains ${phonebook.length} entries</p>
    <p>${new Date()}</p>`)
})

const PORT = process.env.PORT || 3210
app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`)
})