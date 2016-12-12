import React from 'react';

import Progresses from './Progresses';
import SingleTasks from './SingleTasks';
import Sidebar from './Sidebar';

const detailViews = [
  { name: "Tracked progresses", active: false },
  { name: "Single tasks", active: false },
]

export default class Root extends React.Component {
  constructor(props){
    super(props);
    this.selectedOption = <Progresses progressItems={this.props.progressItems} />;
    this.lastViewIndex = 0;
    this.state = { selectedOption: this.getSelectedOption };
  }

  setView(index){
    if(this.lastViewIndex !== undefined){
      detailViews[this.lastViewIndex].active = false;
    }
    detailViews[index].active = true;
    this.lastViewIndex = index;
    this.setState({ selectedOption: this.getSelectedOption() }); // Only to trigger rendering
  }

  getSelectedOption(){
    if(detailViews[this.lastViewIndex].name === "Single tasks" ){
      return <SingleTasks tasks={this.props.tasks} />;
    }
    else {
      return <Progresses progressItems={this.props.progressItems} />;
    }
  }

  render() {
    return(
      <div style={{width: 100+"%"}} >
        <Sidebar detailViews={detailViews} setView={ this.setView.bind(this) } />
        { this.getSelectedOption() }
      </div>
    )

  }
}
