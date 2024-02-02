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
  // token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YWUxMGVjMjRkNDM5YjRiMGQ5OGI5NyIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzA1OTA2NDEyfQ.JqoLb-2He7-5KIhXPpboVkZBqxfbirNg2OncurRvXIE";

  // token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YWUxODk5OTc0Njg2ODk1MGE3YWY3NSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzA1OTA4Mzc3fQ.2u00Uv_pEJY1vp9Go-vKf-M-h_1CwaKHQpTkAU52low";
  // ajay 
  // token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YmQyMDRhMTgyN2IyMjVkMjYxOTgyMCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzA2ODkzMzg3fQ.Y6dcfDTrzPySajdVoqYN6ZsHlxEJs0CoJPZA3B8H0Yg";
  // token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YjI2ZjY1NWU0YmE4MGE4MTE3NjRhMSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzA2MTkyNzQxfQ.akpgk3eTPM0k4ejEibpNj43t0Y35MihVOng5Aiw_c0Q";

  
  return token;
};