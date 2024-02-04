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
  token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YmY3ZGY1ODVjNmQ2YjlhMmE4ZTJlNyIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzA3MDQ4NDM3fQ.dtAo4pzXh197Y05UvJI-4qTlFIZE5_bunopkvTPgdHk";


  
  return token;
};