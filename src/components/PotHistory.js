import React, { Component, Fragment } from 'react';
import Pot from './Pot';
import axios from "axios";
import { Auth } from "aws-amplify"
import PotHistoryData from './PotHistoryData';


const config = require('../config.json');

export default class PotHistoryPage extends Component {

/// fix v
  state = {
    newpot: null,
    pots: []
  }

  fetchPots = async () => {
    // add call to AWS API Gateway to fetch pots here
    // then set them in state
    // try {
    //   const res = await axios.get(`${config.api.invokeUrl}/pot`);
    //   const pots = res.data;
    //   this.setState({ pots: pots});
    // } catch (err) {
    //   console.log(`An error has occurred: ${err}`);
    // }
    try {
      const AccessToken = (await Auth.currentSession())["accessToken"]["jwtToken"]
      const reqBody = {
        "AccessToken" : AccessToken,
        //"PotId": '567'
      }
      const res = await axios.post(`${config.api.devApiUrl}/pots`, reqBody);
      //const res = await axios.get(`${config.api.devApiUrl}/pot`,  {
      //  headers: {
      //    "Authorization": '${AccessToken}',
      //    "PotId": '567'
      //  } 
      //});
      const potData = JSON.parse(res.data.body);
      console.log(potData)
      this.setState({ potData: potData});
    } catch (err) {
      console.log(`An error has occurred: ${err}`);
    }
  }

  componentDidMount = () => {
    this.fetchPots();
  }
  /// fix ^ 

  render() {
    return (
      <Fragment>
        <div className = "container">
        {this.props.auth.isAuthenticated && this.props.auth.user && (
                <h1 className="pTitle">Welcome Back, {this.props.auth.user.username} </h1>
              )}
        <section className="PotHistoryContainer">
        <h1>Pot History</h1>
              <p className="subtitle is-5" style={{color:"#FFFFFF"}}>Here is the history for this pot:</p>
        <div className="PotHistory">
          {
                        this.state.potData && this.state.potData.length > 0
                        ? this.state.potData.map(potData => <PotHistoryData userName={potData.userName} potId={potData.potId} timestamp={potData.timestamp} potName={potData.potName} plantType={potData.plantType} {...potData.sensorData}/>)
                        : <div className="tile notification is-warning">You dont have any history on this pot yet.</div>            
          }
                        </div>
                
        </section>
        </div>
      </Fragment>
    )
  }
}