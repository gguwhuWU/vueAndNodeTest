var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var _ = require('lodash');
  //console.log(_.compact([0, 1, false, 2, '', 3]));
  res.render('Index.html');
});

router.get('/form', function(req, res, next) {
  res.render('form.html');
});

router.get('/componentTest', function(req, res, next) {
  res.render('componentTest.html');
});

router.get('/ajaxTest', function(req, res, next) {
  res.render('ajaxTest.html');
});

router.get('/listTest', function(req, res, next) {
  res.render('listTest.html');
});

router.get('/vuetifyTest', function(req, res, next) {
  res.render('vuetify.html');
});

router.get('/materializeTest', function(req, res, next) {
  res.render('materializeTest.html');
});

router.get('/user', function(req, res, next) {

  if (req.query.id == 70915)
  {
    var result = JSON.stringify({ 
      name: 'huanyu wu',
      password: '123456789' 
    });

    res.send(result);
  }
  else
  {
    res.status(500).send('找無此資料');
  }
  
});

router.post('/user', function(req, res, next) {
    var result = JSON.stringify({ 
      id: 2, 
      aName: 'jojo'
    });

    res.send(result);
});

module.exports = router;
