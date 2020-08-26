'use strict'

const Hapi = require('hapi')
const mongoose = require('mongoose')

const server = new Hapi.Server({
  host: 'localhost',
  port: 5000,
  routes: {
    cors: true
  }
})

mongoose.connect(
  'mongodb://localhost/hapitest',
  { useNewUrlParser: true }
)
const init = async () => {
  await server
    .register(
      { plugin: require('./routes/tasks') },
      {
        routes: {
          prefix: '/api'
        }
      }
    )
    .catch(err => {
      console.log(err)
    })

  await server.start()
  console.log(`Server running at: ${server.info.uri}`)
}

init()
