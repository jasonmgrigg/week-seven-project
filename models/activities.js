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
    default: Date.now
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

// Get Activity by Date
module.exports.getActivityByDate = function(date, callback){
  var query = {date: date};
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

// Update Actviity by id and date
module.exports.updateActivity = function(id, date, activity, options, callback){
  var query = {_id: id, date:date};
  var update = {
    name: activity.name,
    stat: activity.stat,
    stat_value: activity.stat_value,
    date: activity.date
  }
  Activity.findOneAndUpdate(query, update, options, callback);
}

// Get Activity by Date and ID
module.exports.getActivityByDateId = function(date, id, callback){
  var query = {date: date, _id: id};
  Activity.find(query, callback);
}

// Delete Actviity by id
module.exports.removeActivity = function(id, callback){
  var query = {_id: id};
  Activity.remove(query, callback);
}
