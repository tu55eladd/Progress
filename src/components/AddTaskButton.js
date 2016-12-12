import React from 'react';

import StateChanger from './StateChanger';

export default class AddTaskButton extends React.Component {

  getAddHandler(){
    if(this.addHandler){
      return this.addHandler
    }
    this.addHandler = (event) => {
      if(event.keyCode == 13){
        StateChanger.addTask( event.target.value );
        event.target.value = "";
      }
    }
    return this.addHandler;
  }

  addEnterListener(){
    window.addEventListener("keydown", this.getAddHandler() );
  }

  removeEnterListener(){
    window.removeEventListener("keydown", this.getAddHandler() );
  }

  handleNameChange( event ){
    this.setState({ name: event.target.value });
  }

  render(){
    return(
        <div className="box" >
          <div className=" input-group">
            <span className="input-group-addon" id="basic-addon1">Task name</span>
            <input type="text" className="form-control" placeholder="Clean your shit up" onChange={ this.handleNameChange.bind(this) } aria-describedby="basic-addon1"
              onFocus={ this.addEnterListener.bind(this) }
              onBlur={ this.removeEnterListener.bind(this) }
             />
          </div>
          <div className="progress-add-button" onClick={ (event) => { StateChanger.addTask(this.state.name); event.target.value="";} }>Add progress</div>
        </div>
    )
  }
}
