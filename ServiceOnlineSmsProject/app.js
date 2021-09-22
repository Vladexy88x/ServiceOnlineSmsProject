const express = require('express');
const app = express();
const port = 3002;
const ware = require('./logicApi');
const content = require('./content');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
// const path = require('path');
const PassportInitialize = require('./passportConfig/passport-init');
const SqlInitialize = require('./database/sql-init');
const SendMail = require('./sendmail');

app.use(express.static(`${__dirname}/public` + '/js'));
app.use(express.static(`${__dirname}/public` + '/css'));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
app.use(session({
  secret: 'SECRET',
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
  next();
});

const users = [
  { login: 'vlad', password: '241x' },
  { login: 'mem', password: '12' },
];
let localUserName;
let localBalance;

PassportInitialize(
  passport,
  (login) => users.find((user) => user.login === login),
  (id) => users.find((user) => user.id === id),
  (password) => users.find((user) => user.password === password),
);

const CheckNotAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect('/content');
  }
  if (req.body.username == '' | req.body.password == '') {
    console.log('failed logs');
  } else {
    localUserName = req.body.username;
    if (localUserName != undefined) {
      DetermineBalanceByUsername();
    }
  }
  next();
};

const CheckAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/auth');
};

const DetermineBalanceByUsername = () => {
  if (users.length == 0) {
    return;
  }
  const selectUser = users.find((user) => user.login === localUserName);
  if (selectUser == undefined) {
    return;
  }
  if (selectUser.login === localUserName) {
    localBalance = selectUser.balance;
  }
};

app.get('/', CheckAuthenticated, (request, response) => {
  response.send('lel');
});

app.get('/passwordreset', CheckNotAuthenticated, (req, res, next) => {
  content.PasswordResetPage(res);
});

app.post('/passwordreset', CheckNotAuthenticated, (req, res, next) => {
  if (req.body.email.indexOf('@') == -1 || req.body.email == '' || req.body.password == '' || req.body.username == '') {
    return;
  }
  const s = req.body.email;
  const importanUser = '';
  const newPassword = req.body.password;
  console.log(req.headers.referer);
  res.redirect('/auth');
  // SqlInitialize.Initialize().then(result => {
  //     for (let i = 0; i < result[0].length; i++) {
  //         if (req.body.username === result[0][i].login) {
  //             importanUser = result[0][i].password;
  //             result[0][i].password = newPassword;
  //             users.push(result[0][i]);
  //             console.log("Us " + users);
  //             SqlInitialize.PasswordСhange(result[0][i].id, newPassword);

  //             console.log(`Email:  ${s}`);
  //             SendMail(req.body.email, newPassword);
  //             res.redirect('/auth');
  //         }
  //     }
  // })
  // res.sendStatus(200);
});

app.get('/checkauth', CheckNotAuthenticated, (req, res, next) => {
  if (req.headers.referer === `http://${req.get('host')}/auth`) {
    content.FailedAuthorizationPage(res);
  } else {
    res.sendStatus(404);
  }
});

app.get('/auth', CheckNotAuthenticated, (req, res, next) => {
  content.AuthPage(res);

  // SqlInitialize.Initialize().then(result => {
  //     for (let i = 0; i < result[0].length; i++) {
  //         users.push(result[0][i]);
  //     }
  // })
  // example
  // users[0]['id']
});

app.post('/auth', CheckNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/content',
  failureRedirect: '/checkauth',
}));

app.get('/content', CheckAuthenticated, (req, res, next) => {
  content.HomePage(res);
});

app.get('/register', CheckNotAuthenticated, (req, res, next) => {
  content.RegisterPage(res);
});

app.post('/register', CheckNotAuthenticated, (req, res, next) => {
  try {
    const generateId = Math.random() * 4000;
    SqlInitialize.AddUser(generateId, req.body.username, req.body.password);
    res.redirect('/auth');
  } catch (err) {
    res.redirect('/register');
  }
});

app.post('/logout', (req, res) => {
  req.logOut();
  res.redirect('/auth');
});

app.get('/localdata', CheckAuthenticated, (req, res, next) => {
  res.send(JSON.stringify({ username: localUserName, balance: localBalance }));
});

app.get('/getuserinfo', CheckAuthenticated, (req, res, next) => {
  // res.redirect('/auth');
  ware.GetUserInfo(req, res, next);
});

app.get('/getcountnew', CheckAuthenticated, (req, res, next) => {
  // req.query.service == "opt3";
  ware.GetCountNew(req, res, next);
});

app.get('/getserviceprice', CheckAuthenticated, (req, res, next) => {
  ware.GetServicePrice(req, res, next);
});

app.get('/getnumber', CheckAuthenticated, (req, res, next) => {
  ware.GetNumber(req, res, next);
});

app.get('/getsms', CheckAuthenticated, (req, res, next) => {
  ware.GetSms(req, res, next);
});

app.get('/bannumber', CheckAuthenticated, (req, res, next) => {
  ware.BanNumber(req, res, next);
});

app.get('/rejectionofnumber', CheckAuthenticated, (req, res, next) => {
  ware.RejectionOfNumber(req, res, next);
});
// response: "{"response":"1","number":"9033995628","id":51068051,"again":0,"text":null,"extra":"","karma":50,"pass":null,"sms":null,"balanceOnPhone":0,"service":null,"country":null,"CountryCode":"+7","branchId":0,"callForwarding":false,"goipSlotId":-1}"

app.get('/getclearsms', CheckAuthenticated, (req, res, next) => {
  ware.GetClearSms(req, res, next);
});

app.get('/getchecknumber', CheckAuthenticated, (req, res, next) => {
  ware.GetCheckNumber(req, res, next);
});
// response: "{"response":"1","number":"9033965769","id":51141602,"again":0,"text":null,"extra":"","karma":47.050000000000026,"pass":null,"sms":null,"balanceOnPhone":0,"service":null,"country":null,"CountryCode":"+7","branchId":0,"callForwarding":false,"goipSlotId":-1}"

// npm init для создания package.json
app.listen(port, () => {
  console.log(`${port}`);
});
