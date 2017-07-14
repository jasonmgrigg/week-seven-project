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

// Connect to mongoose
mongoose.connect('mongodb://localhost:27017/stattracker');
var db = mongoose.connection;


//Authentication Section
passport.use(new BasicStrategy(
  function(username, password, done) {
    User.findOne({ name: username }, function(err, user){
      // console.log("Here is the User " + user);
      if (user && bcrypt.compareSync(password, user.password)){
        return done(null, user);
      }
      return done(null, false);
    });
  }
));

app.get('/api/auth',
  passport.authenticate('basic', {session: false}), function (req, res) {
      res.send('You have been authenticated, ' + req.user.name);
  }
);
//End of Authentication Section


//Place holder if you don't go to the correct endpoint to start
app.get('/', function(req, res){
  res.send('Please use /api/...');
});
//End of place holder


//Authentication to endpoint, just returns "You have been authenticated"
app.get('/api/auth',
  passport.authenticate('basic', {session: false}), function (req, res) {
      res.send('You have been authenticated, ' + req.user.name);
  }
);
//End of authentication endpoint


//Gets all activity information
app.get('/api/activities', passport.authenticate('basic', {session: false}), function(req, res){
  Activity.getActivities(function(err, activities){
    if(err){
      throw err;
    }
    res.json(activities);
  });
});
//End of get all activity


//Adds an activity
app.post('/api/activities', passport.authenticate('basic', {session: false}), function(req, res){
  var activity = req.body;
  Activity.addActivity(activity, function(err, activity){
    if(err){
      throw err;
    }
    res.json(activity);
  });
});
//End of adds an activity


//Updates an activity
app.put('/api/activities/id/:_id', passport.authenticate('basic', {session: false}), function(req, res){
  var id = req.params._id
  var activity = req.body;
  Activity.updateActivity(id, activity, function(err, activity){
    if(err){
      throw err;
    }
    res.json(activity);
  });
});
//End of updates an activity


//Updates an activity by date and ID
app.put('/api/activities/addtodate/:_id/:date', passport.authenticate('basic', {session: false}), function(req, res){
  var id = req.params._id
  var activity = req.body;
  Activity.updateActivity(id, activity, function(err, activity){
    if(err){
      throw err;
    }
    res.json(activity);
  });
});
//End of updates an activity


//Gets an activity by date and id
app.get('/api/activities/addtodate/:_id/:date', passport.authenticate('basic', {session: false}), function(req, res){
  Activity.getActivityByDateId(req.params._id, function(err, activity){
    if(err){
      throw err;
    }
    res.json(activity);
  });
});
//End of gets an activity by date and id


//Gets an activity by id
app.get('/api/activities/id/:_id', passport.authenticate('basic', {session: false}), function(req, res){
  Activity.getActivityById(req.params._id, function(err, activity){
    if(err){
      throw err;
    }
    res.json(activity);
  });
});
//End of gets an activity by id


//Gets an activity by stat
app.get('/api/activities/stat/:stat', passport.authenticate('basic', {session: false}), function(req, res){
  Activity.getActivityByStat(req.params.stat, function(err, activity){
    if(err){
      throw err;
    }
    res.json(activity);
  });
});
//Gets an activity by stat


//Gets an activity by name
app.get('/api/activities/name/:name', passport.authenticate('basic', {session: false}), function(req, res){
  Activity.getActivityByName(req.params.name, function(err, activity){
    if(err){
      throw err;
    }
    res.json(activity);
  });
});
//End of gets an activity by name


//Gets an activity by date
app.get('/api/activities/date/:date', passport.authenticate('basic', {session: false}), function(req, res){
  Activity.getActivityByDate(req.params.date, function(err, activity){
    if(err){
      throw err;
    }
    res.json(activity);
  });
});
//End of gets an activity by date


//Deletes an activity by id
app.delete('/api/activities/id/:_id', passport.authenticate('basic', {session: false}), function(req, res){
  var id = req.params._id
  Activity.removeActivity(id, function(err, activity){
    if(err){
      throw err;
    }
    res.json(activity);
  });
});
//End of delets an activity by id


app.listen(3000);
console.log('Running on Port 3000');
