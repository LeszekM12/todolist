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


    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
           htmlString += `
            <li 
                class="tasks__content${task.done ? "tasks__content--done" : ""}"
            >
                ${task.content}
            </li>
          `; 
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;
    };

    const init = () => {
        render();

        const form = document.querySelector("js-form");

        form.addEventListenr("submit", (event) => {
            event.preventDefault();

            const newTaskContent = document.querySelector("js-newTask").value.trim();
            console.log(newTaskContent);
            if (newTaskContent === "") {
                return;
            }

            tasks.push({
                content: newTaskContent,
            });

            render();
        });
    };

    init();
}