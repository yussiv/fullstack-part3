require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')

class InputError extends Error {}
class NotFoundError extends Error {}

const app = express()

morgan.token('body', req => {
  if (req.method === 'POST')
    return JSON.stringify(req.body)
  else
    return ' '
})

app.use(express.json())
app.use(express.static('ui/build'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      if (person)
        res.json(person)
      else
        next(new NotFoundError(req.params.id))
    })
    .catch(next)
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch(next)
})

app.put('/api/persons/:id', (req, res, next) => {
  const { name, number } = req.body
  const id = req.params.id
  Person.findByIdAndUpdate(id, { name, number }, { new: true, runValidators: true })
    .then(entry => {
      if (entry)
        res.json(entry)
      else
        next(new NotFoundError(id))
    })
    .catch(next)
})

app.get('/api/persons', (req, res, next) => {
  Person.find({})
    .then(response => {
      res.json(response)
    })
    .catch(next)
})

app.post('/api/persons', (req, res, next) => {
  const name = req.body.name
  const number = req.body.number

  if (!name || !number)
    return next(new InputError('name and number are required fields'))

  const person = new Person({ name, number })
  person.save()
    .then(response => {
      res.json(response)
    })
    .catch(next)
})

app.get('/info', (req, res, next) => {
  Person.count({})
    .then(count => {
      res.send(`
        <p>Phonebook contains ${count} entries</p>
        <p>${new Date()}</p>`)
    })
    .catch(next)
})

const errorHandler = (error, req, res) => {
  console.log(error)

  if (error instanceof InputError)
    return res.status(400).json({ error: error.message })

  if (error instanceof NotFoundError)
    return res.status(404).end()

  if (error.name === 'CastError')
    return res.status(400).json({ error: 'Invalid ID' })

  if (error.name === 'ValidationError')
    return res.status(400).json({ error: error.message })

  res.status(500).json({ error: 'This is fine' })
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`)
})