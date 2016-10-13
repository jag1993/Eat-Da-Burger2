// var mysql = require('mysql');
var Sequelize = require('sequelize');
var connection;



if(process.env.JAWSDB_URL){
	connection = new Sequelize(process.env.JAWSDB_URL);
}else{
 connection =	new Sequelize('burgers_db','root','',{
	host: 'localhost',
	dialect: 'mysql',
	port: 3306
})
};

connection.connect(function (err) {
	if (err) {
		console.error('error connecting: ' + err.stack);
		return;
	}
	console.log('connected as id ' + connection.threadId);
});

module.exports = connection;
