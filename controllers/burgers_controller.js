var burgerRoutes = function(app,models){
app.get('/', function (req, res) {
	res.redirect('/burgers');
});

app.get('/burgers', function (req, res) {
	models.burgers.findAll({limit:100}).then(function(data){
		var  burgersObject = {burgers:data};
	 	res.render('index',burgersObject);})
});

app.post('/burgers/create', function (req, res) {
	var condition = req.body.name;
	var conditionFixed = condition.replace(/0|'|"|%|_/g, " ");
	console.log(conditionFixed);
	models.burgers.create({
		burger_name:conditionFixed,
		devoured:0
	})
});

app.put('/burgers/modify/:id', function (req, res) {
	var condition = req.params.id;
	var condition2 = req.body.devoured;
	models.burgers.find({where:{id:condition}}).then(function(data){
		data.updateAttributes({
			devoured:condition2
		})
		res.redirect('/burgers');
	})
});
}


module.exports = burgerRoutes;