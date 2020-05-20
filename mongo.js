require('dotenv').config()
const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('usage: node mongo.js <password> [name] [number]')
  process.exit(1)
}

const [name, number] = process.argv.slice(3, 5)

const url = process.env.MONGODB_URI

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length >= 5) {
  const person = new Person({ name, number })

  person.save().then(response => {
    console.log(`added ${response.name} number ${response.number} to phonebook`)
    mongoose.connection.close()
  })
} else {
  Person.find({}).then(response => {
    console.log('phonebook:')
    response.forEach(entry => {
      console.log(`${entry.name} ${entry.number}`)
    })
    mongoose.connection.close()
  })
}
