import * as React from 'react';

import Progresses from './Progresses';
import SingleTasks from './SingleTasks';
import Sidebar from './Sidebar';

const detailViews:DetailView[] = [
  { name: "Tracked progresses", active: false },
  { name: "Single tasks", active: false },
]

export default class Root extends React.Component<any, any>  {
  lastViewIndex:number;

  constructor(props:any){
    super(props);
    this.lastViewIndex = 0;
    this.state = { selectedOption: this.getSelectedOption, lastViewIndex: 0 };
  }

  setView(index:number){
    /* If first selection */
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
