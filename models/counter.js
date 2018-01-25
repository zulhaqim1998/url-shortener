var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var  counterSchema = new Schema({
  _id: {
    type: String,
    required: true
  },
  seq: {
    type: Number,
    default: 0
  }
});

var Counter = mongoose.model('Counter', counterSchema);
module.exports = Counter;
