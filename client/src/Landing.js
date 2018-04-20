import React from 'react';

import { ButtonToolbar, Button,Breadcrumb,Jumbotron,ButtonGroup} from 'react-bootstrap';
import { Form, FormGroup, FormControl, Nav, ControlLabel, HelpBlock} from 'react-bootstrap';

import AdminLanding from './AdminLanding';
import DoctorLanding from './DoctorLanding';

export default class Menu extends React.Component
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

  }

  handleClick(num){

    this.setState({ menuCon: num });

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