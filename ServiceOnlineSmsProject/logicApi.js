const fetch = require('node-fetch');

const ApiKey = '';

const GetUserInfo = (req, res, next) => {
  let preResult = '';
  fetch(`http://simsms.org/priemnik.php?metod=get_userinfo&service=opt4&apikey=${ApiKey}`)
    .then((response) => response.json())
    .then((result) => {
      preResult = result;
      res.send(preResult);
    });
};

const GetCountNew = (req, res, next) => {
  let preResult = '';
  fetch(`http://simsms.org/priemnik.php?metod=get_count_new&service=${req.query.service}&country=${req.query.country}&apikey=${ApiKey}`)
    .then((response) => response.json())
    .then((result) => {
      preResult = result;
      res.send(preResult);
    });
};

const GetServicePrice = (req, res, next) => {
  let preResult = '';
  fetch(`http://simsms.org/priemnik.php?metod=get_service_price&service=${req.query.service}&country=${req.query.country}&apikey=${ApiKey}`)
    .then((response) => response.json())
    .then((result) => {
      preResult = result;
      res.send(preResult);
    });
};

const GetNumber = (req, res, next) => {
  let preResult = '';
  fetch(`http://simsms.org/priemnik.php?metod=get_number&service=${req.query.service}&country=${req.query.country}&apikey=${ApiKey}`)
    .then((response) => response.json())
    .then((result) => {
      preResult = result;
      res.send(preResult);
    });
};

const GetSms = (req, res, next) => {
  let preResult = '';
  fetch(`http://simsms.org/priemnik.php?metod=get_sms&id=${req.query.id}&service=${req.query.service}&country=${req.query.country}&apikey=${ApiKey}`)
    .then((response) => response.json())
    .then((result) => {
      preResult = result;
      res.send(preResult);
    });
};

const BanNumber = (req, res, next) => {
  let preResult = '';
  fetch(`http://simsms.org/priemnik.php?metod=ban&service=${req.query.service}&apikey=${ApiKey}&id=${req.query.id}`)
    .then((response) => response.json())
    .then((result) => {
      preResult = result;
      res.send(preResult);
    });
};

const RejectionOfNumber = (req, res, next) => {
  let preResult = '';
  fetch(`http://simsms.org/priemnik.php?metod=denial&service=${req.query.service}&country=${req.query.country}&apikey=${ApiKey}&id=${req.query.id}`)
    .then((response) => response.json())
    .then((result) => {
      preResult = result;
      res.send(preResult);
    });
};

const GetClearSms = (req, res, next) => {
  let preResult = '';
  fetch(`http://simsms.org/priemnik.php?metod=get_clearsms&service=${req.query.service}&apikey=${ApiKey}&id=${req.query.id}`)
    .then((response) => response.json())
    .then((result) => {
      preResult = result;
      res.send(preResult);
    });
};

const GetCheckNumber = (req, res, next) => {
  let preResult = '';
  fetch(`http://simsms.org/priemnik.php?metod=get_proverka&service=${req.query.service}&id=${req.query.id}&apikey=${ApiKey}&number=${req.query.number}`)
    .then((response) => response.json())
    .then((result) => {
      preResult = result;
      res.send(preResult);
    });
};

module.exports.GetUserInfo = GetUserInfo;
module.exports.GetCountNew = GetCountNew;
module.exports.GetServicePrice = GetServicePrice;
module.exports.GetNumber = GetNumber;
module.exports.GetSms = GetSms;
module.exports.BanNumber = BanNumber;
module.exports.RejectionOfNumber = RejectionOfNumber;
module.exports.GetClearSms = GetClearSms;
module.exports.GetCheckNumber = GetCheckNumber;
