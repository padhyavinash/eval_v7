var mongoose = require('mongoose');
var questionModel = mongoose.model('question');


module.exports.question = function(req, res) {

    // if(!req.body.name || !req.body.email || !req.body.password) {
    //   sendJSONresponse(res, 400, {
    //     "message": "All fields required"
    //   });
    //   return;
    // }
  
    //console.log('in question handler');
    var Newquestion = new questionModel();
  
    Newquestion.question = req.body.question;
    Newquestion.option1 = req.body.option1;
    Newquestion.option2 = req.body.option2;
    Newquestion.option3 = req.body.option3;
    Newquestion.option4 = req.body.option4;
    Newquestion.correctOption = req.body.correctOption;
    Newquestion.pos = req.body.pos;
    Newquestion.tech = req.body.tech;
    Newquestion.category = req.body.category;

    //console.log('Newquestion.question '+Newquestion.question);
    
  
    Newquestion.save((err,questionModel)=>{
      if(err)
        {
            //console.log('inside error qs'+err);
            res.json({msg:'Failed to add Qs'});
        }
        else
        {
            //console.log('success');
            res.json({msg:'Qs added successfully'});
        }
    });
  
  };

  module.exports.getQuestion = function(req, res) {

   
    //questionModel.findOne({technology: req.body.technology
    console.log('inside getQuestion tech - '+req.body.tech);
    console.log('inside getQuestion pos - '+req.body.pos);
    questionModel.find({tech: req.body.tech, pos: req.body.pos
        //,category: req.body.category},function(err,questionModel){
            },function(err,questionModel){
            if (err) throw err;
            if (!questionModel){
              console.log('!!Questions from DB');
//                res.json({success:false, message:'Authentication failed! User not found.'});
//console.log('inside questionModel failure');
                    res.json({success:false});
            }
            else if(questionModel){
            console.log('Questions from DB');
            console.log('Question - '+questionModel);
                    res.json(questionModel);
              
            }
           // res.json({success: true});       
    })
  
  };

  /*
  db.questions.aggregate(
		[
			{$match :{technology : "java",category : "2"}},{$limit : 10}
		]
	).pretty();
  */