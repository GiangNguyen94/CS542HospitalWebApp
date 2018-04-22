import React from 'react';

import { ButtonToolbar, Button,Breadcrumb,Jumbotron,ButtonGroup} from 'react-bootstrap';
import { Form, FormGroup, FormControl, Nav, ControlLabel, HelpBlock} from 'react-bootstrap';

import AdminLanding from './AdminLanding';
import DoctorLanding from './DoctorLanding';
import ModifyPatient from './ModifyPatient';

export default class Landing extends React.Component
{
  /**
  * Constructor
  *
  * @param props
  */
  constructor(props, context){
    super(props, context);


    // save the users in the state
    this.state = {
      menuCon: 0,

    };

    this.handleClick = this.handleClick.bind(this);
    this.testGet = this.testGet.bind(this);
    this.testPost = this.testPost.bind(this);
  }

  handleClick(num){

    this.setState({ menuCon: num });

  }

  //API calls
  //POST
  testPost(event){
    event.preventDefault();

    var request = new Request("/api/addPatient",{
      method:"POST",
      mode: "cors",
      body: JSON.stringify({"pssn":"PssnAPI01","pname":"APItest1","gender":"M","age":10}),
      headers: {
        "Content-Type": "application/json"
      }
    });
    fetch(request)
    .then(function(response){
      response.json()
      .then(function(data){
        console.log(data)
      })
    })
  }

  //GET
  testGet(){
    fetch('/api/patient',{
      method: "GET",
      headers: {
        "Accept":"application/json",
        "Content-Type":"application/json"
      }
    })
    .then(function(response){
      response.json()
      .then(function(data){
        console.log(data)
      })
    })
  }

  /**
  * Render
  *
  * @returns {XML}
  */
  render(){

    let test = [];

    if(this.state.menuCon == 0){
      test.push(            <div class="sub">  <strong> Hospital Information Management System </strong>
        </div>);
        test.push(<div class="sub"> <br></br><p>Welcome!</p>
        </div>);
        test.push(<div class="sub"> <br></br><p>Are you an Administrator or Physician?</p>
        </div>);
        test.push(  
        <div className = "sub">
        <span>
        <button class="w3-button w3-xlarge w3-teal menuButton" onClick = {this.handleClick.bind(this, 1)}>Administrator</button>

        </span>{"                                                 "}

        <button class="w3-button w3-xlarge w3-red w3-card-4 menuButton" onClick = {this.handleClick.bind(this, 2)}>Doctor</button>
        


        </div>        

        );


      } else if(this.state.menuCon == 1){
        //test.push(<div> lmao </div>);
        test.push(   <AdminLanding/ >);

      }else if(this.state.menuCon == 2){
        //test.push(<div>lmaokai</div>);
        test.push(   <DoctorLanding/ >);

      }





      return(
        <div className="container">
        {test}

        </div>
      );
    }

  }