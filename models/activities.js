var mongoose = require('mongoose');

// Activity Schema
var activitySchema = mongoose.Schema({
  name:{
    type:String,
    required: true
  },
  metric:{
    type:Number,
    required: true
  },
  metric_value:{
    type:String,
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

// Add Actviity
module.exports.addActivity = function(activity, callback){
  Activity.create(activity, callback);
}

// Update Actviity by id
module.exports.updateActivity = function(id, activity, options, callback){
  var query = {_id: id};
  var update = {
    name: activity.name,
    metric: activity.metric,
    metric_value: activity.metric_value,
    date: activity.date
  }
  Activity.findOneAndUpdate(query, update, options, callback);
}

// Delete Actviity by id
module.exports.removeActivity = function(id, callback){
  var query = {_id: id};
  Activity.remove(query, callback);
}

// Add stat by id
module.exports.updateActivity = function(id, stat, options, callback){
  var query = {_id: id};
  var update = {
    stat: activity.stat
  }
  Activity.findOneAndUpdate(query, update, options, callback);
}
