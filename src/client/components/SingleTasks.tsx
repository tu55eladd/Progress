import * as React from 'react';

import CategoryChooser from './CategoryChooser';
import CategoryFilter from './CategoryFilter';
import OverallProgress from './OverallProgress';
import StateChanger from './StateChanger';
import TextInput from './TextInput';
import TaskComponent from './Task';


export default class SingleTasks extends React.Component <any, any> {

  getOverallProgress(){
    const tasks = StateChanger.getTasks();
    const stepCount = tasks.length;
    const checkedCount = tasks
      .map( task => { return task.checked ? 1+0 : 0 } )
      .reduce( ( accumulator, currentValue ) => { return accumulator + currentValue } );
    return { stepCount, checkedCount };
  }


  render(){
    const categoryFilter:String[] = StateChanger.getCategoryFilters();
    var tasks:Task[] = StateChanger.getTasks();
    if( categoryFilter.length != 0 ){
      tasks = tasks.filter( (task) => { return categoryFilter.indexOf(task.category) != -1 } );
    }
    const taskNodes = tasks
      .map( (task, index) => {
        return <TaskComponent task={ task } key={ index } index={ index }  />
      });

    const progressNumbers = this.getOverallProgress();

    return(
      <div className="Detailview" >
        <OverallProgress stepCount={progressNumbers.stepCount} checkedCount={progressNumbers.checkedCount} />
        <CategoryFilter />
        <div className="Tasks-container">
          { taskNodes }
        </div>
        <TextInput
          clickHandler={ (name:string) => { StateChanger.addTask( name ) } }
          label="Add new task:" addText="Add" classes="box" placeholder="New task name" />
      </div>
    )
  }
}
