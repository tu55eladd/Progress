import * as React from 'react';

export default class Chip extends React.Component<any, any> {
  removeChip(){
    this.props.remove();
  }

  render(){
    return(
      <div className="Chip box">
        <span className="Chip-label">{ this.props.text }</span>
        <span className="glyphicon glyphicon-remove Chip-remove" />
      </div>
    )
  }
}
