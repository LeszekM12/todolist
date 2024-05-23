{
  let tasks = [];

  let hideDoneTasks = false;

  const toggleHideTaskDone = () => {
    hideDoneTasks = !hideDoneTasks;
    render();
  };

  const addNewTask = (newTaskContent) => {
    tasks = [...tasks, { content: newTaskContent }, ];
    render();
  };

  const removeTask = (taskIndex) => {
    tasks = [
     ...tasks.slice(0, taskIndex),
     ...tasks.slice(taskIndex + 1),
    ];
    render(); 
  };

  const toggleTaskDone = (taskIndex) => {
    tasks = [
      ...tasks.slice(0, taskIndex),
      { ...tasks[taskIndex], 
        done: !tasks[taskIndex].done },
      ...tasks.slice(taskIndex + 1),
    ];
    render();
  };

  const markAllTasksDone = () => {
    tasks = tasks.map((task) => ({
      ...task,
      done: true,
    }));
    render();
  };

  



  const bindEvents = () => {
    const removeButtons = document.querySelectorAll(".js-remove");

    removeButtons.forEach((removeButton, index) => {
      removeButton.addEventListener("click", () => {
        removeTask(index);
      }); 
    });

    const toggleTaskButtons = document.querySelectorAll(".js-done");

    toggleTaskButtons.forEach((toggleTaskButton, index) => {
      toggleTaskButton.addEventListener("click", () => {
        toggleTaskDone(index);
      });
    });
  };

  const renderTasks = () => {
    const taskToHTML = task => `
        <li class=
            "tasks__item${
              task.done && hideDoneTasks ? " tasks__item--hidden" : ""
            } js-task
            ">
            <button class="tasks__button tasks__button--toggleDone js-done">
                ${task.done ? "-" : "🗸"}
            </button>
            <span class="tasks__content ${
              task.done ? "tasks__content--done" : ""
            }">
                ${task.content}
            </span>
            <button class="tasks__button tasks__button--remove js-remove">🗑️</button>
        </li>
    `;
      
    const tasksElement = document.querySelector(".js-tasks");
    tasksElement.innerHTML = tasks.map(taskToHTML).join("");
  };

  const renderButtons = () => {
    const buttonsElement = document.querySelector(".js-buttons");

    if (!tasks.length) {
      buttonsElement.innerHTML = "";
      return;
    }

    buttonsElement.innerHTML = `
          <button class="js-toggleHideTaskDone task__buttonHide">
            ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
          </button>
          <button class="task__buttonComplete js-markAllDone">
          ${ tasks.every(({ done }) => done) ? " unabled" : ""} 
          Ukończ wszystkie
          </button>
      `;
  };

  const bindButtonsEvents = () => {
    const toggleHideTaskDoneButton = document.querySelector(".js-toggleHideTaskDone");
    const markAllDoneButtons = document.querySelector(".js-markAllDone");

    if(toggleHideTaskDoneButton) {
      toggleHideTaskDoneButton.addEventListener("click", toggleHideTaskDone);
    }

    if(markAllDoneButtons) {
      markAllDoneButtons.addEventListener("click", markAllTasksDone);
    }
  };

  const render = () => {
    renderTasks();
    renderButtons();
    bindButtonsEvents();
    bindEvents();
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    const newTaskElement = document.querySelector(".js-newTask");
    const newTaskContent = newTaskElement.value.trim();

    if (newTaskContent !== "") {
      addNewTask(newTaskContent);
      newTaskElement.value = "";
    }

    newTaskElement.focus();
  };

  const init = () => {
    render();

    const form = document.querySelector(".js-form");
    form.addEventListener("submit", onFormSubmit);
  };

  init();
}
