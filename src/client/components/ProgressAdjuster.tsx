import * as React from 'react';

import StateChanger from './StateChanger';

export default class ProgressAdjuster extends React.Component<any, any> {
  render(){
    return(
      <div className="Progress-adjuster">
        <div className="Progress-adjuster-arrow" onClick={(e) => {e.stopPropagation();StateChanger.decreaseProgress(this.props.index)}} >&larr;</div>
        <div className="Progress-adjuster-arrow" onClick={(e) => {e.stopPropagation();StateChanger.increaseProgress(this.props.index)}} >&rarr;</div>
      </div>
    )
  }
}
