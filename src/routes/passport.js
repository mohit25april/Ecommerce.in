const passport = require ("passport")
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

const bcrypt = require('bcryptjs');


module.exports = function(passport){
    
// passport.use(new LocalStrategy(function (username, password, done){
     
//         User.findOne({username:username}, function(err,user){
//             if(err)
//             console.log(err);
//         })

//         if(!user) {
//             return done(null. false, {message:'No user found'})
//         }

//      bcrypt.compare (password), user.password, function (err, isMatch){
//          if (err) console.log(err);

//          if  (isMatch) {
//          return done (null, user);
     
//         }else {
//              return done (null, false, {message: 'Wrong password'});
//         }
//      }
//  }))



// passport.serializeUser(function (user, done){
//     done (null, user.id);
// })


// passport.deserializeUser(function (id, done){
//     User.findById(id, function(err,user){
//         done(err,user);
//     })
// });




passport.use(new LocalStrategy({
    usernameField:'email'
  }, async (email, password, done) => {
          try{
                const user =  await User.findOne({ email })
                // console.log(user,email,password);
                if(!user)return done(null, false, {error:'User not Found'})
                if (await user.checkPassword(password))  return done(null, user)
                  done(null, false, {error: 'Incorrect Password'})
   
                }catch (e) {
               return done(e)
          }
        }));
    
   passport.serializeUser((user, done) => {
        done(null, user._id)
    })
  
  
    passport.deserializeUser(async (_id, done) => {
   try{
      const user = await User.findOne({_id})
      done(null, user)
      }catch(e){
      done(e)
        }
    })
//
}

// ek tara sa ham kah sakta ha ki ya sara code login ka liya likha gya ha