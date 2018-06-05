var mongoose = require('mongoose');
var resultModel = mongoose.model('result');


module.exports.resultIns = function(req, res) {  
    console.log('in result handler');
    var Newresult = new resultModel();
  
    Newresult.email         =   req.body.email; 
    Newresult.name          =    req.body.name;
    Newresult.tech          =    req.body.tech;  
    Newresult.category1     =    req.body.category1;
    Newresult.category2     =    req.body.category2;
    Newresult.category3     =    req.body.category3;
    Newresult.finalResult   =    req.body.finalResult;
    Newresult.pos           =    req.body.pos;
    Newresult.org           =    req.body.org;   
    //(req.body.category1*2)+(req.body.category2*10)+(req.body.category3*30);

    //console.log('Newquestion.question '+Newquestion.question);
    
  
    Newresult.save((err,resultModel)=>{
      if(err)
        {
            //console.log('inside error qs'+err);
            res.json({msg:'Failed to add Qs'});
        }
        else
        {
            //console.log('success');
            res.json({msg:'Rs added successfully'});
        }
    });
  
  };

  module.exports.getResult = function(req, res) {

   
    //questionModel.findOne({technology: req.body.technology
    //console.log('inside getQuestion 1 - '+req.body.tech);
    //resultModel.findOne({email: req.body.email
        //,category: req.body.category},function(err,questionModel){
            resultModel.find({
            },function(err,resultModel){
            if (err) throw err;
            if (!resultModel){
//                res.json({success:false, message:'Authentication failed! User not found.'});
//console.log('inside questionModel failure');
                    res.json({success:false});
            }
            else if(resultModel){
                //console.log('inside questionModel success - '+ resultModel[0]);
                    res.json(resultModel);
              //res.json({success: true});       
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