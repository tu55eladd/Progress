import React from 'react';

import StateChanger from './StateChanger';

export default class AddSubTaskButton extends React.Component {

  handleClick( event ){
    event.stopPropagation();
    StateChanger.addSubTask({ progressItemIndex: this.props.progressItemIndex, name: this.state.name });
    event.target.value = "";
  }

  changeHandler( event ){
    this.setState({ name: event.target.value });
  }

  getEnterHandler(){
    if(this.enterHandler){
      return this.enterHandler;
    }

    this.enterHandler = (event) => {
      if(event.keyCode === 13){
        console.log("asdfskdjfh");
        this.handleClick(event);
      }
    }
    return this.enterHandler;

  }

  enableEnter(){
    window.addEventListener("keydown", this.getEnterHandler() );
  }

  disableEnter(){
    window.removeEventListener("keydown", this.getEnterHandler() );
  }

  render(){
    return(
      <li className="AddSubTaskButton" onClick={ e => e.stopPropagation() }
        onFocus={ this.enableEnter.bind(this) }
        onBlur={ this.disableEnter.bind(this) } >
        <span>{ 'Add new task: ' }</span>
        <input placeholder="clean your shit up" type="text" onChange={ this.changeHandler.bind(this) } ></input>
        <button onClick={ this.handleClick.bind(this) } >Add task</button>
      </li>
    )
  }
}
