var mongoose = require('mongoose');

// Activity Schema
var activitySchema = mongoose.Schema({
  name:{
    type:String,
    required: true
  },
  flights:{
    type:Number,
    required: false
  },
  create_date:{
    type: Date,
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

// Add Actviity
module.exports.addActivity = function(activity, callback){
  Activity.create(activity, callback);
}

// Update Actviity by id
module.exports.updateActivity = function(id, activity, options, callback){
  var query = {_id: id};
  var update = {
    name: activity.name,
    flights: activity.flights,
    date: activity.date
  }
  Activity.findOneAndUpdate(query, update, options, callback);
}

// Delete Actviity by id
module.exports.removeActivity = function(id, callback){
  var query = {_id: id};
  Activity.remove(query, callback);
}
