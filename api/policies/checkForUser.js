/**
 * checkForUser
 *
 * @module      :: Policy
 * @description :: Simple policy to load an authenticated user, if any.  If we're not logged in, just continue.
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
var jwt = require('jsonwebtoken');
module.exports = function(req, res, next) {

  // Check for a JWT token in the header
  if (req.header('authorization')) {
    // If one exists, attempt to get the header data
    var token = req.header('authorization').split('Bearer ')[1];
    // If there's nothing after "Bearer", just continue to the next handler
    if (!token) {return next();}
    // If there is something, attempt to parse it as a JWT token.  If there are any
    // problems, just continue to the next handler in a non-logged in state.
    return jwt.verify(token, sails.config.jwtSecret, function(err, payload) {
      if (err) {return next();}
      if (!payload.user) {return next();}
      User.findOne(payload.user, function(err, user) {
        if (err) {return res.negotiate(err);}
        if (!user) {return res.next();}
        // Save the user object on the request (i.e. "log in") and continue.
        req.user = user;
        return next();
      });
    });
  }
  // No header, no problem -- just continue in a logged-out state
  return next();

};
