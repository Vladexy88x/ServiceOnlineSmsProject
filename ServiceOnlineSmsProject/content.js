const path = require('path');

const HomePage = (res) => {
  res.sendFile(path.join(`${__dirname}/public` + '/index.html'));
};

const AuthPage = (res) => {
  res.sendFile(path.join(`${__dirname}/public` + '/authorization.html'));
  console.log(__dirname);
};

const RegisterPage = (res) => {
  res.sendFile(path.join(`${__dirname}/public` + '/registration.html'));
};

const FailedAuthorizationPage = (res) => {
  res.sendFile(path.join(`${__dirname}/public` + '/failedAuthorization.html'));
};
const PasswordResetPage = (res) => {
  res.sendFile(path.join(`${__dirname}/public` + '/passwordReset.html'));
};

module.exports.HomePage = HomePage;
module.exports.AuthPage = AuthPage;
module.exports.RegisterPage = RegisterPage;
module.exports.FailedAuthorizationPage = FailedAuthorizationPage;
module.exports.PasswordResetPage = PasswordResetPage;
