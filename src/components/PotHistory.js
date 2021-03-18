import React, { Component, Fragment } from 'react';
import Pot from './Pot';
import axios from "axios";
import { Auth } from "aws-amplify"


const config = require('../config.json');

export default class Pots extends Component {

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
        "AccessToken" : AccessToken
      }
      const res = await axios.post(`${config.api.devApiUrl}/pots`, reqBody);
      const pots = JSON.parse(res.data.body);
      console.log(pots)
      this.setState({ pots: pots});
    } catch (err) {
      console.log(`An error has occurred: ${err}`);
    }
  }

  componentDidMount = () => {
    this.fetchPots();
  }

   

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
                    <h3>Time: </h3>
                    <h3>Temperature: {this.props.temp}&deg;F</h3>
                    <h3>Reservoir Level: {this.props.reservoirLevel}</h3>
                    <h3>Moisture: {this.props.soilMoisture}</h3>
                    <h3>Sun: {this.props.photosensor}</h3>
                    <h3>Time: </h3>
                    <h3>Temperature: {this.props.temp}&deg;F</h3>
                    <h3>Reservoir Level: {this.props.reservoirLevel}</h3>
                    <h3>Moisture: {this.props.soilMoisture}</h3>
                    <h3>Sun: {this.props.photosensor}</h3>                
                </div>
                
        </section>
        </div>
      </Fragment>
    )
  }
}
