import * as React from 'react';

import CategoryChooser from './CategoryChooser';
import CategoryFilter from './CategoryFilter';
import OverallProgress from './OverallProgress';
import StateChanger from './StateChanger';
import TextInput from './TextInput';


export default class SingleTasks extends React.Component <any, any> {

  getOverallProgress(){
    const tasks = StateChanger.getTasks();
    const stepCount = tasks.length;
    const checkedCount = tasks
      .map( task => { return task.checked ? 1+0 : 0 } )
      .reduce( ( accumulator, currentValue ) => { return accumulator + currentValue } );
    return { stepCount, checkedCount };
  }

  getTaskNodes(){

  }

  render(){

    const taskNodes = StateChanger.getTasks()
      .map( (task, index) => {
        const checked = task.checked;
        const classes = "Task box" + ( checked ? " Task-checked" : "" );
        return <div className={classes} checked={ checked ? true : false } key={index} onClick={ () => { StateChanger.toggleTask( task.id ); } } >
                <div>
                  <span>{ task.name }</span>
                  <input type="checkbox" />
                </div>
                <CategoryChooser category={ task.category } index={index} />
              </div>
      })

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
