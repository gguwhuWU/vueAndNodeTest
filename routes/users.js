var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET users listing. */
router.get('/admin', function(req, res, next) {
  res.send('你沒有權限唷');
});

router.get('/user/:id', function(req, res) {
  res.send(req.params.id);}
);

router.get('/user/:name/:nickname', function(req, res) {
  res.send(req.params.name + ' is so ' + req.params.nickname);
});

module.exports = router;
