export function createPomodoroElements() {
  const pomodoroContainer = document.createElement("div");
  pomodoroContainer.className = "pomodoro-container";

  const timerDisplay = document.createElement("h1");
  timerDisplay.id = "timer-display";
  timerDisplay.textContent = "25:00";

  const controlButtons = document.createElement("div");
  controlButtons.className = "control-buttons";

  const startButton = document.createElement("button");
  startButton.id = "start-pomodoro";
  startButton.textContent = "Start ToDoDoro";

  const stopButton = document.createElement("button");
  stopButton.id = "stop-pomodoro";
  stopButton.textContent = "Stop";

  const resetButton = document.createElement("button");
  resetButton.id = "reset-pomodoro";
  resetButton.textContent = "Reset";

  const manualStartButtons = document.createElement("div");
  manualStartButtons.className = "manual-start-buttons";

  const startWorkButton = document.createElement("button");
  startWorkButton.id = "start-work";
  startWorkButton.textContent = "Start 25 min Work";

  const startBreakButton = document.createElement("button");
  startBreakButton.id = "start-break";
  startBreakButton.textContent = "Start 5 min Break";

  const autoSwitchContainer = document.createElement("div");
  autoSwitchContainer.className = "auto-switch-container";

  const autoSwitchCheckbox = document.createElement("input");
  autoSwitchCheckbox.type = "checkbox";
  autoSwitchCheckbox.id = "auto-switch";
  autoSwitchCheckbox.className = "todo-checkbox";

  const autoSwitchLabel = document.createElement("label");
  autoSwitchLabel.setAttribute("for", "auto-switch");
  autoSwitchLabel.textContent = "Auto Switch";

  autoSwitchContainer.appendChild(autoSwitchCheckbox);
  autoSwitchContainer.appendChild(autoSwitchLabel);

  controlButtons.appendChild(startButton);
  controlButtons.appendChild(stopButton);
  controlButtons.appendChild(resetButton);

  manualStartButtons.appendChild(startWorkButton);
  manualStartButtons.appendChild(startBreakButton);

  // To-Do List Section
  const todoContainer = document.createElement("div");
  todoContainer.className = "todo-container";

  const todoTitle = document.createElement("h2");
  todoTitle.textContent = "25 Min. Tasks";

  const todoInputContainer = document.createElement("div");
  todoInputContainer.className = "todo-input-container";

  const todoInput = document.createElement("input");
  todoInput.type = "text";
  todoInput.id = "todo-input";
  todoInput.placeholder = "Add a new task...";

  const addButton = document.createElement("button");
  addButton.id = "add-todo";
  addButton.textContent = "Add";

  todoInputContainer.appendChild(todoInput);
  todoInputContainer.appendChild(addButton);

  const todoList = document.createElement("ul");
  todoList.id = "todo-list";

  todoContainer.appendChild(todoTitle);
  todoContainer.appendChild(todoInputContainer);
  todoContainer.appendChild(todoList);

  pomodoroContainer.appendChild(timerDisplay);
  pomodoroContainer.appendChild(controlButtons);
  pomodoroContainer.appendChild(manualStartButtons);
  pomodoroContainer.appendChild(autoSwitchContainer);
  pomodoroContainer.appendChild(todoContainer);

  const audioElement = document.createElement("audio");
  audioElement.id = "end-sound";
  audioElement.src =
    "https://cdn.glitch.global/8591d44d-1dc2-4182-a467-162f41b61424/timer.mp3?v=1724943687288";
  pomodoroContainer.appendChild(audioElement);

  document.body.appendChild(pomodoroContainer);
  gsap.from(".pomodoro-container", {
    duration: 1,
    opacity: 0,
    y: -50,
    ease: "power3.out",
  });

  gsap.from("#todo-input", {
    delay: 0.9,
    x: -30,
    duration: 0.7,
    opacity: 0,
    stagger: 0.2,
  });
}
