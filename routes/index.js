var recordJSON = require("../record.json");
const mysql = require('mysql');
// databsae connection
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "balance"
});
con.connect(function (){
	console.log("Database Connected!");
})

//home page
exports.home = function(req,res){
	
	res.render("home", {
		name : "Jimmy",
	})
};

exports.balance = (req,res) =>{
	console.log("A user has connected.");
	const query = "SELECT * FROM balance ORDER BY recordDate DESC";
	con.query(query, function (err, result, fields){
		if (err) throw console.log(query);
		res.results = result;
		//console.log(res.results);
		res.render("balance",{
			results : res.results,
		});
	});
	
};
// upload record
exports.upload = function (req, res){
	const curr = req.body.currency;
	const amount = req.body.amount;
	const date = req.body.date;
	const description = req.body.desc;
	console.log(date);
	var sql = "INSERT INTO balance (Currency, Amount, recordDate, Description) VALUES (?, ?, ?, ?)";
	con.query(sql,[curr, amount, date, description ] , function (err, result) {
		if (err) throw err;
		console.log("1 record inserted");
	});
	res.redirect(req.get('referer'));
}
// display records

exports.notFound = function (req, res){
	res.send("This is not the page you are looking for.");
};

