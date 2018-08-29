'use strict'

const Factory = use('Factory')

class DatabaseSeeder {

  * run () {
    yield Factory.model('App/Model/User').create(5)
    yield Factory.model('App/Model/Task').create(5)
  }
}

module.exports = DatabaseSeeder
