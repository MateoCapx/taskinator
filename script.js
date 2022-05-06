
    let buttonEl = document.querySelector("#save-task"); 
    let tasksToDoEl = document.querySelector("#tasks-to-do"); 
    
    let createTaskHandler = function() { 
      let listItemEl = document.createElement("li");       //   Create a new task item.
      listItemEl.className = "task-item";                 //   Style the new task item.
      listItemEl.textContent = "This is a new task.";     //   Add the text.
      tasksToDoEl.appendChild(listItemEl);                //   Append this element to the task list.
      }; 
    
    buttonEl.addEventListener("click", createTaskHandler);