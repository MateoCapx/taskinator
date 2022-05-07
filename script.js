
    let formEl = document.querySelector("#task-form"); 
    let tasksToDoEl = document.querySelector("#tasks-to-do"); 
    
    let createTaskHandler = function(event) { 
        event.preventDefault();   // Prevents the the normal behavior of an element
       
        let taskNameInput = document.querySelector("input[name='task-name']").value ;  // we're trying to select an HTML element by one of its attributes.
        let taskTypeInput = document.querySelector("select[name='task-type']").value;
        console.log(taskTypeInput);

        // create list item
        var listItemEl = document.createElement("li");
        listItemEl.className = "task-item";

        // create div to hold task info and add to list item
        let taskInfoEl = document.createElement("div");
        
        // give it a class name
        taskInfoEl.className = "task-info";
       
        // add HTML content to div
        taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskNameInput + "</h3><span class='task-type'>" + taskTypeInput + "</span>";

        listItemEl.appendChild(taskInfoEl);

        // add entire list item to list
        tasksToDoEl.appendChild(listItemEl);
      }; 
    
    formEl.addEventListener("click", createTaskHandler);


    //   Add the text. //  We want to get the task name we just stored in taskNameInput and add it to the listItemEl variable