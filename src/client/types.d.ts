
interface Task { name:string, id:number, checked:boolean, category?:string }
interface DetailView { name:string, active:boolean }
interface SubTask { name:string, checked:boolean }

interface User { name:string, _id:string, email:string, state?:State }

interface ProgressItem { 
    name:string, 
    checkedSteps:number, 
    steps:number,    
    id:number, 
    weight:number,
    subtasks?:SubTask[], 
}

interface State {
    nextId:number, 
    nextTaskId:number, 
    categories:string[], 
    categoryFilters:string[],
    progressItems: ProgressItem[],
    tasks:Task[],
}


