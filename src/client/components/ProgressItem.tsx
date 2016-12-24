import * as React from 'react';

import ProgressAdjuster from './ProgressAdjuster';
import Step from './Step';
import StateChanger from './StateChanger';
import SubTaskComponent from './SubTask';
import TextInput from './TextInput';

export default class ProgressItemComponent extends React.Component<any, any> {

  isFocus:Boolean;
  arrowKeyHandler:EventListenerObject;

  constructor( props:any ){
    super(props);
    this.state = { checkedSteps: this.props.checkedSteps, inFocus: false };
  }

  getArrowKeyHandler():EventListenerObject{
    if(this.arrowKeyHandler){
      return this.arrowKeyHandler;
    }

    const handler = (event:any) => {
      if(event.keyCode == 37){
        StateChanger.decreaseProgress(this.props.index);
      }
      if(event.keyCode == 39){
        StateChanger.increaseProgress(this.props.index);
      }
    }

    this.arrowKeyHandler = handler.bind(this);
    return this.arrowKeyHandler;
  }

  listenOnArrowKeys(){
    window.addEventListener("keydown", this.getArrowKeyHandler() );
  }

  removeArrowKeyListener(){
    window.removeEventListener("keydown", this.getArrowKeyHandler() );
  }

  addFocusClass(){
    this.setState( { inFocus: true } );
  }

  getTaskNodes(){
    if( this.props.showSubTasks && this.props.subTasks ){
      const nodes = this.props.subTasks
        .map( (subtask:SubTask, index:number) => {
          return <SubTaskComponent
                    name={subtask.name}
                    key={index}
                    index={index}
                    checked={subtask.checked}
                    progressItemIndex={this.props.index} /> })
      //nodes.push( <AddSubTaskButton key={-1} progressItemIndex={this.props.index} /> );
      nodes.push( <TextInput key={-1} placeholder="Subtask name" label="Add new subtask:"
        clickHandler={ (name:string) => {
          StateChanger.addSubTask( this.props.index, name );
        } } /> );
      return nodes;
    }
    return [];
  }

  getStepNodes(){
    const stepNodes:JSX.Element[] = [];
    if( this.props.subTasks ){
      this.props.subTasks
        .map( (subtask:SubTask, index:number) => {
          stepNodes.push( <Step key={index} isActive={subtask.checked}/> );
        })
      return stepNodes;
    }

    for (var i = 0; i < this.props.steps; i++){
      if(i < this.props.checkedSteps){
          stepNodes.push(<Step key={i} isActive={true} />);
          continue;
      }
      stepNodes.push(<Step key={i} isActive={false} />);
    }
    return stepNodes;
  }

  render(){
    const taskNodes = this.getTaskNodes();
    const stepNodes = this.getStepNodes();

    return (
      <div  className={"progress-item box " + (this.isFocus ? "Progress-item-in-focus" : "") }
            onFocus={ () => { this.listenOnArrowKeys(); this.addFocusClass(); } }
            onBlur={ this.removeArrowKeyListener.bind(this) }
            tabIndex={ this.props.index }
            onClick={ this.props.clickHandler } >
        <p className="progress-item-label">{ this.props.name }</p>
        <div className="progress-item-top-bar">
          <div className="step-nodes">
            { stepNodes }
          </div>
          <div className="progress-item-top-bar-keys">
            <ProgressAdjuster key={this.props.id} id={this.props.id} index={this.props.index}/>
          </div>
        </div>
        <ul>
          { taskNodes }
        </ul>
      </div>
    )
  }
}
