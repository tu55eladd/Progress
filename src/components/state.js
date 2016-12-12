export default {
  nextId: 3,
  nextTaskId: 3,
  progressItems: [
    {
      name: "Make app",
      weight: 1,
      checkedSteps: 0,
      steps: 2,
      id: 1,
      subtasks: [
        { name: "Front-end", checked: false },
        { name: "Back-end", checked: false}
      ]
    },
    {
      name: "Work day 2",
      weight: 1,
      checkedSteps: 0,
      steps: 10,
      id: 2
    }
  ],
  tasks: [{
    name: "Clean stuff",
    id: 1,
    checked: false
  }]
};
