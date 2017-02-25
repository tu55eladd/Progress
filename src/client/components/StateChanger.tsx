//import state from './state';

/* This component does not need to use Object.assign since this is handled is the ComponentRenderer */
export default class StateChanger {
 
  static componentRenderer:any;
  static user:User;
  static state:State;

  static setRenderer(componentRenderer:any){
    this.componentRenderer = componentRenderer;
  }

  static setUser(user:User){
    StateChanger.user = user;
  }

  static setState( state:State ){
    StateChanger.state = state;
  }

  static increaseProgress( progressItemIndex:number ){
    var checkedSteps = StateChanger.state.progressItems[progressItemIndex].checkedSteps;
    var steps = StateChanger.state.progressItems[progressItemIndex].steps;
    checkedSteps = checkedSteps == steps ? checkedSteps : checkedSteps + 1;
    StateChanger.state.progressItems[progressItemIndex].checkedSteps = checkedSteps;
    this.reRender(StateChanger.state);
  }

  static decreaseProgress( progressItemIndex:number ){
    var checkedSteps = StateChanger.state.progressItems[progressItemIndex].checkedSteps;
    checkedSteps = checkedSteps == 0 ? checkedSteps : checkedSteps - 1;
    StateChanger.state.progressItems[progressItemIndex].checkedSteps = checkedSteps;
    this.reRender(StateChanger.state);
  }

  static addTrackedProgress( name:string, numberOfSteps?:number ){
    StateChanger.state.progressItems.push(
      {
        id: StateChanger.state.nextId,
        steps: numberOfSteps ? numberOfSteps : 10,
        checkedSteps: 0,
        weight: 1,
        name: name
      })
    StateChanger.state.nextId = StateChanger.state.nextId + 1;
    this.reRender(StateChanger.state);
  }

  static addTask( name:string ){
    StateChanger.state.tasks.push({ name: name, id: StateChanger.state.nextTaskId, checked: false });
    StateChanger.state.nextTaskId = StateChanger.state.nextTaskId + 1;
    this.reRender(StateChanger.state);
  }

  static toggleTask( taskId:number ){
    const tasks = StateChanger.state.tasks.filter( task => { return task.id == taskId } );
    tasks[0].checked = !tasks[0].checked;
    this.reRender(StateChanger.state);
  }

  static toggleSubTask( progressItemIndex:number, subTaskIndex:number ){
    const subTask = StateChanger.state.progressItems[progressItemIndex].subtasks[subTaskIndex];
    subTask.checked = !subTask.checked;
    this.reRender(StateChanger.state);
  }

  static addSubTask( progressItemIndex:number, name:string ){
    const newSubTask = { name, checked: false };
    StateChanger.state.progressItems[progressItemIndex].subtasks.push(newSubTask);
    this.reRender(StateChanger.state);
  }

  static deleteSubTask( progressItemIndex:number, subTaskIndex:number ){
    StateChanger.state.progressItems[progressItemIndex].subtasks.splice( subTaskIndex, 1 );
    this.reRender(StateChanger.state);
  }

  static getCategories(){
    return StateChanger.state.categories;
  }

  static addCategory( name:string ){
    if( StateChanger.state.categories.indexOf(name) === -1 ){
      StateChanger.state.categories.push(name);
    }
    this.reRender(StateChanger.state);
  }

  static setCategory( taskIndex:number , categoryName:string ){
    if(! (categoryName in StateChanger.state.categories) ){
      return;
    }
    StateChanger.state.tasks[taskIndex].category = categoryName;
    this.reRender(StateChanger.state);
  }

  static getCategoryFilters(){
    return StateChanger.state.categoryFilters;
  }

  static getTasks(){
    return StateChanger.state.tasks;
  }

  static deleteTask( index:number ){
    StateChanger.state.tasks.splice( index, 1 );
    this.reRender(StateChanger.state);
  }

  static getTrackedProgresses(){
    return StateChanger.state.progressItems;
  }

  static reRender( state:State, persistState:Boolean = true  ){
    this.componentRenderer.setProps(state);
    if( persistState ){
      this._persistState(state)
    }
  }

  static _persistState( state:State ){
    this.user.state = state;
    fetch('/user', {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(this.user)
    });

  }
}
