var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var path = require('path');

var app = express();
var models = require('./models');
var sequelizeConnection = models.sequelize



sequelizeConnection.sync();




app.set('port', (process.env.PORT || 3000));


app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({
	extended: false
}));

app.use(methodOverride('_method'));
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
	defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');


// REQUIRE THIS WHEN YOU HAVE EVERYTHING SET UP
//var routes = require('./controllers/burgers_controller.js');
var router = express.Router();

app.use('/', router);

router.get('/', function (req, res) {
	res.redirect('/burgers');
});

router.get('/burgers', function (req, res) {
	models.burgers.findAll({limit:100}).then(function(data){
		var  burgersObject = {burgers:data};
	 	res.render('index',burgersObject);})
});




router.post('/burgers/create', function (req, res) {
	var condition = req.body.name;
	var conditionFixed = condition.replace(/0|'|"|%|_/g, " ");
	console.log(conditionFixed);
	models.burgers.create({
		burger_name:conditionFixed,
		devoured:0
	})
});


router.put('/burgers/modify/:id', function (req, res) {
	var condition = req.params.id;
	var condition2 = req.body.devoured;
	models.burgers.find({where:{id:condition}}).then(function(data){
		data.updateAttributes({
			devoured:condition2
		})
	})
});







app.listen(app.get('port'), function () {
	console.log('App listening on PORT ', app.get('port'));
});
