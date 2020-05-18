const express = require('express')

const app = express()

app.get('/api/persons', (req, res) => {
  res.json([
    {
      name: 'Arto Hellas',
      number: '040-123456',
      id: 1
    },
    {
      name: 'Arto Hellas',
      number: '040-123456',
      id: 1
    },
    {
      name: 'Ada Lovelace',
      number: '39-44-523523',
      id: 4
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
    },
  ])
})

app.listen(3001, () => {
  console.log('Server listening port 3001')
})