var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyparser = require('body-parser');
var pg = require('pg');

var app = express();

const PORT = process.env.PORT || 3001;
//print function
function sprintf(template, values) {
  return template.replace(/%s/g, function() {
    return values.shift();
  });
}


//database credentials
var configDB = {
	database: 'd5r8q9aits7tmi',
	port: 5432,
	host: 'ec2-23-21-217-27.compute-1.amazonaws.com',
	user: 'cvbkopwrapmbzf',
	password: 'e580720ea2ff3875334d1b84d5f33afccc2afe0c8b6f3c0aa88562c4e6367b8d',
	ssl: true
}

//Create pg Pool with configDB
var pool = new pg.Pool(configDB);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// error handler

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//Post
//Insert Patient
//For Insert Patients
app.post('/api/addPatient', function(req,res){
	//console.log(req.body);
	var pssn = req.body.pssn;
	var pname = req.body.pname;
	var gender = req.body.gender;
	var age = req.body.age;
	pool.connect(function(err,client,done){
		if (err){
			return res.send(err);
		}
		else {
			var values = sprintf("'%s', '%s', '%s', ",[pssn,pname,gender]);
			client.query("INSERT INTO Patient(PSSN, Name, Gender, Age) VALUES ("+values+age+");", [], function(err, result){
				done();
				if (err){
					//res.json(values+''+age);
					return res.send(err);
				}
				res.send({status: 'Insert Success'});
			})
		}
	})
})
//For Insert Admissions
app.post('/api/addAdmission', function(req,res){
	
	var enter = req.body.enter;
	var leave = req.body.leave;
	var payment = req.body.payment;
	var insurance = req.body.insurance;
	var detail = req.body.detail;
	var pid = req.body.pid;
	pool.connect(function(err,client,done){
		if (err){
			return res.send(err);
		}
		else {
			var values = sprintf("'%s', '%s', '%s', ",[payment,insurance,detail]);
			client.query("INSERT INTO Admission(PaymentInfo,InsuranceCover, Detail, PID, Enter_time,Leave_time) VALUES ("+values+pid+", DATE\'"+enter+"\', DATE\'"+leave+"\' );", [], function(err, result){
				done();
				if (err){
					//res.json(values+''+age);
					return res.send(err);
				}
				res.send({status: 'Insert Success'});
			})
		}
	})
})
//For Modify Patients
app.put('/api/modifyPatient/:id', function(req,res){
	//console.log(req.body);
	var patientID = req.params.id;
	var pssn = req.body.pssn;
	//console.log(pssn);
	var pname = req.body.pname;
	var gender = req.body.gender;
	var age = req.body.age;
	pool.connect(function(err,client,done){
		if (err){
			return res.send(err);
		}
		else {
			//var values = sprintf("'%s', '%s', '%s', ",[pssn,pname,gender]);
			client.query("Update Patient set PSSN=\'"+pssn+"\', Name=\'"+pname+"\', Gender=\'"+gender+"\', Age="+age+" WHERE pid="+patientID+";", [], function(err, result){
				done();
				if (err){
					//res.json(values+''+age);
					return res.send(err);
				}
				res.send({status: 'Modify Success'});
			})
		}
	})
})
//For booking rooms
app.post('/api/bookRoom/:id', function(req,res){
	//console.log(req.body);
	var roomID = req.params.id;
	var patientID = req.body.pid;
	//console.log("Insert into Stay(pid,rid) values ("+patientID+","+roomID+");");
	pool.connect(function(err,client,done){
		if (err){
			return res.send(err);
		}
		else {
			//var values = sprintf("'%s', '%s', '%s', ",[pssn,pname,gender]);
			client.query("Insert into Stay(pid,rid) values ("+patientID+","+roomID+");", [], function(err, result){
				done();
				if (err){
					//res.json(values+''+age);
					return res.send(err);
				}
				res.send({status: 'Book Room Success'});
			})
		}
	})
})
//For Modify Employee

//For Delete patient
app.delete('/api/deletePatient/:id', function(req,res){
	//console.log(req.body);
	var patientID = req.params.id;
	pool.connect(function(err, client, done) {
    // Handle connection errors
	    if(err) {
	      done();
	      console.log(err);
	      return res.status(500).json({success: false, data: err});
	    }
	    // SQL Query > Delete Data
	    client.query('DELETE FROM Patient WHERE pid=($1)', [patientID], function(err, result){
			done();
			if (err){
				//res.json(values+''+age);
				return res.send(err);
			}
			res.send({status: 'Delete Success'});
		});
	   
	 });
})
//For Delete Admission
app.delete('/api/deleteAdmission/:id', function(req,res){
	//console.log(req.body);
	var admissionID = req.params.id;
	pool.connect(function(err, client, done) {
    // Handle connection errors
	    if(err) {
	      done();
	      console.log(err);
	      return res.status(500).json({success: false, data: err});
	    }
	    // SQL Query > Delete Data
	    client.query('DELETE FROM Admission WHERE aid=($1)', [admissionID], function(err, result){
			done();
			if (err){
				//res.json(values+''+age);
				return res.send(err);
			}
			res.send({status: 'Delete Success'});
		});
	   
	 });
})
//For Delete Stay
app.delete('/api/deleteStay/:id', function(req,res){
	//console.log(req.body);
	var patientID = req.params.id;
	pool.connect(function(err, client, done) {
    // Handle connection errors
	    if(err) {
	      done();
	      console.log(err);
	      return res.status(500).json({success: false, data: err});
	    }
	    // SQL Query > Delete Data
	    client.query('DELETE FROM Stay WHERE pid=($1)', [patientID], function(err, result){
			done();
			if (err){
				//res.json(values+''+age);
				return res.send(err);
			}
			res.send({status: 'Delete Success'});
		});
	   
	 });
})
//For Modify Admission

//GET
//Patient select all
app.get('/api/patient',function(req,res,next){
	pool.connect(function(err,client,done){
		if (err){
			return res.status(400).send(err);
		}
		client.query('Select Patient.PID,PSSN,Name,Gender,Age,s.RID from Patient left Join stay s ON Patient.PID = s.PID left join room r on r.rid=s.rid;', [], function(err, result) {
			done();
			if (err){
				return next(err);
			}
			res.setHeader("Access-Control-Allow-Origin", "*");
		    res.setHeader("Access-Control-Allow-Credentials", "true");
		    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
		    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
			res.json(result.rows);
		})
	})
});
//Patient by ID
app.get('/api/patient/:id',function(req,res,next){
	var patientID = req.params.id;
	pool.connect(function(err,client,done){
		if (err){
			return res.status(400).send(err);
		}
		client.query('Select Patient.PID,PSSN,Name,Gender,Age,s.RID from Patient left Join stay s ON Patient.PID = s.PID where patient.pid='+patientID+' ;', [], function(err, result) {
			done();
			if (err){
				return next(err);
			}
			res.setHeader("Access-Control-Allow-Origin", "*");
		    res.setHeader("Access-Control-Allow-Credentials", "true");
		    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
		    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
			res.json(result.rows);
		})
	})
});
//Admission select all
app.get('/api/admission',function(req,res,next){
	pool.connect(function(err,client,done){
		if (err){
			return res.status(400).send(err);
		}
		client.query("Select AID,P.Name,to_char(\"enter_time\",'MM/DD/YYYY') AS enter_time,to_char(\"leave_time\",'MM/DD/YYYY') AS leave_time,PaymentInfo,InsuranceCover,Detail from Admission Join Patient P ON P.PID=Admission.PID;", [], function(err, result) {
			done();
			if (err){
				return next(err);
			}
			res.setHeader("Access-Control-Allow-Origin", "*");
		    res.setHeader("Access-Control-Allow-Credentials", "true");
		    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
		    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
			res.json(result.rows);
		})
	})
});
//Get Admission by ID
app.get('/api/admission/:id',function(req,res,next){
	var patientID = req.params.id;
	pool.connect(function(err,client,done){
		if (err){
			return res.status(400).send(err);
		}
		client.query("Select AID,P.Name,to_char(\"enter_time\",'MM/DD/YYYY') AS enter_time,to_char(\"leave_time\",'MM/DD/YYYY') AS leave_time,PaymentInfo,InsuranceCover,Detail from Admission Join Patient P ON P.PID=Admission.PID where P.PID="+patientID+";", [], function(err, result) {
			done();
			if (err){
				return next(err);
			}
			res.setHeader("Access-Control-Allow-Origin", "*");
		    res.setHeader("Access-Control-Allow-Credentials", "true");
		    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
		    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
			res.json(result.rows);

		})
	})
});
//Get Report by ID
app.get('/api/report/:id',function(req,res,next){
	var patientID = req.params.id;
	pool.connect(function(err,client,done){
		if (err){
			return res.status(400).send(err);
		}
		client.query("Select E.name as e_name,P.name as p_name,Diagnosis,to_char(\"record_date\",'MM/DD/YYYY') AS record_date,Detail,Remark from Report join employee E ON E.eid = Report.docid join Patient P ON P.pid=Report.pid where P.pid="+patientID+";", [], function(err, result) {
			done();
			if (err){
				return next(err);
			}
			res.setHeader("Access-Control-Allow-Origin", "*");
		    res.setHeader("Access-Control-Allow-Credentials", "true");
		    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
		    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
			res.json(result.rows);

		})
	})
});
//Report select all
app.get('/api/report',function(req,res,next){
	pool.connect(function(err,client,done){
		if (err){
			return res.status(400).send(err);
		}
		client.query("Select E.name as e_name,P.name as p_name,Diagnosis,to_char(\"record_date\",'MM/DD/YYYY') AS record_date,Detail,Remark from Report join employee E ON E.eid = Report.docid join Patient P ON P.pid=Report.pid;", [], function(err, result) {
			done();
			if (err){
				return next(err);
			}
			res.setHeader("Access-Control-Allow-Origin", "*");
		    res.setHeader("Access-Control-Allow-Credentials", "true");
		    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
		    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
			res.json(result.rows);
		})
	})
});
//Employee select all
app.get('/api/employee',function(req,res,next){
	pool.connect(function(err,client,done){
		if (err){
			return res.status(400).send(err);
		}
		client.query("Select e.essn, e.eid, e.name, e.gender, e.age, e.salary, e.job_title, case when (e.eid in (select a.eid from administrator a)) then 'Administrator' when (e.eid in (select d.eid from doctor d)) then 'Doctor' else 'Other' end as type from employee e;", [], function(err, result) {
			done();
			if (err){
				return next(err);
			}
			res.setHeader("Access-Control-Allow-Origin", "*");
		    res.setHeader("Access-Control-Allow-Credentials", "true");
		    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
		    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
			res.json(result.rows);
		})
	})
});
//Department select all
app.get('/api/department',function(req,res,next){
	pool.connect(function(err,client,done){
		if (err){
			return res.status(400).send(err);
		}
		client.query("Select * from department;", [], function(err, result) {
			done();
			if (err){
				return next(err);
			}
			res.setHeader("Access-Control-Allow-Origin", "*");
		    res.setHeader("Access-Control-Allow-Credentials", "true");
		    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
		    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
			res.json(result.rows);
		})
	})
});

//Room select all
app.get('/api/room',function(req,res,next){
	pool.connect(function(err,client,done){
		if (err){
			return res.status(400).send(err);
		}
		client.query("Select r.rid, r.location, r.occupiedflag, d.d_name, r.capacity from room r join hasroom on r.rid=hasroom.rid join department d on hasroom.did=d.did;", [], function(err, result) {
			done();
			if (err){
				return next(err);
			}
			res.setHeader("Access-Control-Allow-Origin", "*");
		    res.setHeader("Access-Control-Allow-Credentials", "true");
		    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
		    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
			res.json(result.rows);
		})
	})
});
//Room available
app.get('/api/availableRoom',function(req,res,next){
	pool.connect(function(err,client,done){
		if (err){
			return res.status(400).send(err);
		}
		client.query("Select r.rid, r.location from room r where r.occupiedflag=false;", [], function(err, result) {
			done();
			if (err){
				return next(err);
			}
			res.setHeader("Access-Control-Allow-Origin", "*");
		    res.setHeader("Access-Control-Allow-Credentials", "true");
		    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
		    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
			res.json(result.rows);
		})
	})
});
//Equipment select all
app.get('/api/equipment',function(req,res,next){
	pool.connect(function(err,client,done){
		if (err){
			return res.status(400).send(err);
		}
		client.query("Select e.serialnum, e.inspectime, e.purchasetime, e.rid from equipment e;", [], function(err, result) {
			done();
			if (err){
				return next(err);
			}
			res.setHeader("Access-Control-Allow-Origin", "*");
		    res.setHeader("Access-Control-Allow-Credentials", "true");
		    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
		    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
			res.json(result.rows);
		})
	})
});

//module.exports = app;
app.listen(PORT, function(){
	console.log('app listening on port '+ PORT + '!');
});