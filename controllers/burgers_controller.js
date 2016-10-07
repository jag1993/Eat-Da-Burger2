var express = require('express');
var router = express.Router();
var burgers = require('../models/burger.js');
var querystring = require('querystring');


router.get('/', function (req, res) {
	res.redirect('/burgers');
});

router.get('/burgers', function (req, res) {
	burgers.showAll(function(data){
		var  burgersObject = {burgers:data};
		res.render('index',burgersObject);
	})
});




router.post('/burgers/create', function (req, res) {
	var condition = req.body.name;
	var conditionFixed = condition.replace(/0|'|"|%|_/g, " ");
	console.log(conditionFixed);
	burgers.create('burger_name',conditionFixed,function () {
		res.redirect('/burgers');
	});
});




router.put('/burgers/modify/:id', function (req, res) {
	var condition = 'id = ' + req.params.id;

	console.log('condition', condition);

	burgers.modify('devoured',req.body.devoured,condition, function () {
		res.redirect('/burgers');
	});
});




module.exports = router;