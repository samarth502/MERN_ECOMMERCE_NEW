const passport = require('passport');

exports.isAuth = () => {
 return passport.authenticate('jwt');
};
exports.sanitizeUser = (user) => {
  return { id: user.id, role: user.role };
};

exports.cookieExtractor = function(req) {
  var token = null;
  if (req && req.cookies) {
      token = req.cookies['jwt'];
  }
  // token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YmY1NDM1Y2I2NGUwYjRjNGJlZTNlYSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzA3MDM3NzQ5fQ.E1qo_5I4E0tnhkv7IAv16RBqUDgQqLHqQFxfhPKuf1M";


  
  return token;
};