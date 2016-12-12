import React from 'react';

export default class Step extends React.Component {
  render(){
    const classes = "step" + ( this.props.isActive ? " active-step" : "" );

    return (
      <div className={classes} />
    )
  }
}
