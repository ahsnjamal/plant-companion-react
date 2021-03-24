import React, { Component, Fragment, useEffect }  from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from "axios";
import { Auth } from "aws-amplify"


const config = require('../config.json');


export default class PotHistoryData extends Component {
   
  state = {
    isEditMode: false,
    updatedpotname: this.props.potName
  }

  handlePotEdit = event => {
    event.preventDefault();
    this.setState({ isEditMode: true });
  }

  handleEditSave = event => {
    event.preventDefault();
    this.setState({ isEditMode: false });
    this.props.handleUpdatePot(this.props.id, this.state.updatedpotname);
  }

  fetchPots = async () => {
    // add call to AWS API Gateway to fetch pots here
    // then set them in state
    // try {
    //   const res = await axios.get(`${config.api.invokeUrl}/pots`);
    //   const pots = res.data;
    //   this.setState({ pots: pots});
    // } catch (err) {
    //   console.log(`An error has occurred: ${err}`);
    // }
    try {
      //const AccessToken = (await Auth.currentSession())["accessToken"]["jwtToken"]
      //const reqBody = {
      //  "AccessToken" : AccessToken
        //"PotId": `567`
      //}
      //const res = await axios.post(`${config.api.devApiUrl}/pot`, reqBody);

      const res = await axios.get(`${config.api.devApiUrl}/pot`,  {
        headers: {
          "Authorization": '${AccessToken}',
          "PotId": '567'
        } 
      });

      
      const pot = res.data;
      this.setState({ pots: pot});
    } catch (err) {
      console.log(`An error has occurred: ${err}`);
    }
  }

  onAddPotNameChange = event => this.setState({ "updatedpotname": event.target.value });
  
  
  render() { 
    const data = this.props.sensorData
    console.log(data)
    return (
      
      <div className="potData">
        {
          this.state.isEditMode 
          ? <div>
              <p>Edit pot name</p>
              <input 
                className="input is-medium"
                type="text" 
                placeholder="Enter name"
                value={this.state.updatedpotname}
                onChange={this.onAddPotNameChange}
              />
              <p className="pot-id">id: {this.props.timestamp}</p>
              <button type="submit" 
                className="button is-info is-small"
                onClick={ this.handleEditSave }
              >save</button>
            </div>
          : <div>
                <div className="PotHistoryEntry">
                    <h3>Time: {this.props.timestamp}</h3>
                    <h3>Temperature: {this.props.temp}&deg;F</h3>
                    <h3>Reservoir Level: {this.props.reservoirLevel}</h3>
                    <h3>Moisture: {this.props.soilMoisture}</h3>
                    <h3>Sun: {this.props.photosensor}</h3>
                </div>
            </div>
        }
      </div>
    )
  }
}