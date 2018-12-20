'use strict'
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var fs = require('fs');
//Configuring the Express Middleware
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
//Configure Express to Recieve JSON and extended URLencoded formats
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var mailer = require('./mailer');

global.result = "";

// var accessLogStream = fs.createWriteStream(__dirname + '/logs/access.log', {flags: 'a'})

//Configure Morgan's Logging Formats
// app.use(morgan('common', {stream: accessLogStream}))    //UNCOMMENT TO ENABLE FILE LOGGING
// app.use(morgan('common'));
app.use(express.static(__dirname));


//Set PORT to Dynamic Environments to run on any Server
var port = process.env.PORT || 3000;

//Configure Express to Recieve JSON and extended URLencoded formats
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//Set RESTful routes

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.post('/mail', function (req, res) {
	// console.log("Event : " + JSON.stringify(req.body))
	let fname = req.body.title.replace(/ /g,"_") + '.txt';
	let fpath = './transcripts/'+fname;
	fs.writeFile(fpath, req.body.payload, (err) => {  
		// throws an error, you could also catch it here
		if (err){
			res.status(500).json({
				error: true,
				message: err
			})
		}	
		// success case, the file was saved
		console.log('Transcript saved!');
		    mailer.Mailer(req.body.to, req.body.title, fname, fpath, (error, result)=>{
			console.log(result);
			if(error){
				res.status(500).json({
					error: true,
					message: error
				})
			}
			else{
				res.status(200).json({
					error: false,
					message: result
					
				})
			}
		})
	});



})
// app.get('/visualizer', function(req, res) {
//     res.sendFile(__dirname + '/home.html');
// });

// app.get('/listen', function(req, res) {
//     res.send(global.result)
//     // fs.createReadStream('./transcript.txt')
//     // .pipe(res)
//     // .on('error',console.error);
// });

// app.post('/intermediate', function(req, res) {
//     // console.log("/intermediate : called!"  + JSON.stringify(req.body));
//     // fs.appendFile("transcript.txt", req.body.payload, function(err) {
//     //     if(err) {
//     //         return console.log(err);
//     //     }
    
//     //     // console.log("The file was updated!");
//     // }); 
//     global.result = req.body.payload;
//     res.send("response|" + req.body.payload)
// });
//Route for GET

//Route for file uploads

app.listen(port);
console.log("Server started successfully at PORT : " + port);
//module.exports=app;