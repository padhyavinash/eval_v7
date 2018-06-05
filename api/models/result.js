var mongoose = require( 'mongoose' );

var resultSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  tech: {
    type: String,
    required: true
  },  
  category1: {
    type: Number,
    required: true
  },
  category2: {
    type: Number,
    required: true
  },
  category3: {
    type: Number,
    required: true
  },
  finalResult: {
    type: Number,
    required: true
  },
  pos:{
    type: String,
    required: true
  },
  org:{
    type: String,
    required: true
  }
});

console.log('in DB RES');
mongoose.model('result', resultSchema);
