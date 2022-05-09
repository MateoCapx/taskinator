
    let formEl = document.querySelector("#save-task"); 
    let tasksToDoEl = document.querySelector("#tasks-to-do"); 
    let taskIdCounter= 0;
    let tasksInProgressEl = document.querySelector("#tasks-in-progress");
    let tasksCompletedEl = document.querySelector("#tasks-completed");


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

            // formEl.reset();  //  ?????


            let isEdit = formEl.hasAttribute("data-task-id"); // " hasAttribute test to see if an element has a specific Attribute"
                

                    // has data attribute, so get task id and call function to complete edit process
                    if (isEdit) {
                        let taskId = formEl.getAttribute("data-task-id");
                        completeEditTask(taskNameInput, taskTypeInput, taskId);
                    } 

                    // no data attribute, so create object as normal and pass to createTaskEl function
                     //package up data as an object
                    else {
                        let taskDataObj = {
                        name: taskNameInput,
                        type: taskTypeInput
                        };

                     // send it as an argument to createTaskEl
                        createTaskEl(taskDataObj);
                    }
       
      }; 
    
    formEl.addEventListener("click", taskFormHandler);



let completeEditTask = function(taskName, taskType, taskId) {
        console.log(taskName, taskType, taskId);

                    // find the matching task list item
            let taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

            // set new values
            taskSelected.querySelector("h3.task-name").textContent = taskName;
            taskSelected.querySelector("span.task-type").textContent = taskType;

            alert("Task Updated!");

            formEl.removeAttribute("data-task-id");
            document.querySelector("#save-task").textContent = "Add Task";
      };




        
let createTaskEl = function(taskDataObj) {

         // create list item
        let listItemEl = document.createElement("li");
        listItemEl.className = "task-item";

        listItemEl.setAttribute("data-task-id", taskIdCounter);

        // create div to hold task info and add to list item
        let taskInfoEl = document.createElement("div");
        
        // give it a class name
        taskInfoEl.className = "task-info";
       
        // add HTML content to div
        taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

        let taskActionsEl = createTaskActions(taskIdCounter);
        listItemEl.appendChild(taskActionsEl);
        
        tasksToDoEl.appendChild(listItemEl);

        listItemEl.appendChild(taskInfoEl);

        // add entire list item to list
        tasksToDoEl.appendChild(listItemEl);

         // increase task counter for next unique id
         taskIdCounter++;

        
    }


   //Note the parameter called taskId. This is how we can pass a different id into the function each time to keep track of which elements we're creating for which task
let createTaskActions = function(taskId) {

        let actionContainerEl = document.createElement("div");
         actionContainerEl.className = "task-actions";

                        // create edit button
                let editButtonEl = document.createElement("button");
                editButtonEl.textContent = "Edit";
                editButtonEl.className = "btn edit-btn";
                editButtonEl.setAttribute("data-task-id", taskId);

                actionContainerEl.appendChild(editButtonEl);

                // create delete button
                let deleteButtonEl = document.createElement("button");
                deleteButtonEl.textContent = "Delete";
                deleteButtonEl.className = "btn delete-btn";
                deleteButtonEl.setAttribute("data-task-id", taskId);

                actionContainerEl.appendChild(deleteButtonEl);

                //Creating a dropdown menu for the newly added buttons
            let statusSelectEl = document.createElement("select");
            statusSelectEl.className = "select-status";
            statusSelectEl.setAttribute("name", "status-change");
            statusSelectEl.setAttribute("data-task-id", taskId);


            // Creating a for loop to loop over array
            let statusChoices = ["To Do", "In Progress", "Completed"];

             actionContainerEl.appendChild(statusSelectEl);
            

            for (let i = 0; i < statusChoices.length; i++) {
                // create option element
                let statusOptionEl = document.createElement("option");
                statusOptionEl.textContent = statusChoices[i];
                statusOptionEl.setAttribute("value", statusChoices[i]);
              
                // append to select
                statusSelectEl.appendChild(statusOptionEl);
              }
return actionContainerEl;

        };

        let pageContentEl = document.querySelector("#page-content");

        
 let taskButtonHandler = function(event) {
                console.log(event.target);

                           // get target element from event
            let targetEl = event.target;

            // edit button was clicked
            if (targetEl.matches(".edit-btn")) {
                let taskId = targetEl.getAttribute("data-task-id");
                editTask(taskId);
            } 
            // delete button was clicked
            else if (targetEl.matches(".delete-btn")) {
                let taskId = targetEl.getAttribute("data-task-id");
                deleteTask(taskId);
            }
        }
            pageContentEl.addEventListener("click", taskButtonHandler);


                // delete task function 
let deleteTask = function(taskId) {
            let taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
            taskSelected.remove();
                        
              };


              // Edit task function
let editTask = function(taskId) {
                console.log("editing task #" + taskId);
              
                // get task list item element
                let taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

                                // get content from task name and type
                let taskName = taskSelected.querySelector("h3.task-name").textContent;
                console.log(taskName);

                let taskType = taskSelected.querySelector("span.task-type").textContent;
                console.log(taskType);

                document.querySelector("input[name='task-name']").value = taskName;
                document.querySelector("select[name='task-type']").value = taskType;
                document.querySelector("#save-task").textContent = "Save Task";

                formEl.setAttribute("data-task-id", taskId);

              };


 var taskStatusChangeHandler = function(event) {
              // get the task item's id
            var taskId = event.target.getAttribute("data-task-id");

            // get the currently selected option's value and convert to lowercase
            var statusValue = event.target.value.toLowerCase();

            // find the parent task item element based on the id
            var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
           
           
            if (statusValue === "to do") {
                tasksToDoEl.appendChild(taskSelected);
              } 
              else if (statusValue === "in progress") {
                tasksInProgressEl.appendChild(taskSelected);
              } 
              else if (statusValue === "completed") {
                tasksCompletedEl.appendChild(taskSelected);
              }
 };
            
              pageContentEl.addEventListener("change", taskStatusChangeHandler);
