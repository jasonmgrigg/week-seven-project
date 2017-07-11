const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const bcrypt = require('bcryptjs');
const User = require('./models/user.js');
const Activity = require('./models/activities.js');

app.use(bodyParser.json());

// Activity = require('./models/activities');
// Stat = require('./models/stats');

// Connect to mongoose
mongoose.connect('mongodb://localhost:27017/stattracker');
var db = mongoose.connection;

//Authentication Section
// app.use('/users', require('./routes/users'));

// passport.use(new BasicStrategy(
//   function(username, password, done) {
//     User.findOne( { name: username }, function(err, user){
//       if (user && bcrypt.compareSync(password, user.password)){
//         return done(null, user);
//       }
//       return done(null, false);
//     });
//   }
// ));

// example of modifying new password
var user = User.findOne({name: "paul"}, function(err, user){
  user.password = 'test';
  user.save(function(err){
    if (err) {return console.log('user not saved')}
    console.log('user saved!')
  })
});

passport.use(new BasicStrategy(
  function(username, password, done) {
    User.findOne({ name: username }, function(err, user){
      console.log("Here is the User " + user);
      if (user && bcrypt.compareSync(password, user.password)){
        return done(null, user);
      }
      return done(null, false);
    });
  }
));


// app.get('/api/auth',
//   passport.authenticate('basic', {session: false}), function (req, res) {
//       res.send('You have been authenticated, ' + req.user.name);
//   }
// );

app.get('/api/auth',
  passport.authenticate('basic', {session: false}), function (req, res) {
      res.send('You have been authenticated, ' + req.user.name);
  }
);

//Place holder if you don't go to the correct endpoint to start
app.get('/', function(req, res){
  res.send('Please use /api/...');
});

//Gets all activity information
app.get('/api/activities', function(req, res){
  Activity.getActivities(function(err, activities){
    if(err){
      throw err;
    }
    res.json(activities);
  });
});

//Adds an activity
app.post('/api/activities', function(req, res){
  var activity = req.body;
  Activity.addActivity(activity, function(err, activity){
    if(err){
      throw err;
    }
    res.json(activity);
  });
});

//Updates an activity
app.put('/api/activities/:_id', function(req, res){
  var id = req.params._id
  var activity = req.body;
  Activity.updateActivity(id, activity, {}, function(err, activity){
    if(err){
      throw err;
    }
    res.json(activity);
  });
});

//Gets an activity by id
app.get('/api/activities/:_id', function(req, res){
  Activity.getActivityById(req.params._id, function(err, activity){
    if(err){
      throw err;
    }
    res.json(activity);
  });
});

//Deletes an activity by id
app.delete('/api/activities/:_id', function(req, res){
  var id = req.params._id
  Activity.removeActivity(id, function(err, activity){
    if(err){
      throw err;
    }
    res.json(activity);
  });
});

//Adds stats to an activity by ID
app.put('/api/activities/:_id/stats', function(req, res){
  var id = req.params._id
  var stat = req.body;
  Stat.updateStat(id, stat, {}, function(err, stat){
    if(err){
      throw err;
    }
    res.json(stat);
  });
});




app.listen(3000);
console.log('Running on Port 3000');
