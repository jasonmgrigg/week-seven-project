var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.use(bodyParser.json());

Activity = require('./models/activities');

// Connect to mongoose
mongoose.connect('mongodb://localhost/stattracker');
var db = mongoose.connection;

//Place holder if you don't go to the correct endpoint to start
app.get('/', function(req, res){
  res.send('Please use /api/...');
});

app.get('/api/activities', function(req, res){
  Activity.getActivities(function(err, activities){
    if(err){
      throw err;
    }
    res.json(activities);
  });
});

app.post('/api/activities', function(req, res){
  var activity = req.body;
  Activity.addActivity(activity, function(err, activity){
    if(err){
      throw err;
    }
    res.json(activity);
  });
});

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

app.get('/api/activities/:_id', function(req, res){
  Activity.getActivityById(req.params._id, function(err, activity){
    if(err){
      throw err;
    }
    res.json(activity);
  });
});

app.delete('/api/activities/:_id', function(req, res){
  var id = req.params._id
  Activity.removeActivity(id, function(err, activity){
    if(err){
      throw err;
    }
    res.json(activity);
  });
});



app.listen(3000);
console.log('Running on Port 3000');
