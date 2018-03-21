var express = require('express');
var router = express.Router();
var repository = require('../repository/userRepository');

router.get('/', function(req, res, next) {
    repository.GetUsers()
    .then(function (result) {
        res.send(result);
    }).catch(function (err) {
        res.status(500).send(err.message);
    });
});

router.get('/:id', function(req, res, next) {
    repository.GetUser(req.params.id)
    .then(function (result) {
        res.send(result);
    }).catch(function (err) {
        res.status(500).send(err.message);
    });
});

router.delete('/:id', function(req, res, next) {
    repository.DeleteUserById(req.params.id).
    then(function (result) {
        res.send('ok');
    }).catch(function (err) {
        res.status(500).send(err.message);
    });
});

router.post('/', function(req, res) {
    
    var gender = req.body.gender;
    var userName = req.body.userName;
    var email = req.body.email;  
    var version =  req.body.version; 
    var commit = req.body.commit;

    repository.CreateUser(gender, userName, email, version, commit)
    .then(function (p) {
        res.send('ok');
    }).catch(function (err) {
        res.status(500).send(err.message);
    });
});

router.patch('/:id', function(req, res) {
    repository.UpdateUser(req.params.id, req.body.userName)
    .then(function (result) {
        res.send('ok');
    }).catch(function (err) {
        res.status(500).send(err.message);
    });
});

module.exports = router;
