var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');

/* GET home page. */
router.get('/', function (req, res, next) {
  console.log('req.user--->', req.user);

  let token = jwt.sign({ uid: '1001' }, 'xiaodong');
  // res.render('index', { title: 'Bearer ' + token });
  res.status(200).json({ result: 'ok' })
});

module.exports = router;