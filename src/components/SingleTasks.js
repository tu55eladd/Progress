import React from 'react';

import AddTaskButton from './AddTaskButton';
import StateChanger from './StateChanger';
import OverallProgress from './OverallProgress';

export default class SingleTasks extends React.Component {

  getOverallProgress(){
    this.stepCount = this.props.tasks.length;
    this.checkedCount = this.props.tasks
      .map( task => { return task.checked ? 1 : 0 } )
      .reduce( ( accumulator, currentValue ) => { return accumulator + currentValue } );
  }

  render(){

    const taskNodes = this.props.tasks
      .map( (task, index) => {
        const checked = task.checked;
        const classes = "Task box" + ( checked ? " Task-checked" : "" );
        return <div className={classes} checked={ checked ? "true" : "false" } key={index} onClick={ () => { StateChanger.toggleTask( task.id ); } } >
                <span>{ task.name }</span>
                <input type="checkbox" />
              </div>
      })

    this.getOverallProgress();

    return(
      <div className="Detailview" >
        <OverallProgress stepCount={this.stepCount} checkedCount={this.checkedCount} />
        <div className="Tasks-container">
          { taskNodes }
        </div>
        <AddTaskButton />
      </div>
    )
  }
}
