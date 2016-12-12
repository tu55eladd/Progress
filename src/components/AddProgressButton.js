import React from 'react';
import StateChanger from './StateChanger';

export default class AddProgressButton extends React.Component {

  handleNameChange(event){
    this.setState({name: event.target.value})
  }

  getAddHandler(){
    if(this.addHandler){
      return this.addHandler;
    }

    this.addHandler = (event) => {
      if(event.keyCode == 13){
        StateChanger.addTrackedProgress(this.state.name);
        event.target.value = "";
      }

    }

    return this.addHandler;
  }

  addEnterListener(){
    window.addEventListener("keydown", this.getAddHandler());
  }

  removeEnterListner(){
    window.removeEventListener("keydown", this.getAddHandler());
  }

  render(){
    return(
      <div className="progress-add box">
        <div className=" input-group">
          <span className="input-group-addon" id="basic-addon1">New progress name</span>
          <input type="text" className="form-control" placeholder="Username" onChange={this.handleNameChange.bind(this)} aria-describedby="basic-addon1"
            onFocus={ this.addEnterListener.bind(this) }
            onBlur={ this.removeEnterListner.bind(this) }
           />
        </div>
        <div className="progress-add-button" onClick={ () => { StateChanger.addTrackedProgress(this.state.name) } }>Add progress</div>
      </div>
    )
  }
}
