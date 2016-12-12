import React from 'react';

import StateChanger from './StateChanger';

export default class SubTask extends React.Component {

  deleteHandler( event ){
    event.stopPropagation();
    StateChanger.deleteSubTask({ progressItemIndex: this.props.progressItemIndex, subTaskIndex: this.props.index });
  }

  render(){
    const classes = "SubTask" + (this.props.checked ? " SubTask-checked" : "");
    return(
      <li className={classes}
          checked={ this.props.checked }
          onClick={ (event) => { event.stopPropagation(); StateChanger.toggleSubTask( this.props.progressItemIndex, this.props.index) } }>
          <span>{ this.props.name }</span>
          <span className="SubTask-delete" onClick={ this.deleteHandler.bind(this) } >delete</span>
      </li>
    )
  }
}
