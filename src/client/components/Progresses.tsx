import * as React from 'react';
import * as ReactDOM from 'react-dom';

import OverallProgress from './OverallProgress';
import TextInput from './TextInput';
import StateChanger from './StateChanger';
import ProgressItemComponent from './ProgressItem';
import state from './state';
const progressItems = state.progressItems;

export default class Progresses extends React.Component<any, any> {

  stepCount:number;
  checkedCount:number;  

  constructor( props:any ){
    super(props);
    this.state = { tasksShowingSubtasks: [] };
  }

  getOverallProgress(){
    const progressItems = StateChanger.getTrackedProgresses();
    if(!progressItems){
      return 1;
    }

    this.stepCount = progressItems
      .map( (progressItem) => { return progressItem.subtasks ? progressItem.subtasks.length : progressItem.steps } )
      .reduce( (accumulator, currentValue) => { return accumulator += currentValue } );
    this.checkedCount = progressItems
      .map( (progressItem) => {
        return progressItem.subtasks ? // will return count of checked sub-tasks
          progressItem.subtasks
          .map( task => task.checked ? 1-0 : 0-0 ) // 1 | 0 is parsed as boolean, 1-0 is parsed as a number ( by typescript )
          .reduce( (accumulator, currentValue) => { return accumulator + currentValue } )
          : progressItem.checkedSteps } )
      .reduce( (accumulator, currentValue) => { return accumulator += currentValue } );
  }

  toggleShowSubTasks( progressIndex:number ){
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
    const progressItems = StateChanger.getTrackedProgresses();
    const progressItemNodes = progressItems ? 
      progressItems.map( (progressItem, index) => {
        return <ProgressItemComponent
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
        <TextInput
          clickHandler={ (name:string) => { StateChanger.addTrackedProgress( name ) } }
          label="Add new progress:" addText="Add" classes="box" placeholder="Name of tracked progress" />
      </div>
    )
  }
}
