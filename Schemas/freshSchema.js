const { mongoose } = require('mongoose')
const Schema = mongoose.Schema

const freshSchema = new Schema({
    userID: {type: String, required: true},
    attended: {type: BigInt, required: true}
})

module.exports = mongoose.model('MTRTEST', freshSchema)