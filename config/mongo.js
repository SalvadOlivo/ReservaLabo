const  mongoose  = require('mongoose')

let database = 'ReservaLabo'
let host = 'localhost'
let uri = `mongodb://${host}/${database}`

const connect = ()=>{
    mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
    .then( () => {
        console.log('Db connected')
    })
    .catch( (err) => {
        console.log(err)
    })
}

mongoose.Promise = global.Promise

module.exports = { connect }