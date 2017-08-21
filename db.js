var mysql = require('mysql');
var nodemailer = require('nodemailer');
var async = require('async');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nodeusers"
});


con.connect(function(err) {
  if (err) throw err;
  console.log('Connected to DB');
});

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'shubham.borikar@ves.ac.in',
    pass: 'snehal9892'
  }
});

con.query("SELECT email FROM users", function (err, row, fields) 
{
    if (err) throw err;


    var toSend=[];
	for (var i in row) 
	{ // Email content; change text to html to have html emails. 
		toSend.push({//row[i].column name will pull relevant database info 
	    	to: row[i].email,
			from: 'shubham.borikar@ves.ac.in',
			subject: 'Sending Email using Node.js',
			html: '<h1 style="color:#3300aa;font-size:20px;font-family:calibri">Hi</h1><p style="color:blue;font-size:20px;font-family:calibri">This is an html email that I am sending using <b>NodeJS</b></p>'
	 	});
	}

	// Send emails
	 async.eachSeries(toSend, function( sendit, callback) 
	 {
	    transporter.sendMail(sendit,function(error,response){
        if (error) 
        {
        	callback(error);
        }
        else
        {
       		 console.log("Message sent1: " + sendit.to); callback();
        }
	     }),function(err){if (err) throw (err); console.log("Finished")};
	 });
	
	/*
	for (var i in row) 
	{
  		var sendit = 
	  	{
		  	to: row[i].email,
			from: 'shubham.borikar@ves.ac.in',
			subject: 'Sending Email using Node.js',
			html: '<h1 style="color:#3300aa;font-size:20px;font-family:calibri">Hi</h1><p style="color:blue;font-size:20px;font-family:calibri">This is an html email that I am sending using <b>NodeJS</b></p>'
	  	};

  	// Send email
  	sendmail(sendit, row[i].email);
	
	}

function sendmail(sendit, username){
  transporter.sendMail(sendit,function(error,response){
    if (error) {
      console.log(error);
    } else {
      console.log("Message sent: " + username);}
      transporter.close();
    }
  )
};
*/


});