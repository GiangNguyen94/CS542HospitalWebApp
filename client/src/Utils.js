import React from "react";
import namor from "namor";
import "./index.css";

const range = len => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newPerson = () => {
  const genderChance = Math.random();
  return {
    PID: Math.floor(Math.random()*100),
    SSN: Math.floor(Math.random()*1000000),
    age: Math.floor(Math.random() * 30),
    name: namor.generate({ words: 1, numbers: 0 }),
    gender:
      genderChance > 0.5
        ? "M"
        : "F"
  };
};

const newAdmission = () => {
  return {
    AID: Math.floor(Math.random()*100),
    name: Math.floor(Math.random()*1000000),
    EnterTime: Math.floor(Math.random() * 30),
    LeaveTime: Math.floor(Math.random()* 30),
    PaymentInfo: Math.floor(Math.random()*1000000),
    InsuranceCover:Math.floor(Math.random()*1000000),
    Detail: namor.generate({words:3,numbers:5})
  };
};

const newReport = () => {
  return {
    PatientName: namor.generate({words:1,numbers:0}),
    DocName: namor.generate({words:1,numbers:0}),
    Diagnosis: namor.generate({words:3,numbers:0}),
    Remark: namor.generate({words:3,numbers:0}),
    Record_date:Math.floor(Math.random()*100),
    Detail: namor.generate({words:3,numbers:0})
  };
};

const newEmployee = () => {
  const genderChance = Math.random();
  return {
    EID: Math.floor(Math.random()*100),
    Name: namor.generate({words:1,numbers:0}),
    Gender:
      genderChance > 0.5
        ? "M"
        : "F",
    Age:Math.floor(Math.random()*30),
    SSN:Math.floor(Math.random()*100),
    Salary: Math.floor(Math.random()*300),
    Type: 
      genderChance > 0.66
        ? "Doctor"
        : genderChance > 0.33 ? "Administrator" : "Administrator, Doctor",
    JobTitle: namor.generate({words:1,numbers:0}),
    Detail: namor.generate({words:1,numbers:0})
  };
}

const newDepartment = () => {
  return {
    DID: Math.floor(Math.random()*100),
    DepName: namor.generate({words:1,numbers:0}),
  };
}

const newRoom = () => {
  const genderChance = Math.random();
  return {
    RID: Math.floor(Math.random()*100),
    Loca: namor.generate({words:1,numbers:0}),
    DepName: namor.generate({words:1,numbers:0}),
    Occupied:
      genderChance > 0.5
        ? "true"
        : "false",
  };
}

const newEquipment = () => {
  return {
    RID: Math.floor(Math.random()*100),
    SerialNum: Math.floor(Math.random()*100),
    PurchaseTime:Math.floor(Math.random()*30),
    LatestInspect:Math.floor(Math.random()*100)
  };
}

export function makeDataPerson(len = 50) {
  return range(len).map(d => {
    return {
      ...newPerson(),
      children: range(10).map(newPerson)
    };
  });
}

export function makeDataAdmission(len = 50) {
  return range(len).map(d => {
    return {
      ...newAdmission(),
      children: range(10).map(newAdmission)
    };
  });
}

export function makeDataReport(len = 50) {
  return range(len).map(d => {
    return {
      ...newReport(),
      children: range(10).map(newReport)
    };
  });
}

export function makeDataEmployee(len = 50) {
  return range(len).map(d => {
    return {
      ...newEmployee(),
      children: range(10).map(newEmployee)
    };
  });
}

export function makeDataDepartment(len = 50) {
  return range(len).map(d => {
    return {
      ...newDepartment(),
      children: range(10).map(newDepartment)
    };
  });
}

export function makeDataRoom(len = 50) {
  return range(len).map(d => {
    return {
      ...newRoom(),
      children: range(10).map(newRoom)
    };
  });
}

export function makeDataEquipment(len = 50) {
  return range(len).map(d => {
    return {
      ...newEquipment(),
      children: range(10).map(newEquipment)
    };
  });
}

export const Logo = () =>
  <div style={{ margin: '1rem auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center'}}>
    For more examples, visit {''}
  <br />
    <a href="https://github.com/react-tools/react-table" target="_blank">
      <img
        src="https://github.com/react-tools/media/raw/master/logo-react-table.png"
        style={{ width: `150px`, margin: ".5em auto .3em" }}
      />
    </a>
  </div>;

export const Tips = () =>
  <div style={{ textAlign: "center" }}>
    <em>Tip: Hold shift when sorting to multi-sort!</em>
  </div>;
