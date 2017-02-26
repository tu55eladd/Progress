import * as React from 'react';
import CategoryChooser from './CategoryChooser';
import StateChanger from './StateChanger';

export default class TaskComponent extends React.Component<any,any> {

    toggleTask( event:any ){
        StateChanger.toggleTask( this.props.task.id );
    }

    deleteTask( event:any ){
        event.stopPropagation();
        StateChanger.deleteTask( this.props.index );
    }


    render(){
        const task = this.props.task;

        const classes = "Task box" + ( task.checked ? " Task-checked" : "" );
        return(
            <div className={classes} 
                 checked={ task.checked ? true : false } 
                 key={this.props.index} 
                 onClick={ this.toggleTask.bind(this) } >
                <div>
                    <span>{ task.name }</span>
                    <input type="checkbox" />
                </div>
                <CategoryChooser category={ task.category } index={ this.props.index } />
                <span className="Subtask-delete" 
                      onClick={ this.deleteTask.bind(this) } >Delete</span>
            </div>
        )
    }

}