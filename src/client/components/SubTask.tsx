import * as React from 'react';

import StateChanger from './StateChanger';

export default class SubTaskComponent extends React.Component<any, any> {

  deleteHandler( event:any ){
    event.stopPropagation();
    StateChanger.deleteSubTask( this.props.progressItemIndex, this.props.index );
  }

  render(){
    const classes = "SubTask" + (this.props.checked ? " SubTask-checked" : "");
    return(
      <li className={classes}
          checked={ this.props.checked }
          onClick={ (event) => { event.stopPropagation(); StateChanger.toggleSubTask( this.props.progressItemIndex, this.props.index) } }>
          <span className="SubTask-name">{ this.props.name }</span>
          <span className="SubTask-delete" onClick={ this.deleteHandler.bind(this) } >delete</span>
      </li>
    )
  }
}
