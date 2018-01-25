var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Counter = require('./counter');

var urlSchema = new Schema({
  _id: {
    type: Number
    //index: true
  },
  longUrl: String,
  created_at: Date
});

urlSchema.pre('save', function(next){
 var doc = this;
 Counter.findByIdAndUpdate({_id: 'url_count'}, { $inc: { seq: 1 } }, function(err, counter){
   if(err){
     return next(err);
   }
   doc._id = counter.seq;
   doc.created_at = new Date();
   next();
 });
});

var Url = mongoose.model('Url', urlSchema);
module.exports = Url;
