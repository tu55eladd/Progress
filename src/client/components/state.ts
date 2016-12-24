const state: State = {
  nextId: 3,
  nextTaskId: 3,
  categories: ["Uni", "Home"],
  categoryFilters: ["Uni"],
  progressItems: [
    {
      name: "TDT4215 Web intelligence",
      weight: 1,
      checkedSteps: 0,
      steps: 2,
      id: 1,
      subtasks: [
        { name: "Task 1", checked: false },
        { name: "Task 2", checked: false},
        { name: "Task 3", checked: false}
      ]
    },
    {
      name: "TDT4305 Big data",
      weight: 1,
      checkedSteps: 0,
      steps: 10,
      id: 2
    },
    {
      name: "TDT4200 Parallel computing",
      weight: 1,
      checkedSteps: 0,
      steps: 10,
      id: 3
    }
  ],
  tasks: [{
    name: "Clean stuff",
    id: 1,
    checked: false
  },
  {
    name: "Clean floor",
    id: 2,
    checked: false,
    category: "Uni"
  }]
};

export default state;