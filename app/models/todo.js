var mongoose = require('mongoose');

var TodoSchema =  new mongoose.Schema({
   text : {type : String, default: ''},
   snooze : {type:Boolean, default: false},
   completed : {type : Boolean, default: false}
});

module.exports = mongoose.model('Todo', TodoSchema);
