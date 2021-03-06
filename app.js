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
	user: '',
	password: '',
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
//For Add Employee
app.post('/api/addEmployee', function(req,res){
	
	var essn = req.body.essn;
	var name = req.body.name;
	var gender = req.body.gender;
	var age = req.body.age;
	var salary = req.body.salary;
	var job_title = req.body.job_title;
	pool.connect(function(err,client,done){
		if (err){
			return res.send(err);
		}
		else {
			var values = sprintf("'%s', '%s', '%s', ",[essn,name,job_title]);
			client.query("INSERT INTO employee(essn,name,job_title,salary,gender,age) VALUES ("+values+salary+", \'"+gender+"\', "+age+");", [], function(err, result){
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
//For Add Room
app.post('/api/addRoom', function(req,res){
	
	var location = req.body.location;
	var capacity = req.body.capacity;
	console.log("INSERT INTO room(location,capacity,occupiedflag) VALUES (\'"+location+"\', "+capacity+", false);");
	pool.connect(function(err,client,done){
		if (err){
			return res.send(err);
		}
		else {
			client.query("INSERT INTO room(location,capacity,occupiedflag) VALUES (\'"+location+"\', "+capacity+", false);", [], function(err, result){
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
//For Modify Room
app.put('/api/modifyRoom/:id', function(req,res){
	//console.log(req.body);
	var rid = req.params.id;
	var location = req.body.location;
	var capacity = req.body.capacity;
	console.log("Update Room set (location=\'"+location+"\', capacity="+capacity+") WHERE rid="+rid+";");
	pool.connect(function(err,client,done){
		if (err){
			return res.send(err);
		}
		else {
			//var values = sprintf("'%s', '%s', '%s', ",[pssn,pname,gender]);
			client.query("Update Room set location=\'"+location+"\', capacity="+capacity+" WHERE rid="+rid+";", [], function(err, result){
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
//For Add Department
app.post('/api/addDepartment', function(req,res){
	var d_name = req.body.d_name;
	
	pool.connect(function(err,client,done){
		if (err){
			return res.send(err);
		}
		else {
			//var values = sprintf("'%s', '%s', '%s', ",[essn,name,job_title]);
			client.query("INSERT INTO Department(d_name) VALUES (\'"+d_name+"\');", [], function(err, result){
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
//For Modify Department
app.put('/api/modifyDepartment/:id', function(req,res){
	//console.log(req.body);
	var did = req.params.id;
	var d_name = req.body.d_name;
	
	pool.connect(function(err,client,done){
		if (err){
			return res.send(err);
		}
		else {
			//var values = sprintf("'%s', '%s', '%s', ",[pssn,pname,gender]);
			client.query("Update Department set d_name=\'"+d_name+"\' WHERE did="+did+";", [], function(err, result){
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
//For Insert Report
app.post('/api/addReport', function(req,res){
	var docid = req.body.docid;
	var pid = req.body.pid;
	var diagnosis = req.body.diagnosis;
	var detail = req.body.detail;
	var remark = req.body.remark;
	var record_date = req.body.record_date;
	pool.connect(function(err,client,done){
		if (err){
			return res.send(err);
		}
		else {
			var values = sprintf("'%s', '%s', '%s', ",[diagnosis,detail,remark]);
			client.query("INSERT INTO Report(docid,pid,diagnosis,detail,remark,record_date) VALUES ("+docid+","+pid+","+values+"DATE\'"+record_date+"\');", [], function(err, result){
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
//For Modify Report
app.put('/api/modifyReport/:id', function(req,res){
	//console.log(req.body);
	var rid = req.params.id;
	var diagnosis = req.body.diagnosis;
	var detail = req.body.detail;
	var remark = req.body.remark;
	var record_date = req.body.record_date;
	pool.connect(function(err,client,done){
		if (err){
			return res.send(err);
		}
		else {
			//var values = sprintf("'%s', '%s', '%s', ",[diagnosis,detail,remark]);
			client.query("Update report set diagnosis=\'"+diagnosis+"\', detail=\'"+detail+"\', remark=\'"+remark+"\' WHERE record_date=DATE\'"+record_date+"\';", [], function(err, result){
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
app.put('/api/modifyEmployee/:id', function(req,res){
	//console.log(req.body);
	var eid = req.params.id;
	var essn = req.body.essn;
	//console.log(pssn);
	var name = req.body.name;
	var gender = req.body.gender;
	var age = req.body.age;
	var salary = req.body.salary;
	var job_title = req.body.job_title;
	pool.connect(function(err,client,done){
		if (err){
			return res.send(err);
		}
		else {
			//var values = sprintf("'%s', '%s', '%s', ",[pssn,pname,gender]);
			client.query("Update Employee set ESSN=\'"+essn+"\', Name=\'"+name+"\', Gender=\'"+gender+"\', Age="+age+", salary=\'"+salary+"\',job_title=\'"+job_title+"\' WHERE eid="+eid+";", [], function(err, result){
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
//For Delete Employee
app.delete('/api/deleteEmployee/:id', function(req,res){
	//console.log(req.body);
	var eid = req.params.id;
	pool.connect(function(err, client, done) {
    // Handle connection errors
	    if(err) {
	      done();
	      console.log(err);
	      return res.status(500).json({success: false, data: err});
	    }
	    // SQL Query > Delete Data
	    client.query('DELETE FROM Employee WHERE eid=($1)', [eid], function(err, result){
			done();
			if (err){
				//res.json(values+''+age);
				return res.send(err);
			}
			res.send({status: 'Delete Success'});
		});
	   
	 });
})
//For Delete Department by ID
app.delete('/api/deleteDepartment/:id', function(req,res){
	//console.log(req.body);
	var did = req.params.id;
	pool.connect(function(err, client, done) {
    // Handle connection errors
	    if(err) {
	      done();
	      console.log(err);
	      return res.status(500).json({success: false, data: err});
	    }
	    // SQL Query > Delete Data
	    client.query('DELETE FROM Department WHERE did=($1)', [did], function(err, result){
			done();
			if (err){
				//res.json(values+''+age);
				return res.send(err);
			}
			res.send({status: 'Delete Success'});
		});
	   
	 });
})
//For Delete Room by ID
app.delete('/api/deleteRoom/:id', function(req,res){
	//console.log(req.body);
	var rid = req.params.id;
	pool.connect(function(err, client, done) {
    // Handle connection errors
	    if(err) {
	      done();
	      console.log(err);
	      return res.status(500).json({success: false, data: err});
	    }
	    // SQL Query > Delete Data
	    client.query('DELETE FROM Room WHERE rid=($1)', [rid], function(err, result){
			done();
			if (err){
				//res.json(values+''+age);
				return res.send(err);
			}
			res.send({status: 'Delete Success'});
		});
	   
	 });
})
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
//Patient in Room by Room ID
app.get('/api/patientInRoom/:id',function(req,res,next){
	var rid = req.params.id;
	console.log("Select p.name from patient p join stay s on p.pid = s.pid join room r on s.rid = r.rid where r.rid="+rid+";");
	pool.connect(function(err,client,done){
		if (err){
			return res.status(400).send(err);
		}
		client.query("Select p.name from patient p join stay s on p.pid = s.pid join room r on s.rid = r.rid where r.rid="+rid+";", [], function(err, result) {
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
//Room by Department ID
app.get('/api/room/:id',function(req,res,next){
	var did = req.params.id;
	pool.connect(function(err,client,done){
		if (err){
			return res.status(400).send(err);
		}
		client.query("Select r.rid, r.location, r.occupiedflag, d.d_name, r.capacity from room r join hasroom on r.rid=hasroom.rid join department d on hasroom.did=d.did where d.did="+did+";", [], function(err, result) {
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
//Doctor by ID
app.get('/api/doctor/:id',function(req,res,next){
	var eid = req.params.id;
	pool.connect(function(err,client,done){
		if (err){
			return res.status(400).send(err);
		}
		client.query('Select E.Name,D.Specialization from Employee E join Doctor D ON E.EID = D.adminID where D.eid='+eid+' ;', [], function(err, result) {
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
//Admin by ID
app.get('/api/administrator/:id',function(req,res,next){
	var eid = req.params.id;
	pool.connect(function(err,client,done){
		if (err){
			return res.status(400).send(err);
		}
		client.query('Select A.level from Administrator A where A.eid='+eid+' ;', [], function(err, result) {
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
		client.query("Select r.rid, r.location, r.occupiedflag, d.d_name, r.capacity from room r left join hasroom on r.rid=hasroom.rid left join department d on hasroom.did=d.did;", [], function(err, result) {
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