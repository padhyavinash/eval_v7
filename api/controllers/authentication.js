var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('Userd');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.register = function(req, res) {

  // if(!req.body.name || !req.body.email || !req.body.password) {
  //   sendJSONresponse(res, 400, {
  //     "message": "All fields required"
  //   });
  //   return;
  // }
  console.log('inside register');

  var user = new User();

  user.name   = req.body.name;
  user.email  = req.body.email;
  user.type   = req.body.type;                // new logic added
  user.pos    = req.body.pos;
  user.tech   = req.body.tech;
  user.org    = req.body.org;
  user.chkLogin = req.body.chkLogin;

  console.log('name - '+req.body.name);
  console.log('email - '+req.body.email);
  console.log('type - '+req.body.type);
  console.log('pos - '+req.body.pos);
  console.log('tech - '+req.body.tech);
  console.log('org - '+req.body.org);
  console.log('password - '+req.body.password);

  user.setPassword(req.body.password);

  user.save(function(err) {   
    var token;
    token = user.generateJwt();
    console.log('inside save -- '+res.status(200));
    res.status(200);
    res.json({
      "token" : token
    });
  });

};

module.exports.login = function(req, res) {

  // if(!req.body.email || !req.body.password) {
  //   sendJSONresponse(res, 400, {
  //     "message": "All fields required"
  //   });
  //   return;
  // }

  passport.authenticate('local', function(err, user, info){
    var token;

    // If Passport throws/catches an error
    if (err) {
      res.status(404).json(err);
      console.log('inside login err');
      return;
    }

    // If a user is found
    if(user){
      console.log('inside login success');
      token = user.generateJwt();
      res.status(200);
      res.json({
        "token" : token
      });
      //console.log('inside login success end');
     
    } else {
      // If user is not found
      console.log('inside Err 401');
      res.status(401).json(info);
    }
  })(req, res);

};

module.exports.chkLogin = function(req, res) {

  // if(!req.body.name || !req.body.email || !req.body.password) {
  //   sendJSONresponse(res, 400, {
  //     "message": "All fields required"
  //   });
  //   return;
  // }
  console.log('inside chk Login');

  //var user = new User();

  //user.email  = req.body.email;
  //user.chkLogin = true;

  /*
  var myquery = { address: "Valley 345" };
  var newvalues = { $set: { address: "Canyon 123" } };
  dbo.collection("customers").updateOne(myquery, newvalues, function(err, res) 
  */
  var myquery = { email: req.body.email };
  var newvalues = { $set: { chkLogin: 'Y' } };
console.log('myquery - '+myquery);
console.log('newvalues - '+newvalues);
  User.updateOne(myquery, newvalues, function (err, res) {
    if (err) { return done(err); }
    // Return if user not found in database
    else{
      console.log('Updated data '); 
      
    }

    // If credentials are correct, return the user object
    
  });

};