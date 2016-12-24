import * as React from 'react';

export default class OverallProgress extends React.Component<any, any> {

  render(){
    const done    = Math.floor( (this.props.checkedCount / this.props.stepCount) * 100 );
    const notDone = 100 - done;
    return(
      <div className="Overall-progress" >
        <div style={{width: done+"%", backgroundColor: "#ade3a7"}} ></div>
        <div style={{width: notDone+"%", backgroundColor: "#e3aaa7"}}></div>
      </div>
    )
  }
}
