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

    const addNewTask = (newTaskContent) => {
      tasks.push({
        content: newTaskContent,
      });
  
      render();
    };

    const removeTask = (index) => {
      tasks.splice(index, 1);
      render();
    };

    const toggleTaskDone = (index) => {
      tasks[index].done = !tasks[idnex].done;
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
              <li 
                class="tasks__content"${task.done ? "tasks__content--done" : ""}  
              >
                  <button class="js-done">ukończone</button>
                  <button class="js-remove">usuń</button>
                  ${task.content}
              </li>
            `;
      }
  
      document.querySelector(".js-tasks").innerHTML = htmlString;

      bindEvents();
    };

    const onFormSubmit = (event) => {
      event.preventDefault();
  
      const newTaskContent = document.querySelector(".js-newTask").value.trim();
  
      if (newTaskContent === "") {
        return;
      }
  
      addNewTask(newTaskContent);
    };
  
    const init = () => {
      render();
  
      const form = document.querySelector(".js-form");
  
      form.addEventListener("submit", onFormSubmit);
    };
  
    init();
  }
  