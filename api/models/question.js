var mongoose = require( 'mongoose' );

var questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  option1: {
    type: String,
    required: true
  },
  option2: {
    type: String,
    required: true
  },
  option3: {
    type: String,
    required: true
  },
  option4: {
    type: String,
    required: true
  },
  correctOption: {
    type: String,
    required: true
  },
  pos: {
    type: String,
    required: true
  },
  tech: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  }
});

console.log('in DB qs');
mongoose.model('question', questionSchema);
