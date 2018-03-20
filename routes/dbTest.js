var express = require('express');
var router = express.Router();
var repository = require('../repository/mysqlTest');

router.get('/', function(req, res, next) {
    var result = repository.GetItems();
    res.send(result);
});

router.get('/:id', function(req, res, next) {
    var result = repository.GetItem(req.params.id);
    res.send(result);
});

router.delete('/:id', function(req, res, next) {
    var result = repository.DeleteItem(req.params.id);
    res.send(result);
});

router.post('/', function(req, res) {
    var result = repository.CreateItem(req.params.id, '5');
    res.send(result);
});

router.put('/:id', function(req, res) {
    var result = repository.UpdateItem(req.params.id, '9');
    res.send(result);
});

module.exports = router;
