{
    const tasks = [
      {
        content: "Stworzyć liste zadań",
        done: false,
      },
      {
        content: "Ukończyć tydzień",
        done: true,
      },
    ];

    const hideDoneTasks = false;

    const addNewTask = (newTaskContent) => {
      tasks.push({
        content: newTaskContent,
      });
  
      render();
    };

    const removeTask = (taskIndex) => {
      tasks.splice(taskIndex, 1);
      render();
    };

    const toggleTaskDone = (taskIndex) => {
      tasks[taskIndex].done = !tasks[taskIndex].done;
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
  
    const render = () => {
      let htmlString = "";
  
      for (const task of tasks) {
        htmlString += `
        <li class=
            "tasks__item${task.done && hideDoneTasks ? " tasks__item--hidden" : ""} js-task
            ">
            <button class="tasks__button tasks__button--toggleDone js-done">
                ${task.done ? "-" : "🗸"}
            </button>
            <span class="tasks__content ${task.done ? "tasks__content--done" : ""}">
                ${task.content}
            </span>
            <button class="tasks__button tasks__button--remove js-remove">🗑️</button>
        </li>
    `;
      }
  
      document.querySelector(".js-tasks").innerHTML = htmlString;

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
  