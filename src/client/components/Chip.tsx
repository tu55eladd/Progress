import * as React from 'react';
import StateChanger from './StateChanger';

export default class Chip extends React.Component<any, any> {
  removeChip(){
    StateChanger.removeCategoryFilter( this.props.text );
  }

  render(){
    return(
      <div className="Chip box">
        <span className="Chip-label">{ this.props.text }</span>
        <span className="glyphicon glyphicon-remove Chip-remove"
          onClick={ this.removeChip.bind(this) } />
      </div>
    )
  }
}
