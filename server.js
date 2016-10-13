var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var path = require('path');
var burgerRoutes = require('./controllers/burgers_controller.js');
var app = express();
var models = require('./models');
var sequelizeConnection = models.sequelize

//future use
//sequelizeConnection.sync();

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


burgerRoutes(app,models);


app.listen(app.get('port'), function () {
	console.log('App listening on PORT ', app.get('port'));
});
