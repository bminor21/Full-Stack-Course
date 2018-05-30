var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('passportapp', ['users']);
var bc = require('bcryptjs');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

/* Passport Serialize and Deserialize */
passport.serializeUser( function(user,done){
  done( null, user._id );
});

passport.deserializeUser( function(id, done){
  db.users.findOne({ _id: mongojs.ObjectId(id) }, function(err,user){
    done( err, user);
  });
});

/* Setup Passport Local Strategy */
passport.use(new LocalStrategy(

  function(username, password, done){
    db.users.findOne({ username: username }, function(error,user){
      if(error)
        return done(error);

      if(!user)
        return done(null, false, {message: 'Incorrect Username'});

      bc.compare(password, user.password, function(error, isMatch){
        if( error )
          return done(error);

        if( isMatch )
          return done(null, user);
        else
          return done(null, false, {message: 'Incorrect Password'});
      });
    });
  }
  
));

// Loggout
router.get('/logout', function(req,res){
  req.logout();
  req.flash('success', 'You have logged out');
  res.redirect('/users/login');
});

// Loging - Post
router.post('/login', passport.authenticate('local',
  { successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: 'Invalid Username or Password' }),
    function(req, res){
      console.log('Authentication Successful');
      res.redirect('/');
    }
);

//Register - Post
router.post('/register', function(req,res){
  console.log("Adding user");

  var newUser = CreateUser(req);
  var formErrors = Validate(req);

  if( formErrors ){
    console.log('form has errors');
    res.render('register', {
      errors: formErrors,
      name: newUser.name,
      email: newUser.email,
      username: newUser.username,
    });
  } else {
      console.log('Successs');
      var fail = AddUser(newUser);

      if(fail){
        res.send(error);
      } else {
        // Success messsage
        req.flash( 'success', 'You are registerd and can now log in');

        // Re direct after register
        res.location('/');
        res.redirect('/');
      }
    }

});

const AddUser = function(newUser){

  bc.genSalt(10, function(err,salt){
    bc.hash( newUser.password, salt, function(err, hash){
      newUser.password = hash;

      db.users.insert(newUser, function(err,doc){
        if(err) {
          return err;
        } else {
          console.log('User added...');
        }
      });
    });
  });

}

const Validate = function(req){

  req.checkBody('name', 'Name field is required').notEmpty();
  req.checkBody('email', 'Email field is required').notEmpty();
  req.checkBody('email', 'A valid email is required').isEmail();
  req.checkBody('username', 'Username field is required').notEmpty();
  req.checkBody('password', 'Password field is required').notEmpty();
  req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

  return req.validationErrors();
}

const CreateUser = function(req) {

  var newUser = {
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  };

  return newUser;
}

module.exports = router;
