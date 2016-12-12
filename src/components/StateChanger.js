import state from './state';
import ComponentRenderer from './ComponentRenderer';

/* This component does not need to use Object.assign since this is handled is the ComponentRenderer */
export default class StateChanger {
  static setRenderer(componentRenderer){
    this.componentRenderer = componentRenderer;
  }

  static increaseProgress( progressItemIndex ){
    var checkedSteps = state.progressItems[progressItemIndex].checkedSteps;
    var steps = state.progressItems[progressItemIndex].steps;
    checkedSteps = checkedSteps == steps ? checkedSteps : checkedSteps + 1;
    state.progressItems[progressItemIndex].checkedSteps = checkedSteps;
    this.reRender(state);
  }

  static decreaseProgress( progressItemIndex ){
    var checkedSteps = state.progressItems[progressItemIndex].checkedSteps;
    checkedSteps = checkedSteps == 0 ? checkedSteps : checkedSteps - 1;
    state.progressItems[progressItemIndex].checkedSteps = checkedSteps;
    this.reRender(state);
  }

  static addTrackedProgress( name, numberOfSteps ){
    state.progressItems.push(
      {
        id: state.nextId,
        steps: numberOfSteps ? numberOfSteps : 10,
        checkedSteps: 0,
        weight: 1,
        name: name
      })
    state.nextId = state.nextId + 1;
    this.reRender(state);
  }

  static addTask( name ){
    state.tasks.push({ name: name, id: state.nextTaskId, checked: false });
    state.nextTaskId = state.nextTaskId + 1;
    this.reRender(state);
  }

  static toggleTask( taskId ){
    const tasks = state.tasks.filter( task => { return task.id == taskId } );
    tasks[0].checked = !tasks[0].checked;
    this.reRender(state);
  }

  static toggleSubTask( progressItemIndex, subTaskIndex ){
    const subTask = state.progressItems[progressItemIndex].subtasks[subTaskIndex];
    subTask.checked = !subTask.checked;
    this.reRender(state);
  }

  static addSubTask({ progressItemIndex, name }){
    const newSubTask = { name, checked: false };
    state.progressItems[progressItemIndex].subtasks.push(newSubTask);
    this.reRender(state);
  }

  static deleteSubTask({ progressItemIndex, subTaskIndex }){
    console.log("progIndex, sub-index", progressItemIndex, subTaskIndex);
    console.log("state", state);
    state.progressItems[progressItemIndex].subtasks.splice( subTaskIndex, 1 );
    this.reRender(state);
  }

  static reRender(state){
    this.componentRenderer.setProps(state);
  }
}
