var mongoose = require('mongoose');
var User = mongoose.model('Userd');

module.exports.profileRead = function(req, res) {
//console.log('req.payload._id - '+req.payload._id);
  if (!req.payload._id) {
    //console.log('Inside not if ');
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    //console.log('Inside else ');
    User
      .findById(req.payload._id)
      .exec(function(err, user) {
        res.status(200).json(user);
      });
      //console.log('Inside else end');
  }

};
