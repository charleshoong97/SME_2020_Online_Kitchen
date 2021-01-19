var express = require('express');
var router = express.Router();
var User = require('../models/user')
var ObjectId = require("mongoose").Types.ObjectId;

//signup
router.post('/signup', async function(req, res) {
  let data = req.body
  let user = new User(data)

  if (await User.findOne({"email": data.email})) {
     res.status(400).json("User Already Exist")
     return
}
  user.save()
  .then(user=>res.json(user))
  .catch(err => res.status(400).json('Error: ' + err))
});


//login
router.get('/login', function(req, res) {
  let data = req.query
  User.findOne({"email": data.email,"password":data.password})
  .then(user => res.json(user))
  .catch(err => res.status(400).json('Error: ' + err));
});

//update
router.put('/update', function(req, res) {
  let data = req.body
  User.findOneAndUpdate({"_id":  new ObjectId(data.user_id)},
  data, {useFindAndModify: false, new: true})
      .then((result) => {res.json(result)})
      .catch(err => res.status(400).json('Error: ' + err));
});


// //get one
// router.get('/:uuid',async function(req, res) {
//   UserProfile.findOne({"uuid": req.params.uuid})
//   .populate('resource.resource_id')
//   .exec((err,data)=>{
//     if (err)res.json({error:err})
//     res.json(data)})
// });

module.exports = router;
