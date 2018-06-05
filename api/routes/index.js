var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

var ctrlProfile = require('../controllers/profile');
var ctrlAuth = require('../controllers/authentication'); 
var ctrlQuestionh = require('../controllers/questionHandler');
var ctrlResult = require('../controllers/resultStorage');

//result storage
console.log('in beforeInsert');
router.post('/insertRes',ctrlResult.resultIns);
console.log('in AfterInsert');
//get results
router.get('/getRes',ctrlResult.getResult);
//question handler
//console.log('in beforeIndex');
router.post('/insertQs',ctrlQuestionh.question);
router.post('/getQs',ctrlQuestionh.getQuestion);
//console.log('in afterIndex');
// profile
router.get('/profile', auth, ctrlProfile.profileRead);

// authentication
router.post('/chkLogin', ctrlAuth.chkLogin);
console.log('in beforeregister');
router.post('/register', ctrlAuth.register);
console.log('in aftereregister');
router.post('/login', ctrlAuth.login);

module.exports = router;
