################################################################
# Table Test
-- file created: Apr. 21st
-- 

-- test Table Employee;
-- first check and remember what's in TABLE Employee now
SELECT * FROM Employee;
-- one Positive test case;
INSERT INTO Employee(ESSN,Name,Job_Title,Salary, Gender, Age) VALUES ('000000000','Steve Smith','Doctor',120000, 'F', 45);
-- expect positive row appears with EID = 12
SELECT * FROM Employee WHERE Employee.EID = 12;
-- negative case for wrong ESSN, expect error
INSERT INTO Employee(ESSN,Name,Job_Title,Salary, Gender, Age) VALUES ('00000000','Steve Smith','Doctor',120000, 'F', 45);
-- negative case for already existing ESSN, expect error
INSERT INTO Employee(ESSN,Name,Job_Title,Salary, Gender, Age) VALUES ('000000000','Steve Smith','Doctor',120000, 'F', 45);
-- negative case for already existing EID, expect error
INSERT INTO Employee(ESSN,EID,Name,Job_Title,Salary, Gender, Age) VALUES ('000000001',12,'Steve Smith','Doctor',120000, 'F', 45);
-- negative case for null Name, expect error
INSERT INTO Employee(ESSN,Name,Job_Title,Salary, Gender, Age) VALUES ('000000001',NULL,'Doctor',120000, 'F', 45);
-- negative case for null Job_Title, expect error
INSERT INTO Employee(ESSN,Name,Job_Title,Salary, Gender, Age) VALUES ('000000001','Steve Smith',NULL,120000, 'F', 45);
-- negative case for null Salary, expect error
INSERT INTO Employee(ESSN,Name,Job_Title,Salary, Gender, Age) VALUES ('000000001','Steve Smith','Doctor',NULL, 'F', 45);
-- negative case for Salary < 0, expect error
INSERT INTO Employee(ESSN,Name,Job_Title,Salary, Gender, Age) VALUES ('000000001','Steve Smith','Doctor',-1, 'F', 45);
-- negative case for null Gender, expect error
INSERT INTO Employee(ESSN,Name,Job_Title,Salary, Gender, Age) VALUES ('000000001','Steve Smith','Doctor',120000, NULL, 45);
-- negative case for wrong Gender, expect error
INSERT INTO Employee(ESSN,Name,Job_Title,Salary, Gender, Age) VALUES ('000000001','Steve Smith','Doctor',120000, 'f', 45);
-- negative case for null Age, expect error
INSERT INTO Employee(ESSN,Name,Job_Title,Salary, Gender, Age) VALUES ('000000001','Steve Smith','Doctor',120000, 'F', NULL);
-- negative case for Age < 0, expect error
INSERT INTO Employee(ESSN,Name,Job_Title,Salary, Gender, Age) VALUES ('000000001','Steve Smith','Doctor',120000, 'F', -1);
-- finish test, now remove the rows used for testing
DELETE FROM Employee where Employee.ESSN = '000000000';
-- check if everything goes back to the original status
SELECT * FROM Employee;



-- test TABLE Administrator
-- first check and see what's in TABLE Administrator now
SELECT * FROM Administrator;
-- one positive test case
INSERT INTO Administrator(EID,Level) VALUES (0001, 'High');
-- expect positive result, a row with EID = 1
SELECT * FROM Administrator where Administrator.EID = 1;
-- negative case for not existing Employee, expect error
INSERT INTO Administrator(EID,Level) VALUES (0012, 'High');
-- negative case for already existing Administrator, expect error
INSERT INTO Administrator(EID,Level) VALUES (0001, 'High');
-- negative case for EID being null, expect error
INSERT INTO Administrator(EID,Level) VALUES (NULL, 'High');
-- negative case for illegal Level, expect error
INSERT INTO Administrator(EID,Level) VALUES (0002, 'HIGH');
-- finish test, now remove the rows used for testing
DELETE FROM Administrator WHERE Administrator.EID = 1;
-- check if everything goes back to the original status
SELECT * FROM Administrator;



-- test TABLE Doctor
-- first check and see what's in TABLE Doctor now
SELECT * FROM Doctor;
-- one positive test case
INSERT INTO Doctor (EID,Specialization, AdminID) VALUES (0003, 'Cardiologists', 0002);
-- expect positive result, a row with EID = 3
SELECT * FROM Doctor WHERE EID = 3;
-- negative case for not existing Employee, expect error
INSERT INTO Doctor (EID,Specialization, AdminID) VALUES (0012, 'Cardiologists', 0002);
-- negative case for already existing Doctor, expect error
INSERT INTO Doctor (EID,Specialization, AdminID) VALUES (0003, 'Cardiologists', 0006);
-- negative case for EID being null, expect error
INSERT INTO Doctor (EID,Specialization, AdminID) VALUES (NULL, 'Cardiologists', 0002);
-- negative case for AdminID being NULL, expect error
INSERT INTO Doctor (EID,Specialization, AdminID) VALUES (0004, 'Cardiologists', NULL);
-- negative case for not existing administrator, expect error
INSERT INTO Doctor (EID,Specialization, AdminID) VALUES (0004, 'Cardiologists', 0003);
-- negative case for EID = AdminID, expect error
INSERT INTO Doctor (EID,Specialization, AdminID) VALUES (0006, 'Cardiologists', 0006);
-- finish test, now remove the rows used for testing
DELETE FROM Doctor WHERE Doctor.EID = 3;
-- check if everything goes back to the original status
SELECT * FROM Doctor;



-- test TABLE Department
-- first check and see what's in TABLE Department now
SELECT * FROM Department;
-- one positive test case
INSERT INTO Department(D_name) VALUES ('Just testing');
-- expect positive result, a row with DID = 6
SELECT * FROM Department WHERE DID = 6;
-- negative case for already existing DID = 6, expect error
INSERT INTO Department(DID, D_name) VALUES (6, 'Just testing');
-- negative case for NULL D_name, expect error
INSERT INTO Department(D_name) VALUES (NULL);
-- finish test, now remove the rows used for testing
DELETE FROM Department WHERE DID = 6;
-- check if everything goes back to the original status
SELECT * FROM Department;



-- test table Work_In
-- first check and see what's in TABLE Work_In now
SELECT * FROM Work_In;
-- one positive test case
INSERT INTO Work_In(EID, DID) VALUES (0001,4);
-- expect positive result, a row with EID = 1 and DID = 4
SELECT * FROM Work_In WHERE EID = 1 AND DID = 4;
-- negative case for already existing (EID, DID), expect error
INSERT INTO Work_In(EID, DID) VALUES (1,4);
-- negative case for not existing EID, expect error
INSERT INTO Work_In(EID, DID) VALUES (12,4);
-- negative case for not existing DID, expect error
INSERT INTO Work_In(EID, DID) VALUES (1,6);
-- negative case for EID being NULL, expect error
INSERT INTO Work_In(EID, DID) VALUES (NULL,4);
-- negative case for DID being NULL, expect error
INSERT INTO Work_In(EID, DID) VALUES (1,NULL);
-- finish test, now remove the rows used for testing
DELETE FROM Work_In WHERE EID = 1 AND DID = 4;
-- check if everything goes back to the original status
SELECT * FROM Work_In;



-- test table ROOM
-- first check and see what's in table ROOM now
SELECT * FROM ROOM;
-- one positive test case
INSERT INTO Room(OccupiedFlag,Capacity,Location) VALUES (false,1, 'North');
-- expect positive result, a row with RID = 8
SELECT * FROM ROOM where RID = 8;
-- negative case for already existing RID, expect error
INSERT INTO Room(RID,OccupiedFlag,Capacity,Location) VALUES (8,false,1, 'North');
-- negative case for invalid OccupiedFlag, expect error
INSERT INTO Room(OccupiedFlag,Capacity,Location) VALUES (0,1, 'North');
-- negative case for OccupiedFlag being NULL
INSERT INTO Room(OccupiedFlag,Capacity,Location) VALUES (NULL,1, 'North');
-- negative case for Capacity being NULL
INSERT INTO Room(OccupiedFlag,Capacity,Location) VALUES (false,NULL, 'North');
-- negative case for Capacity being non positive
INSERT INTO Room(OccupiedFlag,Capacity,Location) VALUES (false,0, 'North');
-- finish test, now remove the rows used for testing
DELETE FROM ROOM WHERE RID = 8;
-- check if everything goes back to the original status
SELECT * FROM Work_In;



-- test TABLE hasRoom
-- first check and see what's in TABLE hasRoom now
SELECT * FROM hasRoom;
-- one positive test case
INSERT INTO hasRoom(RID, DID) VALUES (1,5);
-- expect positive result, a row with RID = 1 and DID = 5
SELECT * FROM hasRoom WHERE RID = 1 AND DID = 5;
-- negative case for (RID,DID) already existing
INSERT INTO hasRoom(RID, DID) VALUES (1,5);
-- negative case for RID being NULL
INSERT INTO hasRoom(RID, DID) VALUES (NULL,1);
-- negative case for DID being NULL
INSERT INTO hasRoom(RID, DID) VALUES (1,NULL);
-- negative case for not existing RID
INSERT INTO hasRoom(RID, DID) VALUES (100,5);
-- negative case for not existing DID
INSERT INTO hasRoom(RID, DID) VALUES (1,100);
-- finish test, now remove the rows used for testing
DELETE FROM hasRoom WHERE RID = 1 and DID = 5;
-- check if everything goes back to the original status
SELECT * FROM hasRoom;



-- test Table Patient
-- first check and remember what's in Table Patient now
SELECT * FROM Patient;
-- one postive case
INSERT INTO Patient(PSSN, Name, Gender, Age) VALUES ('221100006','Chang Romono','M',66);
-- Expect a postive row appear with PID = 6
SELECT * FROM Patient where PID = 6;

-- Negative case for length of PSSN not equal to 9, expect error
INSERT INTO Patient(PSSN, Name, Gender, Age) VALUES ('22110','Tawna Humbert','M',15);
-- Negative case for NULL name, expect error
INSERT INTO Patient(PSSN, Name, Gender, Age) VALUES ('221100001', NULL,'M',15);
-- Negative case for NULL gender, expect error
INSERT INTO Patient(PSSN, Name, Gender, Age) VALUES ('221100001','Tawna Humbert', NULL,15);
-- Negative case for gender different than M or F, expect error
INSERT INTO Patient(PSSN, Name, Gender, Age) VALUES ('221100001','Tawna Humbert','G',15);
-- Negative case for age less than 0
INSERT INTO Patient(PSSN, Name, Gender, Age) VALUES ('221100001','Tawna Humbert','M',-1);
-- Negative case for NULL age
INSERT INTO Patient(PSSN, Name, Gender, Age) VALUES ('221100001','Tawna Humbert','M', NULL);
-- Negative case for already existed PID
INSERT INTO Patient(PID, PSSN, Name, Gender, Age) VALUES (6,'221100001','Tawna Humbert','M',15);
-- Negative case for already existed PSSN
INSERT INTO Patient(PSSN, Name, Gender, Age) VALUES ('221100001','Tawna Humbert','M',15);

-- Finish test and remove row(s)
Delete FROM Patient where PID = 6;
-- Check to see whether it's restored to original version
SELECT * FROM Patient;



-- test Table Stay
-- first check and remember what's in Table Stay now
SELECT * FROM Stay;
-- one postive test case
INSERT INTO Stay(PID, RID) VALUES (4,4);
--Expect a postive row appear when with PID = 4 and RID = 4
SELECT * FROM Stay where (PID = 4 AND RID =4);

--Negative case for already existed PID, expect error
INSERT INTO Stay(PID, RID) VALUES (4,5);
--Negative case for already existed (PID,RID), expect error
INSERT INTO Stay(PID, RID) VALUES (4,4);
--negative case for non-existent PID, expect error
INSERT INTO Stay(PID, RID) VALUES (8,4);
--Negative case for non-existent RID, expect error
INSERT INTO Stay(PID, RID) VALUES (6,100);

-- Finish test and remove row(s)
Delete FROM Stay where (PID = 4 AND RID = 4);
-- Check to see restored to original
SELECT * FROM Stay;



-- test Table Report
-- first check and remember what's in TABLE Report now
SELECT * FROM Report;
-- one Positive test case
INSERT INTO Report (DocID, PID, Diagnosis, Detail, Remark, Record_date) VALUES (0011, 3, 'Eye Disease', 'Nearsighted', 'Mild', DATE '2009-12-15');
-- expect postive row appears with DocID = 11, PID =3, and Record Date = DATE '2009-12-15'
SELECT * FROM Report where (DocID = 11 AND PID =3 AND Record_date = DATE '2009-12-15');

--negative case for already existed DocID, PID, and Record_date. expect error.
INSERT INTO Report (DocID, PID, Diagnosis, Detail, Remark, Record_date) VALUES (0011, 3, 'Chest Disease', 'Open Sore', 'Mild', DATE '2009-12-15');
--negative case for non-existent DocID, expect error.
INSERT INTO Report (DocID, PID, Diagnosis, Detail, Remark, Record_date) VALUES (0015, 3, 'Eye Disease', 'Nearsighted', 'Mild', DATE '2009-12-15');
--negative case for non-existent PID, expect error.
INSERT INTO Report (DocID, PID, Diagnosis, Detail, Remark, Record_date) VALUES (0011, 7, 'Eye Disease', 'Nearsighted', 'Mild', DATE '2009-12-15');

-- Finish test and remove row(s)
Delete FROM Report where (DocID = 11 AND PID =3 AND Record_date = DATE '2009-12-15');
-- Check to see restored to original
SELECT * FROM Report;



-- test Table EquipmentType
-- first check and remember what's in TABLE EquipmentType now
SELECT * FROM EquipmentType;
-- one Positive test case
INSERT INTO EquipmentType(Model, Instruction, Function) VALUES ('MS06','Please refers to Manual1 Section 9.9','Mass Spectrometry');
-- expect postive row appears with EquiTypeID = 6
SELECT * FROM EquipmentType WHERE EquiTypeID = 6;

--negative test on already existed EquiTypeID
INSERT INTO EquipmentType(EquiTypeID, Model, Instruction, Function) VALUES (6, 'MS06','Please refers to Manual1 Section 9.9','Mass Spectrometry');

-- finish test and remove row(s)
DELETE FROM EquipmentType WHERE EquiTypeID = 6;
-- check to see whether it's restored to original
SELECT * FROM EquipmentType;



-- test Table Equipment
-- first check and remember what's in TABLE Equipment now
SELECT * FROM Equipment;
-- one Positive test case
INSERT INTO Equipment(InspecTime, PurchaseTime, RID, EquiTypeID) VALUES (DATE '2016-01-01', DATE '2009-01-01', 4, 3);
-- expect postive row appears with RID =7, EquiTypeID = 6, SerialNum = 6
SELECT * FROM Equipment WHERE SerialNum = 6;

-- negative case for NULL InspectTime, expect error
INSERT INTO Equipment(InspecTime, PurchaseTime, RID, EquiTypeID) VALUES (NULL, DATE '2009-01-01', 4, 3);
-- negative case for NULL PurchaseTime, expect error
INSERT INTO Equipment(InspecTime, PurchaseTime, RID, EquiTypeID) VALUES (DATE '2016-01-01', NULL, 4, 3);
-- negative case for InspecTime < PurchaseTime, expect error
INSERT INTO Equipment(InspecTime, PurchaseTime, RID, EquiTypeID) VALUES (DATE '2007-02-15', DATE '2008-02-15', 4, 3);
-- negative case for NULL RID, expect error
INSERT INTO Equipment(InspecTime, PurchaseTime, RID, EquiTypeID) VALUES (DATE '2016-01-01', DATE '2009-01-01', NULL, 3);
-- negative case for NULL EquiTypeID, expect error
INSERT INTO Equipment(InspecTime, PurchaseTime, RID, EquiTypeID) VALUES (DATE '2016-01-01', DATE '2009-01-01', 4, NULL);
-- negative case for already existed SerialNUm, expect error
INSERT INTO Equipment(SerialNum, InspecTime, PurchaseTime, RID, EquiTypeID) VALUES (6, DATE '2016-01-01', DATE '2009-01-01', 4, 3);
-- negative case for non-existent RID, expect error
INSERT INTO Equipment(InspecTime, PurchaseTime, RID, EquiTypeID) VALUES (DATE '2016-01-01', DATE '2009-01-01', 10, 3);
-- negative case for non-existent EquiTypeID, expect error
INSERT INTO Equipment(InspecTime, PurchaseTime, RID, EquiTypeID) VALUES (DATE '2016-01-01', DATE '2009-01-01', 4, 10);

-- finish test, remove row(s) for testing
DELETE FROM Equipment WHERE SerialNUm = 6;
-- Check to see if everything restored to original
SELECT * FROM Equipment;



-- test Table Admission
-- first check and remember what's in TABLE Admission now
SELECT * FROM Admission;
-- one Positive test case
INSERT INTO Admission (Enter_time, Leave_time, PaymentInfo, InsuranceCover, Detail, PID) VALUES (DATE '2016-02-10', DATE '2016-06-15', '24061', '20113', 'Athlete', 5);
-- expect positive row appears with AID = 6
SELECT * FROM Admission WHERE AID = 6;


-- negative case for NULL Enter_time , expect error
INSERT INTO Admission (Enter_time, Leave_time, PaymentInfo, InsuranceCover, Detail, PID) VALUES (NULL, DATE '2016-09-15', '24601', '20113', 'Athlete', 5);
-- negative case for NULL Leave_time , expect error
INSERT INTO Admission (Enter_time, Leave_time, PaymentInfo, InsuranceCover, Detail, PID) VALUES (DATE '2016-06-15', NULL, '24601', '20113', 'Athlete', 5);
-- negative case for Leave_time < Enter_time, expect error
INSERT INTO Admission (Enter_time, Leave_time, PaymentInfo, InsuranceCover, Detail, PID) VALUES (DATE '2016-06-15', DATE '2015-01-01', '24601', '20113', 'Athlete', 5);
-- negative case for PaymentInfo has more than 10 digits, expect error
INSERT INTO Admission (Enter_time, Leave_time, PaymentInfo, InsuranceCover, Detail, PID) VALUES (DATE '2016-06-15', DATE '2016-09-15', '2460111898989', '20113', 'Athlete', 5);
-- negative case for PaymentInfo less than 0, expect error
INSERT INTO Admission (Enter_time, Leave_time, PaymentInfo, InsuranceCover, Detail, PID) VALUES (DATE '2016-06-15', DATE '2016-09-15', -1, '20113', 'Athlete', 5);
-- negative case for NULL PaymentInfo, expect error
INSERT INTO Admission (Enter_time, Leave_time, PaymentInfo, InsuranceCover, Detail, PID) VALUES (DATE '2016-06-15', DATE '2016-09-15', NULL, '20113', 'Athlete', 5);
-- negative case for NULL PID, expect error
INSERT INTO Admission (Enter_time, Leave_time, PaymentInfo, InsuranceCover, Detail, PID) VALUES (DATE '2016-06-15', DATE '2016-09-15', '24601', '20113', 'Athlete', NULL);
-- negative case for already existed aID, expect error
INSERT INTO Admission (aID, Enter_time, Leave_time, PaymentInfo, InsuranceCover, Detail, PID) VALUES (6, DATE '2016-06-15', DATE '2016-09-15', '24601', '20113', 'Athlete', 5);
-- negative case for non-existent PID, expect error
INSERT INTO Admission (Enter_time, Leave_time, PaymentInfo, InsuranceCover, Detail, PID) VALUES (DATE '2016-02-10', DATE '2016-06-15', '24601', '20113', 'Athlete', 100);

-- finish test, remove the row(s) for testing
DELETE FROM Admission where aID = 6;
-- check if everything restored to original
SELECT * FROM Admission;


################################################################
# TRIGGER Test

-- Rovoke update on Table Stay test
-- Now check what is currently in Stay Table
SELECT * FROM Stay;
-- negative case when trying to update information in Stay Table
Update Stay SET RID = 4 WHERE PID =1;



-- test checkFlag Trigger/Function
-- Now check what is currently in the Stay and Room table
SELECT * FROM Stay;
SELECT * FROM Room;
SELECT * FROM Patient;
-- Positive case when trying to add patients to a not full room
INSERT INTO Stay(PID, RID) VALUES (4,4);
-- Check to see it's actually in the Stay table
SELECT * FROM Stay WHERE (PID = 4 AND RID = 4);
-- Negative case when trying to add more patients into full room, expect error and a message
INSERT INTO Stay(PID, RID) VALUES (5,3);
--Finish test, remove the row(s) for testing
DELETE FROM Stay WHERE (PID = 4 AND RID = 4);
--Check to see if it's restore to original
SELECT * FROM Stay;



-- test checkFlag2 Trigger/Function
-- Now check what is currently in the Room table
SELECT * FROM Room;
-- Positive case when trying to add a new room with occupied flag = false, expect a room with RID = 8
INSERT INTO Room(OccupiedFlag,Capacity,Location) VALUES (false,2, 'Upper South');
-- Check to make sure it's in the Room Table
SELECT * FROM Room WHERE RID = 8;
-- Negative case when trying to add a new room with occupied flag = true, expect error and a message
INSERT INTO Room(OccupiedFlag,Capacity,Location) VALUES (true,2, 'Upper South');
--Finish test, remove the row(s) for testing
DELETE FROM Room WHERE RID = 8; # can't do for now


-- Remmber to refresh the database for the next test


-- test RoomFull Trigger/Function
-- Now check what is currently in the Room and Stay Table
SELECT * FROM Stay;
SELECT * FROM Room;
-- Positive case when adding a patient to a room, but the room is not full after insertion. The flag should not be turned to true
INSERT INTO Stay(PID, RID) VALUES (4,7);
SELECT * FROM Stay WHERE PID = 4 AND RID = 7;
SELECT * FROM Room WHERE RID = 7;
-- Postive case when adding the last patient, but this time the room is full after insertion. The flag should be turned to true
INSERT INTO Stay(PID, RID) VALUES (5,7);
SELECT * FROM Stay WHERE PID = 5 AND RID = 7;
SELECT * FROM Room WHERE RID = 7;
-- Finish Test, remove row(s) for testing
Delete FROM stay WHERE PID = 4 AND RID = 7; # can't do for now
Delete FROM stay WHERE PID = 5 AND RID = 7; # can't do for now
--Check to see if it's restore to original
SELECT * FROM Stay;

-- Remmber to refresh the database for the next test

-- test not RoomFull Trigger/Function
-- Now check what is currently in the Room and Stay Table
SELECT * FROM Stay;
SELECT * FROM Room;
-- Add in a new tuple for testing purpose of the trigger/fucntion. As before, we expect the flag in that room to turn to true if full.
INSERT INTO Stay(PID, RID) VALUES (6,6);
SELECT * FROM Stay WHERE (PID = 6 AND RID = 6);
-- Now, our postive case when removing a patient in a full room
DELETE FROM STAY WHERE PID = 6 AND RID = 6; # can't do for now
-- After removing that person, make sure the patient is removed and the occupied flag in that room updated to false
SELECT * FROM Stay;
SELECT * FROM Room;




-- test illegalAdmission Trigger/Function
-- Now check what is currently in the Admission Table
SELECT * FROM Admission;
--Positive case. Scenario: when inserting a new admission record with an already existed PID in the Admission table, if the new enter time is greater than the old leave time, no error
INSERT INTO Admission (Enter_time, Leave_time, PaymentInfo, InsuranceCover, Detail, PID) VALUES (DATE '2014-07-15', DATE '2016-10-15','24601', '20113', 'Athlete', 5);
SELECT * FROM Admission WHERE aID = 6;
--Positive case. Scenario: when inserting a new admission record with an already existed PID in the Admission table, if the new enter time is equal to the old leave time, no error
INSERT INTO Admission (Enter_time, Leave_time, PaymentInfo, InsuranceCover, Detail, PID) VALUES (DATE '2016-10-15', DATE '2016-12-15','24601', '20113', 'Athlete', 5);
SELECT FROM Admission WHERE aID = 7;
-- Negative case. Scenraio: when inserting a new admission record with an already existed PID in the Admission table, if the new enter time is less than the latest leave time, expect error and a message.
INSERT INTO Admission (Enter_time, Leave_time, PaymentInfo, InsuranceCover, Detail, PID) VALUES (DATE '2014-05-15', DATE '2016-06-15','24601', '20113', 'Athlete', 5);
-- Finish test, remove row(s) for testing
Delete FROM Admission WHERE aID = 21;
Delete FROM Admission WHERE aID = 23;


--negative case when trying to update anything in the admission table
Update Admission SET Detail = 'Veteran' WHERE aID = 5;
