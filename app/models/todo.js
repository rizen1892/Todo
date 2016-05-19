var mongoose = require('mongoose');

var TodoSchema =  new mongoose.Schema({
   text : {type : String, default: ''},
   s : Boolean
});

module.exports = mongoose.model('Todo', TodoSchema);
