################################################################
# TABLE CREATION

/*
Employee Table note:
    - Salary: earning per year in USD

*/
CREATE TABLE Employee (
ESSN CHAR(9) NOT NULL CHECK (char_length(ESSN) = 9),
EID Serial,
Name CHAR(100) NOT NULL,
Job_Title CHAR(100) NOT NULL,
Salary Numeric(10,2) NOT NULL CHECK (Salary >= 0),
Gender CHAR(1) NOT NULL CHECK(Gender = 'M' OR Gender = 'F'),
Age INTEGER NOT NULL CHECK(Age >= 0),
PRIMARY KEY(EID),
UNIQUE (ESSN));


/*
Administrator Table note:

*/
CREATE TABLE Administrator (
EID INTEGER,
Level CHAR(10) CHECK (Level = 'High' OR Level = 'Medium' OR Level = 'Low'),
PRIMARY KEY (EID),
FOREIGN KEY (EID) REFERENCES Employee (EID));


/*
Doctor Table note:
    - A Doctor cannot be his or her own administrator/manager

*/
CREATE TABLE Doctor (
EID INTEGER,
Specialization CHAR(100),
AdminID INTEGER NOT NULL,
CHECK(EID != AdminID),
PRIMARY KEY (EID),
FOREIGN KEY (EID) REFERENCES Employee (EID),
FOREIGN KEY (AdminID) REFERENCES Administrator(EID));


/*
Department Table note:

*/
CREATE TABLE Department (
DID Serial,
D_name CHAR(100) NOT NULL,
PRIMARY KEY (DID));


/*
Work_In Table note:

*/
CREATE TABLE Work_In (
EID INTEGER,
DID INTEGER,
PRIMARY KEY (EID, DID),
FOREIGN KEY (EID) REFERENCES  Employee (EID),
FOREIGN KEY (DID) REFERENCES  Department(DID));


/*
Room Table note:

*/
CREATE TABLE Room (
RID Serial,
OccupiedFlag Boolean NOT NULL,
Capacity INTEGER NOT NULL CHECK (Capacity > 0),
Location CHAR(50),
PRIMARY KEY (RID));


/*
hasRoom Table note:

*/
CREATE TABLE hasRoom (
RID INTEGER,
DID INTEGER,
PRIMARY KEY (RID,DID),
FOREIGN KEY (RID) REFERENCES Room(RID),
FOREIGN KEY (DID) REFERENCES Department(DID));


/*
Patient Table note:
    - Gender: 'M' for Male and 'F' for Female
    -
*/
CREATE TABLE Patient (
PID Serial,
PSSN CHAR(9) CHECK (char_length(PSSN) = 9),
Name CHAR(100) NOT NULL,
Gender CHAR(1) NOT NULL CHECK(Gender = 'M' OR Gender = 'F'),
Age INTEGER NOT NULL CHECK(Age >= 0),
PRIMARY KEY (PID),
UNIQUE (PSSN));


/*
Stay Table note:

*/
CREATE TABLE Stay (
PID INTEGER,
RID INTEGER,
UNIQUE(PID),
PRIMARY KEY (PID, RID),
FOREIGN KEY (PID) REFERENCES Patient (PID),
FOREIGN KEY (RID) REFERENCES Room (RID));


/*
Report Table note:
    - Diagnosis: the branch of the disease
    - Detail: the actual disease
    - Remark: stage of the disease (good, bad, emergency,...)

*/
CREATE TABLE Report (
DocID INTEGER,
PID INTEGER,
Diagnosis CHAR(200),
Detail CHAR(350),
Remark CHAR(200),
Record_date DATE,
PRIMARY KEY (DocID, PID, Record_date),
FOREIGN KEY (DocID) REFERENCES Doctor (EID),
FOREIGN KEY (PID) REFERENCES Patient (PID));


/*
EquipmentType Table note:
    - The equipment type/model that the hospital has

*/
CREATE TABLE EquipmentType (
EquiTypeID Serial,
Model CHAR(20),
Instruction CHAR(200),
Function CHAR(100),
PRIMARY KEY (EquiTypeID));


/*
Equipment Table note:
    - The actual units under each equipment type/model

*/
CREATE TABLE Equipment(
SerialNum Serial,
InspecTime DATE NOT NULL,
PurchaseTime DATE NOT NULL,
CHECK (InspecTime >= PurchaseTime),
RID INTEGER NOT NULL,
EquiTypeID INTEGER NOT NULL,
PRIMARY KEY (SerialNum),
FOREIGN KEY (RID) REFERENCES Room (RID),
FOREIGN KEY (EquiTypeID) REFERENCES EquipmentType (EquiTypeID));


/*
Admission Table note:
    - The admission info of a patient at a certain period
    - PaymentInfo: The amount of USD paid by patient
    - InsuranceCover: The amount of USD covered by insurance
    - Detail: The type of insurance plan

*/
CREATE TABLE Admission(
aID Serial,
Enter_time DATE NOT NULL,
Leave_time DATE NOT NULL,
CHECK (Leave_time >= Enter_time),
PaymentInfo Numeric(10,2) CHECK (PaymentInfo >= 0) NOT NULL,
InsuranceCover Numeric(10,2) CHECK (InsuranceCover >= 0) NOT NULL,
Detail CHAR(100),
PID INTEGER NOT NULL,
PRIMARY KEY(aID),
FOREIGN KEY (PID) REFERENCES Patient (PID));


################################################################
# TRIGGER

-- Restrict on View for table stay
REVOKE update ON table stay from cvbkopwrapmbzf;


/*
checkFlag() function note:
    --> check whether a room is full when trying to add more patient into Stay table
        Input: none
        Output: an exception saying the room is full

*/
CREATE FUNCTION checkFlag() RETURNS TRIGGER AS '
BEGIN
IF (NEW.RID IN (SELECT DISTINCT R.RID
               FROM ROOM R
               WHERE R.OccupiedFlag = true))
THEN
RAISE EXCEPTION USING ERRCODE = ''25101'', MESSAGE = ''Room fully Occupied. Cannot add more patients!'';
ELSE RETURN NEW;
END IF;
END;
'
LANGUAGE plpgsql;
-- Trigger announcing the room is full when trying to add more patient
CREATE TRIGGER checkFlagTrigger
BEFORE INSERT ON Stay
FOR EACH ROW
EXECUTE PROCEDURE checkFlag();



/*
checkFlag2() function Note:
    --> check whether the occupied flag for a new insertion of room is true
        Input: none
        Output: an exception saying that occupied flag for a new room should be false

*/
CREATE FUNCTION checkFlag2() RETURNS TRIGGER AS '
BEGIN
IF (NEW.OccupiedFlag = true)
THEN
RAISE EXCEPTION  USING ERRCODE = ''25102'', MESSAGE = ''Occupied Flag should be false for insertion!!'';
ELSE RETURN NEW;
END IF;
END;
'
LANGUAGE plpgsql;
-- Trigger announcing that occupied flag for a new room should be false
CREATE TRIGGER checkFlagTrigger2
BEFORE INSERT ON Room
FOR EACH ROW
EXECUTE PROCEDURE checkFlag2();


/*
RoomFull() function Note:
    --> update the flag of a room to true after filling the capacity of the room
        Input: none
        Output: none

*/
CREATE FUNCTION RoomFull() RETURNS TRIGGER AS '
BEGIN
IF ((SELECT R.Capacity
    FROM ROOM R
    WHERE R.RID = NEW.RID) <= (SELECT COUNT(S.PID)
                             FROM STAY S
                             WHERE S.RID = NEW.RID))
THEN
UPDATE ROOM SET OccupiedFlag = true WHERE RID = NEW.RID;
END IF;
RETURN NEW;
END
'
LANGUAGE plpgsql;
-- Trigger to update the flag of a room to true after filling the capacity of the room
CREATE TRIGGER checkRoomFull
AFTER INSERT ON Stay
FOR EACH ROW
EXECUTE PROCEDURE RoomFull();



/*
notRoomFull() function Note:
    --> update the flag of a room to false after deleting one patient in a full room
        Input: none
        Output: none

*/
CREATE FUNCTION notRoomFull() RETURNS TRIGGER AS '
BEGIN
IF ((SELECT R.Capacity
    FROM ROOM R
    WHERE R.RID = OLD.RID) > (SELECT COUNT(S.PID)
                             FROM STAY S
                             WHERE S.RID = OLD.RID))
THEN
UPDATE ROOM SET OccupiedFlag = false WHERE RID = OLD.RID;
END IF;
RETURN OLD;
END
'
LANGUAGE plpgsql;
-- Trigger to update the flag to false after deleting one patient in a full room.
CREATE TRIGGER uncheckRoomFull
AFTER DELETE ON Stay
FOR EACH ROW
EXECUTE PROCEDURE notRoomFull();



/*
illegalAdmission() function Note:
    --> check whether the enter time of a new
        Input:
        Output:

*/
CREATE FUNCTION illegalAdmission() RETURNS TRIGGER AS '
BEGIN
IF ((SELECT MAX(A.Leave_time)
    From Admission A
    Where A.PID = NEW.PID) > NEW.Enter_time)
THEN
RAISE EXCEPTION USING ERRCODE = ''25103'', MESSAGE = ''The is an old admission!! Please input a different enter time'';
ELSE RETURN NEW;
END IF;
END;
'
LANGUAGE plpgsql;
-- Trigger announcing when inserting a new admission record with the PID already existed in Admission table,  the new enter time has to be greater than the latest leave time
CREATE TRIGGER checkIllegalAdmission
BEFORE INSERT ON Admission
FOR EACH ROW
EXECUTE PROCEDURE illegalAdmission();

-- Restrict update on admission table.
REVOKE update ON table Admission from cvbkopwrapmbzf;



################################################################
# INSERTION

-- Employee Table
INSERT INTO Employee(ESSN,Name,Job_Title,Salary, Gender, Age) VALUES ('112233000','Steve Smith','Doctor',120000, 'F', 45);
INSERT INTO Employee(ESSN,Name,Job_Title,Salary, Gender, Age) VALUES ('112234001','Raymon Theroux','Administrator',100000, 'M', 30);
INSERT INTO Employee(ESSN,Name,Job_Title,Salary, Gender, Age) VALUES ('112235002','Shirlene Orear','Microbiologist',87000, 'F', 45);
INSERT INTO Employee(ESSN,Name,Job_Title,Salary, Gender, Age) VALUES ('112236003','Deeanna Black','Clerks',55000, 'M', 35);
INSERT INTO Employee(ESSN,Name,Job_Title,Salary, Gender, Age) VALUES ('112237004','Zada Agosta','Laboratory Technician',60000, 'M', 25);
INSERT INTO Employee(ESSN,Name,Job_Title,Salary, Gender, Age) VALUES ('112238005','Marlen Mclees','HR Manager',98000, 'M', 30);
INSERT INTO Employee(ESSN,Name,Job_Title,Salary, Gender, Age) VALUES ('112239006','Gearldine Hausler','Gardener',30000, 'F', 37);
INSERT INTO Employee(ESSN,Name,Job_Title,Salary, Gender, Age) VALUES ('112230007','Gerard Fenton','Emergency Dispatcher',35000, 'F', 39);
INSERT INTO Employee(ESSN,Name,Job_Title,Salary, Gender, Age) VALUES ('112231008','Lenita Buss','Counselor',40000, 'F', 29);
INSERT INTO Employee(ESSN,Name,Job_Title,Salary, Gender, Age) VALUES ('112232009','Yael Mizrahi','Doctor',120000, 'M', 43);
INSERT INTO Employee(ESSN,Name,Job_Title,Salary, Gender, Age) VALUES ('112289010','Floyd Guillotte','Doctor',150000, 'F', 29);

-- Administrator Table
INSERT INTO Administrator(EID,Level) VALUES (0002, 'High');
INSERT INTO Administrator(EID,Level) VALUES (0006, 'Medium');

-- Doctor Table
INSERT INTO Doctor (EID,Specialization, AdminID) VALUES (0001, 'Cardiologists', 0002);
INSERT INTO Doctor (EID,Specialization, AdminID) VALUES (0010, 'Gynaecologists', 0006);
INSERT INTO Doctor (EID,Specialization, AdminID) VALUES (0011, 'Obstetricians', 0002);

-- Department Table
INSERT INTO Department(D_name) VALUES ('Cardiology and Cardiac Surgery');
INSERT INTO Department(D_name) VALUES ('Gynecology');
INSERT INTO Department(D_name) VALUES ('Laboratory');
INSERT INTO Department(D_name) VALUES ('Admitting and Registration');
INSERT INTO Department(D_name) VALUES ('Recovery/PACU');

-- Work_in Table
INSERT INTO Work_In(EID, DID) VALUES (0001,5);
INSERT INTO Work_In(EID, DID) VALUES (0010,4);
INSERT INTO Work_In(EID, DID) VALUES (0003,3);
INSERT INTO Work_In(EID, DID) VALUES (0004,1);

-- Room Table
INSERT INTO Room(OccupiedFlag,Capacity,Location) VALUES (false,1, 'North');
INSERT INTO Room(OccupiedFlag,Capacity,Location) VALUES (false,1, 'South');
INSERT INTO Room(OccupiedFlag,Capacity,Location) VALUES (false,1, 'East');
INSERT INTO Room(OccupiedFlag,Capacity,Location) VALUES (false,1, 'West');
INSERT INTO Room(OccupiedFlag,Capacity,Location) VALUES (false,1, 'Upper East');
INSERT INTO Room(OccupiedFlag,Capacity,Location) VALUES (false,1, 'Lower South');
INSERT INTO Room(OccupiedFlag,Capacity,Location) VALUES (false,2, 'South West');

-- hasRoom Table
INSERT INTO hasRoom(RID, DID) VALUES (1,1);
INSERT INTO hasRoom(RID, DID) VALUES (1,2);
INSERT INTO hasRoom(RID, DID) VALUES (3,4);
INSERT INTO hasRoom(RID, DID) VALUES (6,5);
INSERT INTO hasRoom(RID, DID) VALUES (4,3);
INSERT INTO hasRoom(RID, DID) VALUES (4,1);

-- Patient Table
INSERT INTO Patient(PSSN, Name, Gender, Age) VALUES ('221100001','Tawna Humbert','M',15);
INSERT INTO Patient(PSSN, Name, Gender, Age) VALUES ('221110002','Dora Mazzoni','F',34);
INSERT INTO Patient(PSSN, Name, Gender, Age) VALUES ('221155003','Mariel Harjo','M',26);
INSERT INTO Patient(PSSN, Name, Gender, Age) VALUES ('221189004','Ying Kester','M',17);
INSERT INTO Patient(PSSN, Name, Gender, Age) VALUES ('221109005','Corrinne Arend','M',78);

-- Stay Table
INSERT INTO Stay(PID, RID) VALUES (1,1);
INSERT INTO Stay(PID, RID) VALUES (2,2);
INSERT INTO Stay(PID, RID) VALUES (3,3);

-- Report Table
INSERT INTO Report (DocID, PID, Diagnosis, Detail, Remark, Record_date) VALUES (0001, 1, 'Heart Disease', 'Heart failure', 'Emergency Situation', DATE '2009-12-15');
INSERT INTO Report (DocID, PID, Diagnosis, Detail, Remark, Record_date) VALUES (0011, 5, 'Lung Disease', 'Pandemic Flu', 'Emergency Situation', DATE '2009-07-15');
INSERT INTO Report (DocID, PID, Diagnosis, Detail, Remark, Record_date) VALUES (0010, 4, 'Pregnancy', 'Anemia', 'Low Number of Healthy Red Blood Cell', DATE '2017-03-07');

-- EquipmentType Table
INSERT INTO EquipmentType(Model, Instruction, Function) VALUES ('D01','Please refers to Manual1 Section 3.1','Diagnostic');
INSERT INTO EquipmentType(Model, Instruction, Function) VALUES ('DO2','Please refers to Manual1 Section 4.5','Diagnostic');
INSERT INTO EquipmentType(Model, Instruction, Function) VALUES ('T01','Please refers to Manual1 Section 6.5','Treatment');
INSERT INTO EquipmentType(Model, Instruction, Function) VALUES ('T03','Please refers to Manual1 Section 3.7','Treatment');
INSERT INTO EquipmentType(Model, Instruction, Function) VALUES ('LS06','Please refers to Manual1 Section 9.5','Life Support');

-- Equipment Table
INSERT INTO Equipment(InspecTime, PurchaseTime, RID, EquiTypeID) VALUES (DATE '2011-01-01', DATE '2002-01-01', 1, 5);
INSERT INTO Equipment(InspecTime, PurchaseTime, RID, EquiTypeID) VALUES (DATE '2012-01-01', DATE '2009-01-01', 1, 4);
INSERT INTO Equipment(InspecTime, PurchaseTime, RID, EquiTypeID) VALUES (DATE '2016-03-19', DATE '2010-05-07', 2, 3);
INSERT INTO Equipment(InspecTime, PurchaseTime, RID, EquiTypeID) VALUES (DATE '2015-03-06', DATE '2014-05-06', 4, 4);
INSERT INTO Equipment(InspecTime, PurchaseTime, RID, EquiTypeID) VALUES (DATE '2013-05-14', DATE '2002-01-01', 5, 2);

-- Admission Table
INSERT INTO Admission (Enter_time, Leave_time, PaymentInfo, InsuranceCover, Detail, PID) VALUES (DATE '2014-05-20', DATE '2014-06-20', '34426', '3100', 'All Healthcare Plan expired', 1);
INSERT INTO Admission (Enter_time, Leave_time, PaymentInfo, InsuranceCover, Detail, PID) VALUES (DATE '2014-01-20', DATE '2014-12-20', '100678', '91509', 'Veteran', 2);
INSERT INTO Admission (Enter_time, Leave_time, PaymentInfo, InsuranceCover, Detail, PID) VALUES (DATE '2014-03-20', DATE '2014-09-17', '87006', '50300', 'HDHP Plan', 3);
INSERT INTO Admission (Enter_time, Leave_time, PaymentInfo, InsuranceCover, Detail, PID) VALUES (DATE '2015-01-20', DATE '2015-01-29', '3506', '3407', null, 4);
INSERT INTO Admission (Enter_time, Leave_time, PaymentInfo, InsuranceCover, Detail, PID) VALUES (DATE '2014-02-10', DATE '2014-06-15', '24601', '20113', 'Athlete', 5);

################################################################
# Random Useful Scripts

DROP SCHEMA public CASCADE;
CREATE SCHEMA public;

Delete From Report;
Delete From Doctor;
Delete From Administrator;
Delete From Admission;
Delete From Employee;
Delete From hasRoom;
Delete From Department;
Delete From Work_In;
Delete From Stay;
Delete From Room;
Delete From Patient;
Delete From Equipment;
Delete From EquipmentType;

################################################################
# UI Querry

-- Modify Admission Info (0041)
UPDATE Admission SET (PID = '', Enter_time = '', Leave_time = '', PaymentInfo = , InsuranceCover = , Detail = '') WHERE (aID = '');

-- Modify Report Info (0051)
UPDATE Report SET (Diagnosis = '', Remark = '', Detail = '') WHERE (DocID = '' AND PID = '' AND Record_date = DATE '');

-- Modify Employee Management (0061)
UPDATE Employee SET (Name = '', Gender = '', Age = , ESSN = '', Salary = , Job_Title = '') WHERE (EID = '')

-- Modify Department Info (0071)
UPDATE Department (SET D_name = '') WHERE (DID = '');

-- Modify Room Info (0081)
UPDATE Room SET (Location = '', Capacity = '', OccupiedFlag = , ) WHERE (RID = '')

-- Modify Equipment Info (0091)
UPDATE Equipment SET (Model = '', Instruction = '', InspecTime = '', PurchaseTime = '' ) WHERE (SerialNum = '')
################################################################



# Seperate SQL file for testing --> report about the test case
    # 1) Positive Test
    # 2) Mess-up Test

# Documentation Notes: justify why our implementation is better
    # 1) Why ID instead of SSN for Employee, Patient....etc? --> real life situation where you give ID
    # 2) Use Serial for IDs for auto-incrementing purpose
    # 3) Report Table: only one report between doc and patient in one day --> something as issue/weakness




