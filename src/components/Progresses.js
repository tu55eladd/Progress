import React from 'react';
import ReactDOM from 'react-dom';

import OverallProgress from './OverallProgress';
import AddProgressButton from './AddProgressButton';
import ProgressItem from './ProgressItem';
import state from './state';
const progressItems = state.progressItems;

export default class Progresses extends React.Component {

  constructor( props ){
    super(props);
    this.state = { tasksShowingSubtasks: [] };
  }

  addProgress( progressName ){
    const newState = Object.assign({},this.props.push({ name: progressName, weight: 1, checkedSteps: 0, steps: 10, id: nextId}));
    this.setState({data: newState});
    nextId++;
  }

  getOverallProgress(){
    this.stepCount = this.props.progressItems
      .map( progressItem => { return progressItem.subTasks ? progressItem.subTasks.length : progressItem.steps } )
      .reduce( (accumulator, currentValue) => { return accumulator += currentValue } );
    this.checkedCount = this.props.progressItems
      .map( progressItem => {
        return progressItem.subtasks ? // will return count of checked sub-tasks
          progressItem.subtasks
          .map( task => task.checked ? 1 : 0 )
          .reduce( (accumulator, currentValue) => { return accumulator + currentValue } )
          : progressItem.checkedSteps } )
      .reduce( (accumulator, currentValue) => { return accumulator += currentValue } );
  }

  toggleShowSubTasks( progressIndex ){
    const indexOfProgressIndex = this.state.tasksShowingSubtasks.indexOf(progressIndex);
    if( indexOfProgressIndex === -1 ){
      this.state.tasksShowingSubtasks.push( progressIndex );
    }
    else{
      this.state.tasksShowingSubtasks.splice( indexOfProgressIndex , 1 );
    }
    this.setState( { tasksShowingSubtasks: this.state.tasksShowingSubtasks } );
  }

  render(){
    const progressItemNodes = this.props.progressItems ? this.props.progressItems.map( (progressItem, index) => {
      return <ProgressItem
        name={ progressItem.name }
        key={ progressItem.id }
        id={ progressItem.id }
        steps={ progressItem.steps }
        checkedSteps={ progressItem.checkedSteps }
        subTasks={ progressItem.subtasks }
        showSubTasks={ this.state.tasksShowingSubtasks.indexOf(index) !== -1 ? true : false }
        clickHandler={ () => { this.toggleShowSubTasks(index) } }
        index={index} />
    }) : [];

    this.getOverallProgress();

    return (
      <div className="Detailview" >
        <OverallProgress stepCount={this.stepCount} checkedCount={this.checkedCount} />
        { progressItemNodes }
        <AddProgressButton onClick={this.addProgress.bind(this)} />
      </div>
    )
  }
}
