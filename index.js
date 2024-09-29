import { createPomodoroElements } from "./elements.js";

createPomodoroElements();

let pomodoroTimer;
let isPomodoroStarted = false;
const workDuration = 25 * 60;
const breakDuration = 5 * 60;
let currentDuration;
let isWorkTime = true;
let activeTodoItem = null;
let currentRunningTask = null;

const startPomodoroButton = document.querySelector("#start-pomodoro");
const stopPomodoroButton = document.querySelector("#stop-pomodoro");
const resetPomodoroButton = document.querySelector("#reset-pomodoro");
const startWorkButton = document.querySelector("#start-work");
const startBreakButton = document.querySelector("#start-break");
const autoSwitchCheckbox = document.querySelector("#auto-switch");
const audioElement = document.querySelector("#end-sound");

startPomodoroButton.addEventListener("click", startPomodoro);
stopPomodoroButton.addEventListener("click", stopPomodoro);
resetPomodoroButton.addEventListener("click", resetPomodoro);
startWorkButton.addEventListener("click", () =>
  startPomodoroCycle(workDuration, "work")
);
startBreakButton.addEventListener("click", () =>
  startPomodoroCycle(breakDuration, "break")
);

const addButton = document.querySelector("#add-todo");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");

addButton.addEventListener("click", addTodo);
todoInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTodo();
  }
});

function addTodo() {
  const todoText = todoInput.value.trim();
  if (todoText === "") return;

  const todoItem = document.createElement("li");
  todoItem.className = "todo-item";

  // Создаем элементы для задачи
  const todoLabel = document.createElement("span");
  todoLabel.textContent = todoText;

  const todoContent = document.createElement("div");
  todoContent.className = "todo-content";

  const todoCheckbox = document.createElement("input");
  todoCheckbox.type = "checkbox";
  todoCheckbox.className = "todo-checkbox";

  const buttonContainer = document.createElement("div");
  buttonContainer.className = "button-container";

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => {
    todoList.removeChild(todoItem);
    saveTodos();
  });

  const timerButton = document.createElement("button");
  timerButton.textContent = "Start 25 min Timer";

  buttonContainer.appendChild(timerButton);
  buttonContainer.appendChild(deleteButton);

  todoCheckbox.addEventListener("change", () => {
    if (todoCheckbox.checked) {
      todoItem.classList.add("completed");
      timerButton.disabled = true;
    } else {
      todoItem.classList.remove("completed");
      timerButton.disabled = false;
    }
    saveTodos();
  });

  todoContent.appendChild(todoCheckbox);
  todoContent.appendChild(todoLabel);
  todoItem.appendChild(todoContent);
  todoItem.appendChild(buttonContainer);

  // Устанавливаем начальную непрозрачность для анимации
  todoItem.style.opacity = 0;
  todoItem.style.transform = "translateY(20px)"; // начальное смещение

  // Добавляем задачу в список
  todoList.appendChild(todoItem);

  // Анимация появления задачи
  gsap.to(todoItem, { opacity: 1, duration: 0.5, y: 0, ease: "power2.out" });

  // Очищаем поле ввода
  todoInput.value = "";

  // Сохраняем список задач
  saveTodos();
}

function startPomodoroCycleWithTodoTimer(todoItem) {
  Array.from(todoList.children).forEach((task) => {
    const pauseElement = task.querySelector(".pause-element");
    if (pauseElement) {
      task.removeChild(pauseElement);
    }
  });

  function runTask(index) {
    const tasks = Array.from(todoList.children);
    if (index >= tasks.length) return;

    const currentTask = tasks[index];
    const taskLabel = currentTask.querySelector("span").textContent;

    console.log(`Starting task: ${taskLabel}`);

    changeBackgroundColor("work");

    if (pomodoroTimer) clearInterval(pomodoroTimer);

    startTaskTimer(workDuration, index);
  }

  function startTaskTimer(duration, index) {
    let time = duration;
    updateTimerDisplay(time);

    pomodoroTimer = setInterval(() => {
      time--;
      updateTimerDisplay(time);

      if (time <= 0) {
        clearInterval(pomodoroTimer);

        handleTaskCompletion(index);
      }
    }, 1000);
  }

  function handleTaskCompletion(index) {
    const tasks = Array.from(todoList.children);
    const currentTask = tasks[index];
    currentTask.classList.add("completed");

    if (activeTodoItem === currentTask) {
      stopPomodoro();
      activeTodoItem = null;
      currentRunningTask = null;
    }

    if (index < tasks.length - 1) {
      const pauseElement = document.createElement("li");
      pauseElement.textContent = "5 min Break";
      pauseElement.classList.add("pause-element");

      todoList.insertBefore(pauseElement, tasks[index + 1]);
      startPomodoroCycle(breakDuration, "break");

      pomodoroTimer = setInterval(() => {
        if (!isPomodoroStarted) {
          clearInterval(pomodoroTimer);
          todoList.removeChild(pauseElement);
          runTask(index + 1);
        }
      }, 1000);
    }
  }

  runTask(Array.from(todoList.children).indexOf(todoItem));
}

function startPomodoro() {
  if (isPomodoroStarted) {
    stopPomodoro();
  }

  currentDuration = isWorkTime ? workDuration : breakDuration;
  startPomodoroCycle(currentDuration, isWorkTime ? "work" : "break");
}

function startPomodoroCycle(duration, mode) {
  if (isPomodoroStarted) return;

  clearInterval(pomodoroTimer);

  let time = duration;
  updateTimerDisplay(time);

  isPomodoroStarted = true;

  changeBackgroundColor(mode);

  pomodoroTimer = setInterval(() => {
    time--;
    updateTimerDisplay(time);

    if (time <= 0) {
      clearInterval(pomodoroTimer);
      isPomodoroStarted = false;

      playEndSound();

      isWorkTime = duration === workDuration ? false : true;

      if (autoSwitchCheckbox.checked) {
        setTimeout(startPomodoro, 3000);
      } else {
        resetBackgroundColor();
      }

      if (activeTodoItem) {
        activeTodoItem = null;
        currentRunningTask = null;
      }
    }
  }, 1000);
}

function stopPomodoro() {
  clearInterval(pomodoroTimer);
  isPomodoroStarted = false;

  if (currentRunningTask) {
    clearInterval(pomodoroTimer);
    currentRunningTask = null;
  }

  resetBackgroundColor();

  if (activeTodoItem) {
    activeTodoItem.classList.remove("completed");
    activeTodoItem = null;
  }
}

function resetPomodoro() {
  stopPomodoro();
  isWorkTime = true;
  updateTimerDisplay(workDuration);
  resetBackgroundColor();
}

function updateTimerDisplay(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const timerDisplay = document.querySelector("#timer-display");

  timerDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;

  // Запускаем анимацию только если осталось меньше 30 секунд
  if (time <= 30) {
    gsap.to(timerDisplay, {
      scale: 1.1,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power1.inOut",
    });
  }
}

export function saveTodos() {
  const todos = Array.from(todoList.children).map((li) => {
    return {
      text: li.querySelector("span").textContent,
      completed: li.querySelector("input[type=checkbox]").checked,
    };
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}

export function loadTodos() {
  const savedTodos = JSON.parse(localStorage.getItem("todos") || "[]");
  savedTodos.forEach((todo) => {
    const todoItem = document.createElement("li");
    todoItem.className = "todo-item";

    const todoLabel = document.createElement("span");
    todoLabel.textContent = todo.text;

    const todoContent = document.createElement("div");
    todoContent.className = "todo-content";

    const todoCheckbox = document.createElement("input");
    todoCheckbox.type = "checkbox";
    todoCheckbox.className = "todo-checkbox";
    todoCheckbox.checked = todo.completed;
    if (todo.completed) {
      todoItem.classList.add("completed");
    }

    const buttonContainer = document.createElement("div");
    buttonContainer.className = "button-container";

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
      if (activeTodoItem === todoItem) {
        stopPomodoro();
        activeTodoItem = null;
        currentRunningTask = null;
      }
      todoList.removeChild(todoItem);
      saveTodos();
    });

    const timerButton = document.createElement("button");
    timerButton.textContent = "Start 25 min Timer";
    timerButton.disabled = todo.completed;
    if (todo.completed) {
      timerButton.classList.add("button-disabled");
    }
    timerButton.addEventListener("click", () => {
      if (!currentRunningTask) {
        activeTodoItem = todoItem;
        currentRunningTask = todoItem;
        startPomodoroCycleWithTodoTimer(todoItem);
      }
    });

    buttonContainer.appendChild(timerButton);
    buttonContainer.appendChild(deleteButton);

    todoCheckbox.addEventListener("change", () => {
      if (todoCheckbox.checked) {
        // Анимация для завершенной задачи
        gsap.to(todoItem, { opacity: 0.5, scale: 0.95, duration: 0.3 });
        todoItem.classList.add("completed");
        timerButton.disabled = true;
        timerButton.classList.add("button-disabled");

        if (activeTodoItem === todoItem) {
          stopPomodoro();
          activeTodoItem = null;
          currentRunningTask = null;
        }
      } else {
        // Анимация для невыполненной задачи
        gsap.to(todoItem, { opacity: 1, scale: 1, duration: 0.3 });
        todoItem.classList.remove("completed");
        timerButton.disabled = false;
        timerButton.classList.remove("button-disabled");
      }
      saveTodos();
    });

    todoContent.appendChild(todoCheckbox);
    todoContent.appendChild(todoLabel);

    todoItem.appendChild(todoContent);
    todoItem.appendChild(buttonContainer);

    todoList.appendChild(todoItem);
  });
}

function changeBackgroundColor(mode) {
  if (mode === "work") {
    document.body.style.backgroundColor = "#66bb6a";
  } else if (mode === "break") {
    document.body.style.backgroundColor = "#29b6f6";
  }
}

function resetBackgroundColor() {
  document.body.style.backgroundColor = "#615b5b";
}

function playEndSound() {
  audioElement.play();
}

document.addEventListener("DOMContentLoaded", () => {
  loadTodos();
});

// Выбираем все кнопки на странице
const allButtons = document.querySelectorAll("button");

gsap.from(allButtons, {
  x: -30,
  duration: 0.5,
  opacity: 0,
  stagger: 0.2,
});

// Функция для анимации кнопки
function animateButton(button) {
  gsap.to(button, {
    scale: 0.95,
    duration: 0.1,
    yoyo: true,
    repeat: 1,
  });
}

// Применяем анимацию ко всем кнопкам
allButtons.forEach((button) => {
  button.addEventListener("click", () => {
    animateButton(button);
  });
});
