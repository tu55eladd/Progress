import state from './state';

/* This component does not need to use Object.assign since this is handled is the ComponentRenderer */
export default class StateChanger {
 
  static componentRenderer:any;

  static setRenderer(componentRenderer:any){
    this.componentRenderer = componentRenderer;
  }

  static increaseProgress( progressItemIndex:number ){
    var checkedSteps = state.progressItems[progressItemIndex].checkedSteps;
    var steps = state.progressItems[progressItemIndex].steps;
    checkedSteps = checkedSteps == steps ? checkedSteps : checkedSteps + 1;
    state.progressItems[progressItemIndex].checkedSteps = checkedSteps;
    this.reRender(state);
  }

  static decreaseProgress( progressItemIndex:number ){
    var checkedSteps = state.progressItems[progressItemIndex].checkedSteps;
    checkedSteps = checkedSteps == 0 ? checkedSteps : checkedSteps - 1;
    state.progressItems[progressItemIndex].checkedSteps = checkedSteps;
    this.reRender(state);
  }

  static addTrackedProgress( name:string, numberOfSteps?:number ){
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

  static addTask( name:string ){
    state.tasks.push({ name: name, id: state.nextTaskId, checked: false });
    state.nextTaskId = state.nextTaskId + 1;
    this.reRender(state);
  }

  static toggleTask( taskId:number ){
    const tasks = state.tasks.filter( task => { return task.id == taskId } );
    tasks[0].checked = !tasks[0].checked;
    this.reRender(state);
  }

  static toggleSubTask( progressItemIndex:number, subTaskIndex:number ){
    const subTask = state.progressItems[progressItemIndex].subtasks[subTaskIndex];
    subTask.checked = !subTask.checked;
    this.reRender(state);
  }

  static addSubTask( progressItemIndex:number, name:string ){
    const newSubTask = { name, checked: false };
    state.progressItems[progressItemIndex].subtasks.push(newSubTask);
    this.reRender(state);
  }

  static deleteSubTask( progressItemIndex:number, subTaskIndex:number ){
    state.progressItems[progressItemIndex].subtasks.splice( subTaskIndex, 1 );
    this.reRender(state);
  }

  static getCategories(){
    return state.categories;
  }

  static addCategory( name:string ){
    if( state.categories.indexOf(name) === -1 ){
      state.categories.push(name);
    }
    this.reRender(state);
  }

  static setCategory( taskIndex:number , categoryName:string ){
    if(! (categoryName in state.categories) ){
      return;
    }
    state.tasks[taskIndex].category = categoryName;
    this.reRender(state);
  }

  static getCategoryFilters(){
    return state.categoryFilters;
  }

  static getTasks(){
    return state.tasks;
  }

  static getTrackedProgresses(){
    return state.progressItems;
  }

  static reRender( state:State ){
    this.componentRenderer.setProps(state);
  }
}
