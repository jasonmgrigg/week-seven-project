//Moodifying new password once password is in collection, run anywhere in
//main .js file.  Hard code your username and password in the below code
//making sure your variables are the same, name, username, etc.  Run your main
//.js file once and then comment out code.  Look at the database and the password
//should be scrambled.
var user = User.findOne({name: "lisa"}, function(err, user){
  user.password = 'test';
  user.save(function(err){
    if (err) {return console.log('user not saved')}
    console.log('user saved!')
  })
});
