const configMogo = require("../configs/mongo.config")
const mongoose = require('mongoose');

class Database {
  constructor() {
    this._connect()
  }
_connect() {
     mongoose.connect(...configMogo,{ useNewUrlParser: true, useUnifiedTopology: true })
       .then(() => {
         console.log('Database connection successful')
       })
       .catch(err => {
         console.error('Database connection error')
       })
  }
}

module.exports =new Database()
