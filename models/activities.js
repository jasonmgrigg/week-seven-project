var mongoose = require('mongoose');

// Activity Schema
var activitySchema = mongoose.Schema({
  name:{
    type:String,
    required: true
  },
  stat:{
    type:String,
    required: true
  },
  stat_value:{
    type:Number,
    required: true
  },
  date:{
    type:Date,
    required: true
  }
});

var Activity = module.exports = mongoose.model('Activity', activitySchema);

// Get All Activities
module.exports.getActivities = function(callback, limit){
  Activity.find(callback).limit(limit);
}

// Get Activity by Id
module.exports.getActivityById = function(id, callback){
  Activity.findById(id, callback);
}

// Get Activity by Stat
module.exports.getActivityByStat = function(stat, callback){
  var query = {stat: stat};
  Activity.find(query, callback);
}

// Get Activity by Name
module.exports.getActivityByName = function(name, callback){
  var query = {name: name};
  Activity.find(query, callback);
}

// Add Actviity
module.exports.addActivity = function(activity, callback){
  Activity.create(activity, callback);
}

// Update Actviity by id
module.exports.updateActivity = function(id, activity, options, callback){
  var query = {_id: id};
  var update = {
    name: activity.name,
    stat: activity.stat,
    stat_value: activity.stat_value,
    date: activity.date
  }
  Activity.findOneAndUpdate(query, update, options, callback);
}

// Delete Actviity by id
module.exports.removeActivity = function(id, callback){
  var query = {_id: id};
  Activity.remove(query, callback);
}
