
    let formEl = document.querySelector("#task-form"); 
    let tasksToDoEl = document.querySelector("#tasks-to-do"); 
    

    let taskFormHandler = function(event) { 
        event.preventDefault();   // Prevents the the normal behavior of an element
       
        let taskNameInput = document.querySelector("input[name='task-name']").value ;  // we're trying to select an HTML element by one of its attributes.
        let taskTypeInput = document.querySelector("select[name='task-type']").value;
        console.log(taskTypeInput);

        //check if input vales are empty strings

            if(!taskNameInput || !taskTypeInput) { 
                alert("You need to fill out the task form!")
                return false;
            }

            formEl.reset();

        //package up data as an object

            let taskDataObj ={
                name: taskNameInput,
                type: taskTypeInput

            };

        // send it as an argument to createTaskEl
            createTaskEl(taskDataObj);
       
      }; 
    
    formEl.addEventListener("click", taskFormHandler);



        
    let createTaskEl = function(taskDataObj) {

         // create list item
        let listItemEl = document.createElement("li");
        listItemEl.className = "task-item";

        // create div to hold task info and add to list item
        let taskInfoEl = document.createElement("div");
        
        // give it a class name
        taskInfoEl.className = "task-info";
       
        // add HTML content to div
        taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

        listItemEl.appendChild(taskInfoEl);

        // add entire list item to list
        tasksToDoEl.appendChild(listItemEl);
    }